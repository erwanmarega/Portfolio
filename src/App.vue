<template>
  <IntroSplash />
  <PageWipe />
  <div class="mx-auto w-full max-w-[1120px] px-5 sm:px-8 print:max-w-none print:px-0">
    <MobileNav />
    <component
      :is="heroClips.length ? VideoHero : HorizonHero"
      v-if="route.name === 'home'"
      class="mt-5 print:hidden sm:mt-8"
    />
    <div
      class="mt-10 lg:mt-16 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-x-20 print:mt-0 print:block"
    >
      <SiteSidebar />
      <main class="mt-14 min-w-0 lg:mt-0 print:mt-0">
        <PageBreadcrumb v-if="route.name && route.name !== 'home'" />
        <RouterView v-slot="{ Component }">
          <Transition name="page">
            <component :is="Component" />
          </Transition>
        </RouterView>
        <SiteFooter />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import IntroSplash from "./components/IntroSplash.vue";
import PageWipe from "./components/PageWipe.vue";
import PageBreadcrumb from "./components/PageBreadcrumb.vue";
import HorizonHero from "./components/HorizonHero.vue";
import VideoHero from "./components/VideoHero.vue";
import { heroClips } from "./data/heroClips.js";
import MobileNav from "./components/MobileNav.vue";
import SiteSidebar from "./components/SiteSidebar.vue";
import SiteFooter from "./components/SiteFooter.vue";

const route = useRoute();
</script>

<style>
html {
  background: rgb(var(--page));
}
body {
  margin: 0;
  color: rgb(var(--ink));
}
.section {
  scroll-margin-top: 4.5rem;
}

/* Page change: the new page fades in; the old one leaves instantly so hash
   scrolling and section tracking never wait on a leave animation. */
@media (prefers-reduced-motion: no-preference) {
  .page-enter-active {
    transition: opacity 0.3s ease;
  }
  .page-enter-from {
    opacity: 0;
  }
}
</style>
