<template>
  <section
    ref="el"
    aria-labelledby="journey-title"
    class="no-scrollbar min-h-screen flex flex-col justify-center py-8 gap-5 sm:gap-6"
  >
    <header
      ref="headerEl"
      class="lane-grid gap-y-3 border-b border-line/15 pb-5 lg:border-b-0"
    >
      <div class="lane-left relative lg:pb-5">
        <span
          class="journey-rule absolute left-0 right-0 bottom-0 hidden lg:block h-px bg-line/15 origin-left"
          aria-hidden="true"
        />
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-brand-text mb-2">
          // expérience & formation
        </p>
        <AsciiDecodeText
          tag="h1"
          id="journey-title"
          data-tower-anchor="journey"
          text="Parcours"
          idle-glitch
          :start="titleReady"
          class="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]"
        />
      </div>
      <div class="lane-right relative flex items-end justify-end lg:pb-5">
        <span
          class="journey-rule absolute left-0 right-0 bottom-0 hidden lg:block h-px bg-line/15 origin-right"
          aria-hidden="true"
        />
        <p class="hidden sm:block text-sm text-ink-muted italic max-w-xs sm:ml-auto lg:text-right">
          Mon expérience et mes formations, du lycée au mastère.
        </p>
      </div>
    </header>

    <div class="lane-grid">
      <div
        v-for="(column, ci) in columns"
        :key="ci"
        :class="[ci === 0 ? 'lane-left' : 'lane-right', 'flex flex-col gap-4 sm:gap-5']"
      >
        <div v-for="group in column" :key="group.label" class="journey-group">
          <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted mb-1">
            {{ group.label }}
          </h2>

          <ol class="flex flex-col">
            <li
              v-for="item in group.items"
              :key="item.title"
              class="journey-row group flex flex-col gap-1 py-3 border-b border-line/15 last:border-b-0"
            >
              <span
                class="font-mono text-sm text-ink-muted transition-colors duration-300 group-hover:text-brand-text"
              >
                {{ item.years }}
              </span>

              <div
                class="min-w-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
              >
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 class="text-base sm:text-lg font-bold text-ink leading-snug">
                    {{ item.title }}
                  </h3>
                  <span
                    v-if="item.ongoing"
                    class="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5"
                  >
                    <span class="relative flex w-1.5 h-1.5" aria-hidden="true">
                      <span
                        class="absolute inset-0 rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"
                      />
                      <span class="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                    En cours
                  </span>
                </div>
                <p class="text-sm font-medium text-ink-soft">
                  {{ item.institution }}
                </p>
                <p class="mt-1 text-sm text-ink-soft leading-relaxed">
                  {{ item.description }}
                </p>
                <ul class="mt-1.5 flex flex-wrap gap-1.5" aria-label="Compétences">
                  <li
                    v-for="tag in item.tags"
                    :key="tag"
                    class="journey-tag text-[11px] font-medium text-ink-soft border border-line/25 rounded-full px-2 py-0.5 transition-colors duration-300 group-hover:border-line/40 group-hover:text-ink"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import AsciiDecodeText from "../components/AsciiDecodeText.vue";

const el = ref(null);
const headerEl = ref(null);

const groups = [
  {
    label: "Expérience",
    items: [
      {
        title: "Ingénieur Développement — Alternance",
        institution: "Cegedim Business Services",
        years: "2025 – 2027",
        ongoing: true,
        description:
          "Développement d'interfaces web front-end, principalement en Vue.js.",
        tags: ["Vue.js", "Front-end"],
      },
    ],
  },
  {
    label: "Formation",
    items: [
      {
        title: "Mastère Dev Manager Full Stack",
        institution: "Efrei",
        years: "2025 – 2027",
        description:
          "Formation de haut niveau pour maîtriser les technologies back-end et front-end. Management et architecture.",
        tags: ["Full Stack", "Management", "Architecture"],
      },
      {
        title: "BUT MMI",
        institution: "Université Gustave Eiffel",
        years: "2022 – 2025",
        description:
          "Formation en multimédia, communication et développement web. Design, UX/UI et technologies front/back-end.",
        tags: ["Web", "UX/UI", "Multimédia"],
      },
      {
        title: "Baccalauréat STI2D",
        institution: "Lycée Pierre de Coubertin",
        years: "2020 – 2022",
        description:
          "Formation technologique axée sur l'innovation, l'ingénierie et le développement durable.",
        tags: ["Innovation", "Ingénierie", "Numérique"],
      },
    ],
  },
];

const [experience, formation] = groups;
const columns = [
  [experience, { label: formation.label, items: formation.items.slice(0, 1) }],
  [{ label: `${formation.label} (suite)`, items: formation.items.slice(1) }],
];

const entered = ref(false);
const titleReady = computed(() => entered.value);

const buildTimeline = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !el.value) return null;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  return tl.fromTo(
    headerEl.value.querySelectorAll(":scope > div"),
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: "opacity,transform" }
  )
    .fromTo(
      headerEl.value.querySelectorAll(".journey-rule"),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut", clearProps: "transform" },
      0
    )
    .fromTo(
      el.value.querySelectorAll(".journey-group > h2, .journey-row"),
      { opacity: 0, x: -12 },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.08,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    )
    .fromTo(
      el.value.querySelectorAll(".journey-tag"),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.02,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
};

useEnterAnimation(el, () => {
  entered.value = true;
  buildTimeline();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
