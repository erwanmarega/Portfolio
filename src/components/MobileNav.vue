<template>
  <!-- Below lg only: the sidebar nav is hidden there, so this is the sole section menu. -->
  <nav
    aria-label="Navigation principale"
    class="pointer-events-none sticky top-3 z-30 mt-3 flex justify-center px-0 lg:hidden"
  >
    <ul
      class="pointer-events-auto flex max-w-full items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-0.5 rounded-full border border-line/10 bg-surface/85 p-1 shadow-sm backdrop-blur"
    >
      <li v-for="link in links" :key="link.id">
        <RouterLink
          :to="{ name: 'home', hash: `#${link.id}` }"
          :aria-current="activeId === link.id ? 'true' : undefined"
          class="block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          :class="
            activeId === link.id
              ? 'bg-surface-strong font-medium text-ink'
              : 'text-ink-muted hover:text-ink'
          "
          @click="playTick"
        >
          {{ link.label }}
        </RouterLink>
      </li>
      <li aria-hidden="true" class="mx-1 h-4 w-px shrink-0 bg-line/15"></li>
      <li v-for="link in pages" :key="link.name">
        <RouterLink
          :to="{ name: link.name }"
          :aria-current="route.name === link.name ? 'page' : undefined"
          class="block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          :class="
            route.name === link.name
              ? 'bg-surface-strong font-medium text-ink'
              : 'text-ink-muted hover:text-ink'
          "
          @click="playTick"
        >
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  SECTION_LINKS,
  PAGE_LINKS,
  useActiveSection,
  playTick,
} from "../composables/useSectionNav.js";

// "À propos" is the top of the page; dropped here so the pill fits a 360px screen.
const links = SECTION_LINKS.filter((link) => link.id !== "home");
const pages = PAGE_LINKS;
const route = useRoute();
const activeId = useActiveSection();
</script>
