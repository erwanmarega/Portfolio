<template>
  <nav :aria-label="t.nav.breadcrumb" class="mb-8 font-mono print:hidden text-xs text-ink-muted">
    <ol class="flex flex-wrap items-center gap-x-2">
      <li>
        <RouterLink
          :to="localeRoute('home')"
          class="rounded-sm underline decoration-line/25 underline-offset-4 outline-none transition-colors hover:text-brand-text hover:decoration-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {{ t.nav.home }}
        </RouterLink>
      </li>
      <li aria-hidden="true">/</li>
      <li aria-current="page" class="text-ink">{{ t.nav.pages[route.name] }}</li>
    </ol>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLocale } from "../composables/useLocale.js";

const route = useRoute();
const { t, localeRoute } = useLocale();
</script>
