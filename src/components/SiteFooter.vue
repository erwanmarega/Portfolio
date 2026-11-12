<template>
  <footer class="print:hidden mt-20 pb-12 sm:mt-24">
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t border-line/10 pt-6 text-sm text-ink-muted"
    >
      <p>© {{ year }} Erwan Marega</p>
      <ul class="flex items-center gap-5">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-sm outline-none transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <FontAwesomeIcon :icon="link.icon" class="h-[18px] w-[18px]" aria-hidden="true" />
            <span class="sr-only">{{ link.label }} {{ t.footer.newTab }}</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../composables/useLocale.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const { t } = useLocale();
const year = computed(() => new Date().getFullYear());

const links = [
  { label: "GitHub", icon: faGithub, href: "https://github.com/erwanmarega" },
  { label: "LinkedIn", icon: faLinkedinIn, href: "https://www.linkedin.com/in/erwan-marega/" },
];
</script>
