<template>
  <section aria-labelledby="journey-title">
    <h2 id="journey-title" v-reveal class="section-label">Parcours</h2>

    <ol class="mt-6">
      <li
        v-reveal
        v-for="item in items"
        :key="item.title"
        class="grid gap-x-6 gap-y-1 border-t border-line/10 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
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
              En cours
            </span>
          </h3>
          <p class="text-[15px] text-ink-soft">{{ item.institution }}</p>
          <p class="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
const items = [
  {
    title: "Ingénieur Développement — Alternance",
    institution: "Cegedim Business Services",
    years: "2025 – 2027",
    ongoing: true,
    description:
      "Développement d'interfaces web front-end, principalement en Vue.js.",
  },
  {
    title: "Mastère Dev Manager Full Stack",
    institution: "Efrei",
    years: "2025 – 2027",
    description:
      "Architecture logicielle, back-end et gestion de projet, en alternance avec Cegedim.",
  },
  {
    title: "BUT MMI",
    institution: "Université Gustave Eiffel",
    years: "2022 – 2025",
    description:
      "Design, UX/UI et développement web. C'est là que j'ai appris à penser l'interface avant le code.",
  },
];
</script>
