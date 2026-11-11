<template>
  <article class="cv-page">
    <!-- Print only: the sidebar is hidden on paper, so the identity block is repeated here. -->
    <header class="hidden print:block">
      <p class="cv-name font-semibold text-ink">Erwan Marega</p>
      <p class="text-ink-soft">{{ t.sidebar.role }}</p>
      <!-- Real links: they stay clickable in the generated PDF. -->
      <p class="mt-1 text-ink-soft">
        <template v-for="(contact, index) in contacts" :key="contact.href">
          <span v-if="index > 0" aria-hidden="true"> · </span>
          <a :href="contact.href">{{ contact.label }}</a>
        </template>
      </p>
    </header>

    <div class="flex justify-end print:hidden">
      <button
        type="button"
        class="text-link rounded-sm text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        @click="printPage"
      >
        {{ t.cv.print }}
      </button>
    </div>

    <section aria-labelledby="cv-profile-title" class="mt-4 print:mt-0">
      <h2 id="cv-profile-title" v-reveal class="section-label">{{ t.cv.sections.profile }}</h2>
      <p v-reveal="80" class="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
        {{ t.cv.profile }}
      </p>
    </section>

    <section
      v-for="block in journeyBlocks"
      :key="block.id"
      :aria-labelledby="`cv-${block.id}-title`"
      class="cv-section mt-16"
    >
      <h2 :id="`cv-${block.id}-title`" v-reveal class="section-label">
        {{ t.cv.sections[block.id] }}
      </h2>
      <ol class="mt-6">
        <li
          v-for="item in block.items"
          :key="item.id"
          v-reveal
          class="cv-entry grid gap-x-6 gap-y-1 border-t border-line/10 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
        >
          <p class="font-mono text-[13px] text-ink-muted sm:pt-0.5">{{ item.years }}</p>
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
            <p class="text-[15px] text-ink-soft">
              {{ item.institution }}<template v-if="item.place"> · {{ item.place }}</template>
            </p>
            <p v-if="item.description" class="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
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

    <section aria-labelledby="cv-skills-title" class="cv-section mt-16">
      <h2 id="cv-skills-title" v-reveal class="section-label">{{ t.cv.sections.skills }}</h2>
      <dl class="mt-6">
        <div
          v-for="row in t.cv.skills"
          :key="row.label"
          v-reveal
          class="cv-entry grid gap-x-6 gap-y-1 border-t border-line/10 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
        >
          <dt class="text-[15px] text-ink-muted">{{ row.label }}</dt>
          <dd class="text-[15px] leading-relaxed text-ink">{{ row.text }}</dd>
        </div>
      </dl>
    </section>

    <section aria-labelledby="cv-projects-title" class="cv-section mt-16">
      <h2 id="cv-projects-title" v-reveal class="section-label">{{ t.cv.sections.projects }}</h2>
      <ul class="mt-6">
        <li
          v-for="project in localizedProjects"
          :key="project.id"
          v-reveal
          class="cv-entry grid gap-x-6 gap-y-1 border-t border-line/10 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
        >
          <h3 class="font-medium text-ink">
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {{ project.title }}<span class="sr-only"> {{ t.projects.newTab }}</span>
            </a>
          </h3>
          <p class="text-[15px] leading-relaxed text-ink-soft">{{ project.description }}</p>
        </li>
      </ul>
    </section>

    <section aria-labelledby="cv-more-title" class="cv-section mt-16">
      <h2 id="cv-more-title" v-reveal class="section-label">{{ t.cv.sections.more }}</h2>
      <dl class="mt-6">
        <div
          v-for="row in t.cv.more"
          :key="row.label"
          v-reveal
          class="cv-entry grid gap-x-6 gap-y-1 border-t border-line/10 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
        >
          <dt class="text-[15px] text-ink-muted">{{ row.label }}</dt>
          <dd class="text-[15px] leading-relaxed text-ink">{{ row.text }}</dd>
        </div>
      </dl>
    </section>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useLocale } from "../composables/useLocale.js";
import { journey } from "../data/journey.js";
import { projects } from "../data/projects.js";

const { t } = useLocale();

const contacts = [
  { label: "maregaerwan@gmail.com", href: "mailto:maregaerwan@gmail.com" },
  { label: "linkedin.com/in/erwan-marega", href: "https://www.linkedin.com/in/erwan-marega/" },
  { label: "github.com/erwanmarega", href: "https://github.com/erwanmarega" },
  { label: "www.ewmdev.com", href: "https://www.ewmdev.com" },
];

// Experience (kind work) and Education (kind education), texts matched by entry id.
const journeyBlocks = computed(() =>
  [
    { id: "experience", kind: "work" },
    { id: "education", kind: "education" },
  ].map(({ id, kind }) => ({
    id,
    items: journey
      .filter((item) => item.kind === kind)
      .map((item) => ({ ...item, ...t.value.journey.items[item.id] })),
  })),
);

const localizedProjects = computed(() =>
  projects.map((project) => ({ ...project, ...t.value.projects.items[project.id] })),
);

function printPage() {
  window.print();
}
</script>

<style scoped>
@media print {
  /* Compact sizes so the whole CV fits one A4 page. Utilities set fixed px
     sizes and margins, hence !important. Check with a print preview after
     adding content. */
  .cv-name {
    font-size: 18pt;
    line-height: 1.1;
  }
  .cv-page > header {
    margin-bottom: 3mm;
  }
  .cv-page :is(p, dt, dd, li, h3):not(.cv-name) {
    font-size: 8.6pt !important;
    line-height: 1.3 !important;
  }
  .cv-page p[class*="font-mono"] {
    font-size: 7.6pt !important;
  }
  .cv-page :is(h2) {
    font-size: 7.6pt;
    padding-bottom: 1mm;
  }
  .cv-page section > p {
    margin-top: 2mm !important;
    max-width: none;
  }
  .cv-section {
    margin-top: 2.6mm;
  }
  .cv-page section > :is(ol, ul, dl) {
    margin-top: 1.5mm;
  }
  .cv-entry {
    padding-top: 0.7mm !important;
    padding-bottom: 0.7mm !important;
    break-inside: avoid;
    page-break-inside: avoid;
    grid-template-columns: 24mm minmax(0, 1fr);
  }
  .cv-entry div > :is(p, ul) {
    margin-top: 0.5mm !important;
  }
  .cv-entry ul > li + li {
    margin-top: 0.2mm !important;
  }
}
</style>
