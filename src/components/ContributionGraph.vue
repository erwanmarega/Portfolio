<template>
  <div v-if="cells.length">
    <h3 v-reveal class="mt-12 text-sm font-medium text-ink">
      {{ t.projects.contributions.title }}
    </h3>
    <div v-reveal class="mt-5">
      <div class="graph" role="img" :aria-label="totalText">
        <span
          v-for="(cell, index) in cells"
          :key="index"
          class="cell"
          :class="[
            cell.date ? `level-${cell.level}` : 'invisible',
            { 'hidden sm:block': cell.old },
          ]"
          :title="cell.title"
        />
      </div>
      <p
        class="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-xs text-ink-muted"
      >
        <span>{{ totalText }}</span>
        <a
          :href="`https://github.com/${user}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {{ t.projects.contributions.profile }}
          <span class="sr-only">{{ t.projects.newTab }}</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../composables/useLocale.js";
import snapshot from "../data/contributions.json";

const { locale, t } = useLocale();

const user = snapshot.user;
const days = snapshot.days ?? [];
const RECENT_WEEKS = 26;

const intlLocale = computed(() => (locale.value === "en" ? "en-US" : "fr-FR"));
const dateFormat = computed(
  () =>
    new Intl.DateTimeFormat(intlLocale.value, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }),
);
const numberFormat = computed(() => new Intl.NumberFormat(intlLocale.value));

const totalText = computed(() =>
  t.value.projects.contributions.total.replace(
    "{count}",
    numberFormat.value.format(snapshot.total),
  ),
);

function dayTitle(day) {
  const text = t.value.projects.contributions;
  const date = dateFormat.value.format(new Date(`${day.date}T00:00:00Z`));
  const template = day.count === 0 ? text.dayNone : day.count === 1 ? text.dayOne : text.dayMany;
  return template.replace("{count}", numberFormat.value.format(day.count)).replace("{date}", date);
}

// Weeks are columns (Sunday on top): pad the first week, flag the cells of old weeks.
const cells = computed(() => {
  if (!days.length) return [];
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const all = [...Array.from({ length: lead }, () => ({})), ...days];
  const weeks = Math.ceil(all.length / 7);
  return all.map((day, index) => ({
    ...day,
    title: day.date ? dayTitle(day) : undefined,
    old: Math.floor(index / 7) < weeks - RECENT_WEEKS,
  }));
});
</script>

<style scoped>
.graph {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, minmax(0, 1fr));
  gap: 2px;
}
@media (min-width: 640px) {
  .graph {
    gap: 3px;
  }
}
.cell {
  aspect-ratio: 1;
  border-radius: 2px;
}
.level-0 {
  background: rgb(var(--line) / 0.08);
}
.level-1 {
  background: rgb(var(--brand) / 0.25);
}
.level-2 {
  background: rgb(var(--brand) / 0.45);
}
.level-3 {
  background: rgb(var(--brand) / 0.7);
}
.level-4 {
  background: rgb(var(--brand) / 1);
}
</style>
