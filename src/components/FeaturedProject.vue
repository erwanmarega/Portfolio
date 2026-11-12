<template>
  <article>
    <div v-reveal class="featured-shot">
      <a
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group block rounded-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <div
          class="featured-frame overflow-hidden rounded-lg border border-line/10 bg-surface-strong"
        >
          <div class="featured-settle">
            <img
              :src="project.image"
              :alt="t.projects.alt.replace('{title}', project.title)"
              loading="lazy"
              class="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]"
            />
          </div>
        </div>
        <span class="sr-only">{{ t.projects.newTab }}</span>
      </a>
    </div>

    <div v-reveal="120" class="mt-6">
      <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h4 class="text-xl font-semibold tracking-tight text-ink">
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-baseline gap-2 rounded-sm outline-none transition-colors hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            {{ project.title }}
            <svg
              viewBox="0 0 16 16"
              class="h-3.5 w-3.5 shrink-0 self-center"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
            </svg>
            <span class="sr-only">{{ t.projects.newTab }}</span>
          </a>
        </h4>
        <p class="font-mono text-xs text-ink-muted">{{ project.tags.join(" · ") }}</p>
      </div>
      <p class="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
        {{ project.description }}
      </p>
    </div>

    <dl class="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-3">
      <div
        v-for="(item, index) in STUDY_ITEMS"
        :key="item.key"
        v-reveal="index * 100"
        class="study-item group/study border-t border-line/10 pt-3"
      >
        <dt
          class="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted"
        >
          <FontAwesomeIcon
            :icon="item.icon"
            class="h-3 w-3 transition-[transform,color] duration-200 group-hover/study:text-brand-text motion-safe:group-hover/study:-translate-y-0.5"
            aria-hidden="true"
          />
          {{ t.projects.study[item.key] }}
        </dt>
        <dd class="mt-2 text-sm leading-relaxed text-ink-soft">{{ project.study[item.key] }}</dd>
      </div>
    </dl>

    <p v-reveal="300" class="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
      <a
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        {{ t.projects.visit }}
        <span class="sr-only">{{ t.projects.newTab }}</span>
      </a>
      <a
        v-if="project.repo"
        :href="project.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="text-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        {{ t.projects.code }} · {{ repoHost(project.repo) }}
        <span class="sr-only">{{ t.projects.newTab }}</span>
      </a>
    </p>
  </article>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck, faCircleQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocale } from "../composables/useLocale.js";
import { repoHost } from "../data/projects.js";

defineProps({
  project: { type: Object, required: true },
});

const STUDY_ITEMS = [
  { key: "problem", icon: faCircleQuestion },
  { key: "role", icon: faUser },
  { key: "result", icon: faCircleCheck },
];
const { t } = useLocale();
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .featured-shot.reveal .featured-frame {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.9s cubic-bezier(0.7, 0, 0.2, 1) var(--reveal-delay, 0ms);
  }
  .featured-shot.reveal .featured-settle {
    transform: scale(1.08);
    transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) var(--reveal-delay, 0ms);
  }
  .featured-shot.reveal.is-in .featured-frame {
    clip-path: inset(0);
  }
  .featured-shot.reveal.is-in .featured-settle {
    transform: scale(1);
  }

  .study-item.reveal {
    border-top-color: transparent;
    background: linear-gradient(rgb(var(--line) / 0.1), rgb(var(--line) / 0.1)) left top / 0% 1px
      no-repeat;
    transition:
      opacity 0.6s ease var(--reveal-delay, 0ms),
      transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) var(--reveal-delay, 0ms),
      background-size 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) calc(var(--reveal-delay, 0ms) + 0.2s);
  }
  .study-item.reveal.is-in {
    background-size: 100% 1px;
  }
}
</style>
