<template>
  <div v-if="cells.length">
    <h3 v-reveal class="mt-12 text-sm font-medium text-ink">
      {{ t.projects.contributions.title }}
    </h3>
    <div v-reveal class="relative mt-5">
      <div
        class="graph"
        role="img"
        :aria-label="totalText"
        @pointerover="showTip"
        @pointerleave="tip = null"
        @pointercancel="tip = null"
      >
        <span
          v-for="(cell, index) in cells"
          :key="index"
          class="cell"
          :class="[
            cell.date ? `level-${cell.level}` : 'invisible',
            { 'hidden sm:block': cell.old },
          ]"
          :style="{ '--col': cell.col, '--col-recent': cell.colRecent }"
          :data-label="cell.label"
        />
      </div>

      <p
        v-if="tip"
        class="tip pointer-events-none absolute z-10 whitespace-nowrap rounded bg-ink px-2 py-1 font-mono text-[11px] leading-none text-page"
        :class="`tip-${tip.align}`"
        :style="{ left: `${tip.x}px`, top: `${tip.y}px` }"
        aria-hidden="true"
      >
        {{ tip.text }}
      </p>
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
import { computed, ref } from "vue";
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

function dayLabel(day) {
  const text = t.value.projects.contributions;
  const date = dateFormat.value.format(new Date(`${day.date}T00:00:00Z`));
  const template = day.count === 0 ? text.dayNone : day.count === 1 ? text.dayOne : text.dayMany;
  return template.replace("{count}", numberFormat.value.format(day.count)).replace("{date}", date);
}

const tip = ref(null);
function showTip(event) {
  const cell = event.target.closest?.(".cell[data-label]");
  if (!cell) return;
  const center = cell.offsetLeft + cell.offsetWidth / 2;
  const ratio = center / cell.parentElement.offsetWidth;
  const align = ratio < 0.2 ? "start" : ratio > 0.8 ? "end" : "center";
  const x =
    align === "start"
      ? cell.offsetLeft
      : align === "end"
        ? cell.offsetLeft + cell.offsetWidth
        : center;
  tip.value = { text: cell.dataset.label, x, y: cell.offsetTop - 6, align };
}

const cells = computed(() => {
  if (!days.length) return [];
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const all = [...Array.from({ length: lead }, () => ({})), ...days];
  const weeks = Math.ceil(all.length / 7);
  const firstRecent = Math.max(0, weeks - RECENT_WEEKS);
  return all.map((day, index) => {
    const col = Math.floor(index / 7);
    return {
      ...day,
      label: day.date ? dayLabel(day) : undefined,
      old: col < firstRecent,

      col,
      colRecent: Math.max(0, col - firstRecent),
    };
  });
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

@media (prefers-reduced-motion: no-preference) {
  .reveal .cell {
    opacity: 0;
    transform: scale(0.2);
    transition:
      opacity 0.2s ease,
      transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.4);
    transition-delay: calc(150ms + var(--col-recent) * 10ms);
  }
  @media (min-width: 640px) {
    .reveal .cell {
      transition-delay: calc(150ms + var(--col) * 10ms);
    }
  }
  .reveal.is-in .cell {
    opacity: 1;
    transform: none;
  }
}
@media (hover: hover) {
  .cell[data-label]:hover {
    outline: 1.5px solid rgb(var(--ink));
    outline-offset: 1px;
  }
}
.tip-center {
  transform: translate(-50%, -100%);
}
.tip-start {
  transform: translateY(-100%);
}
.tip-end {
  transform: translate(-100%, -100%);
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
