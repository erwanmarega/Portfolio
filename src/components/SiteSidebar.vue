<template>
  <aside
    class="print:hidden lg:sticky lg:top-12 lg:flex lg:h-[calc(100vh-6rem)] lg:flex-col lg:self-start"
  >
    <div>
      <img
        :src="avatar"
        alt="Erwan Marega"
        width="56"
        height="56"
        class="h-14 w-14 rounded-full object-cover"
      />
      <h1 class="mt-5 text-3xl font-semibold tracking-tight text-ink">
        <RouterLink
          :to="localeRoute('home')"
          class="rounded-sm text-inherit no-underline outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Erwan Marega
        </RouterLink>
      </h1>
      <p class="mt-2 text-ink-soft">{{ t.sidebar.role }}</p>
      <p class="mt-1 font-mono text-xs text-ink-muted">{{ t.sidebar.location }}</p>
    </div>

    <nav :aria-label="t.nav.ariaLabel" class="mt-12 hidden lg:block">
      <ul class="flex flex-col gap-3">
        <li v-for="link in links" :key="link.id">
          <RouterLink
            :to="sectionRoute(link.id)"
            :aria-current="activeId === link.id ? 'true' : undefined"
            class="group flex items-center gap-3 rounded-sm text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            :class="activeId === link.id ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'"
            @click="onSectionClick(link.id)"
          >
            <span
              class="h-px bg-current transition-all duration-300"
              :class="activeId === link.id ? 'w-10' : 'w-4 group-hover:w-10'"
              aria-hidden="true"
            ></span>
            {{ t.nav.sections[link.id] }}
          </RouterLink>
        </li>
      </ul>
      <ul class="mt-6 flex flex-col gap-3 border-t border-line/10 pt-6">
        <li v-for="link in pages" :key="link.name">
          <RouterLink
            :to="localeRoute(link.name)"
            :aria-current="route.name === link.name ? 'page' : undefined"
            class="group flex items-center gap-3 rounded-sm text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            :class="
              route.name === link.name ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'
            "
            @click="playTick"
          >
            <span
              class="h-px bg-current transition-all duration-300"
              :class="route.name === link.name ? 'w-10' : 'w-4 group-hover:w-10'"
              aria-hidden="true"
            ></span>
            {{ t.nav.pages[link.name] }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <ul class="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm lg:mt-auto">
      <li v-for="item in external" :key="item.label">
        <a
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {{ item.label }}
          <svg
            viewBox="0 0 16 16"
            class="ml-0.5 inline-block h-3 w-3"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
          </svg>
          <span class="sr-only">{{ t.sidebar.newTab }}</span>
        </a>
      </li>
      <li>
        <a
          href="mailto:maregaerwan@gmail.com"
          class="text-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Email
        </a>
      </li>
    </ul>

    <!-- Language switch: current language is plain text, the other one a link. -->
    <p
      class="mt-4 font-mono text-xs text-ink-muted"
      role="group"
      :aria-label="t.sidebar.languageLabel"
    >
      <template v-for="(code, index) in LOCALES" :key="code">
        <span v-if="index > 0" aria-hidden="true"> / </span>
        <span v-if="code === locale" aria-current="true" class="text-ink">{{
          code.toUpperCase()
        }}</span>
        <RouterLink
          v-else
          :to="switchRoute"
          :hreflang="code"
          :lang="code"
          class="rounded-sm outline-none transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          @click="playTick"
          >{{ code.toUpperCase() }}</RouterLink
        >
      </template>
    </p>
  </aside>
</template>

<script setup>
import avatar from "../assets/images/profile.webp";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { LOCALES, useLocale } from "../composables/useLocale.js";
import {
  SECTION_LINKS,
  PAGE_LINKS,
  useActiveSection,
  playTick,
} from "../composables/useSectionNav.js";

const route = useRoute();
const { locale, t, localeRoute, switchRoute } = useLocale();

// The CV is a PDF per language in public/, generated from the /cv page by
// `npm run cv:pdf`.
const external = computed(() => [
  { label: t.value.sidebar.cv, href: `/cv-erwan-marega-${locale.value}.pdf` },
  { label: "GitHub", href: "https://github.com/erwanmarega" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/erwan-marega/" },
]);
const links = SECTION_LINKS;
const pages = PAGE_LINKS;
const activeId = useActiveSection();

// "À propos" is the top of the page: it links to the bare home URL, not #home.
const sectionRoute = (id) => localeRoute("home", id === "home" ? {} : { hash: `#${id}` });

const onSectionClick = (id) => {
  playTick();
  // Already on the bare home URL: the router sees no navigation, so scroll here.
  if (id === "home" && route.name === "home" && !route.hash) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
};
</script>
