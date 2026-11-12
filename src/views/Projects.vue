<template>
  <section aria-labelledby="projects-title">
    <h2 id="projects-title" v-reveal class="section-label">{{ t.projects.title }}</h2>

    <h3 v-reveal class="mt-6 text-sm font-medium text-ink">{{ t.projects.featured }}</h3>
    <div class="mt-5 space-y-14">
      <FeaturedProject v-for="project in featured" :key="project.id" :project="project" />
    </div>

    <template v-for="(group, index) in groups" :key="group.id">
      <h3 v-reveal class="text-sm font-medium text-ink" :class="index === 0 ? 'mt-14' : 'mt-12'">
        {{ group.label }}
      </h3>
      <ul class="mt-5">
        <li
          v-for="project in group.items"
          :key="project.id"
          v-reveal
          class="relative border-t border-line/10 first:border-t-0 [&:first-child>a]:pt-0"
        >
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="group grid gap-x-6 gap-y-4 rounded-lg py-6 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start"
          >
            <div class="overflow-hidden rounded-lg border border-line/10 bg-surface-strong">
              <img
                :src="project.image"
                :alt="t.projects.alt.replace('{title}', project.title)"
                loading="lazy"
                class="aspect-[16/10] w-full object-cover object-top transition-[transform,filter] duration-500 motion-safe:group-hover:scale-[1.03] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-focus-visible:grayscale-0"
              />
            </div>

            <div class="min-w-0" :class="{ 'sm:pb-8': project.repo }">
              <h4
                class="flex items-baseline gap-2 font-medium text-ink transition-colors group-hover:text-brand-text"
              >
                {{ project.title }}
                <svg
                  viewBox="0 0 16 16"
                  class="h-3 w-3 shrink-0 self-center"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
                </svg>
              </h4>
              <p class="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                {{ project.description }}
              </p>
              <p class="mt-3 font-mono text-xs text-ink-muted">
                {{ project.tags.join(" · ") }}
              </p>
              <span class="sr-only">{{ t.projects.newTab }}</span>
            </div>
          </a>

          <p
            v-if="project.repo"
            class="-mt-3 pb-6 sm:absolute sm:bottom-6 sm:left-[calc(220px+1.5rem)] sm:mt-0 sm:pb-0"
          >
            <a
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link rounded-sm font-mono text-xs outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {{ t.projects.code }} · {{ repoHost(project.repo) }}
              <span class="sr-only">{{ t.projects.newTab }}</span>
            </a>
          </p>
        </li>
      </ul>
    </template>
    <ContributionGraph />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../composables/useLocale.js";
import ContributionGraph from "../components/ContributionGraph.vue";
import FeaturedProject from "../components/FeaturedProject.vue";
import { PROJECT_GROUPS, projects, repoHost } from "../data/projects.js";

const { t } = useLocale();

const withTexts = (project) => ({ ...project, ...t.value.projects.items[project.id] });
const featured = computed(() => projects.filter((project) => project.featured).map(withTexts));

const groups = computed(() =>
  PROJECT_GROUPS.map((id) => ({
    id,
    label: t.value.projects.groups[id],
    items: projects.filter((project) => project.group === id && !project.featured).map(withTexts),
  })).filter((group) => group.items.length),
);
</script>
