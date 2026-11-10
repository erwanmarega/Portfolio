<template>
  <aside class="lg:sticky lg:top-12 lg:flex lg:h-[calc(100vh-6rem)] lg:flex-col lg:self-start">
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
          :to="{ name: 'home' }"
          class="rounded-sm text-inherit no-underline outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Erwan Marega
        </RouterLink>
      </h1>
      <p class="mt-2 text-ink-soft">Développeur web fullstack</p>
      <p class="mt-1 font-mono text-xs text-ink-muted">Paris · Alternance chez Cegedim</p>
    </div>

    <nav aria-label="Navigation principale" class="mt-12 hidden lg:block">
      <ul class="flex flex-col gap-3">
        <li v-for="link in links" :key="link.id">
          <RouterLink
            :to="{ name: 'home', hash: `#${link.id}` }"
            :aria-current="activeId === link.id ? 'true' : undefined"
            class="group flex items-center gap-3 rounded-sm text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            :class="
              activeId === link.id
                ? 'font-medium text-ink'
                : 'text-ink-muted hover:text-ink'
            "
            @click="playTick"
          >
            <span
              class="h-px bg-current transition-all duration-300"
              :class="activeId === link.id ? 'w-10' : 'w-4 group-hover:w-10'"
              aria-hidden="true"
            ></span>
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
      <ul class="mt-6 flex flex-col gap-3 border-t border-line/10 pt-6">
        <li v-for="link in pages" :key="link.name">
          <RouterLink
            :to="{ name: link.name }"
            :aria-current="route.name === link.name ? 'page' : undefined"
            class="group flex items-center gap-3 rounded-sm text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            :class="
              route.name === link.name
                ? 'font-medium text-ink'
                : 'text-ink-muted hover:text-ink'
            "
            @click="playTick"
          >
            <span
              class="h-px bg-current transition-all duration-300"
              :class="route.name === link.name ? 'w-10' : 'w-4 group-hover:w-10'"
              aria-hidden="true"
            ></span>
            {{ link.label }}
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
          <svg viewBox="0 0 16 16" class="ml-0.5 inline-block h-3 w-3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" /></svg>
          <span class="sr-only">(nouvel onglet)</span>
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
  </aside>
</template>

<script setup>
import avatar from "../assets/images/profile.webp";
import CV_Marega from "../assets/docs/cv-erwan-marega.pdf";
import { useRoute } from "vue-router";
import { SECTION_LINKS, PAGE_LINKS, useActiveSection, playTick } from "../composables/useSectionNav.js";

const external = [
  { label: "CV", href: CV_Marega },
  { label: "GitHub", href: "https://github.com/erwanmarega" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/erwan-marega/" },
];

const route = useRoute();
const links = SECTION_LINKS;
const pages = PAGE_LINKS;
const activeId = useActiveSection();
</script>
