<template>
  <section aria-labelledby="journey-title">
    <h2 id="journey-title" v-reveal class="section-label">{{ t.journey.title }}</h2>

    <ol class="mt-6">
      <li
        v-for="item in localized"
        :key="item.id"
        v-reveal
        class="journey-row grid gap-x-6 gap-y-1 border-t border-line/10 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
      >
        <div class="sm:pt-0.5">
          <p class="font-mono text-[13px] text-ink-muted">{{ item.years }}</p>
          <img
            v-if="item.logo"
            :src="item.logo"
            alt=""
            class="journey-logo mt-3 h-6 w-auto max-w-[6.5rem] object-contain object-left"
          />
        </div>

        <div class="min-w-0">
          <h3 class="font-medium text-ink">
            {{ item.title }}
            <span
              v-if="item.ongoing"
              class="ml-2 inline-flex items-center gap-1.5 align-middle text-xs font-normal text-brand-text"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {{ t.journey.ongoing }}
            </span>
          </h3>
          <p class="text-[15px] text-ink-soft">{{ item.institution }}</p>
          <p class="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
            {{ item.description }}
          </p>

          <ul v-if="item.tasks" class="mt-3 space-y-1.5">
            <li
              v-for="task in item.tasks"
              :key="task"
              class="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
            >
              <span class="text-brand-text" aria-hidden="true">–</span>
              {{ task }}
            </li>
          </ul>
          <p v-if="item.tools" class="mt-3 font-mono text-xs text-ink-muted">
            {{ item.tools }}
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../composables/useLocale.js";
import { journey } from "../data/journey.js";

const homeItems = journey.filter((item) => item.home);

const { t } = useLocale();

const localized = computed(() =>
  homeItems.map((item) => ({ ...item, ...t.value.journey.items[item.id] })),
);
</script>

<style scoped>
.journey-logo {
  filter: grayscale(1) contrast(1.1);
  opacity: 0.7;
  transition:
    filter 0.25s ease,
    opacity 0.25s ease;
}
.journey-row:hover .journey-logo {
  filter: none;
  opacity: 1;
}
</style>
