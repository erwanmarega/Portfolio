<template>
  <section
    ref="el"
    aria-labelledby="parcours-title"
    class="no-scrollbar min-h-screen bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 gap-5 sm:gap-6"
  >
    <header
      ref="headerEl"
      class="relative flex items-end justify-between gap-4 pb-5"
    >
      <span
        class="edu-rule absolute left-0 right-0 bottom-0 h-px bg-gray-200 origin-left"
        aria-hidden="true"
      />
      <div>
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-indigo-500 mb-2">
          // expérience & formation
        </p>
        <h1
          id="parcours-title"
          class="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none"
        >
          Parcours
        </h1>
      </div>
      <p class="hidden sm:block text-sm text-gray-400 italic max-w-xs text-right">
        Mon expérience et mes formations, du lycée au mastère.
      </p>
    </header>

    <div class="flex flex-col gap-4 sm:gap-5">
      <div v-for="group in groups" :key="group.label" class="edu-group">
        <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">
          {{ group.label }}
        </h2>

        <ol class="flex flex-col">
          <li
            v-for="item in group.items"
            :key="item.title"
            class="edu-row group flex flex-col sm:flex-row gap-1 sm:gap-8 py-3 border-b border-gray-100 last:border-b-0"
          >
            <span
              class="font-mono text-sm text-gray-400 sm:w-28 shrink-0 sm:pt-0.5 transition-colors duration-300 group-hover:text-indigo-500"
            >
              {{ item.years }}
            </span>

            <div
              class="flex-1 min-w-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
            >
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 class="text-base sm:text-lg font-bold text-gray-900 leading-snug">
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
              <p class="text-sm font-medium text-gray-500">
                {{ item.institution }}
              </p>
              <p class="mt-1 text-sm text-gray-600 leading-relaxed max-w-3xl">
                {{ item.description }}
              </p>
              <ul class="mt-1.5 flex flex-wrap gap-1.5" aria-label="Compétences">
                <li
                  v-for="tag in item.tags"
                  :key="tag"
                  class="edu-tag text-[11px] font-medium text-gray-500 border border-gray-200 rounded-full px-2 py-0.5 transition-colors duration-300 group-hover:border-gray-300 group-hover:text-gray-700"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject, watch, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

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

// set by SharkPortal: true once the zoom-in is nearly done
const portalOpen = inject("portalOpen", null);

const buildTimeline = (paused = false) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !el.value) return null;

  const tl = gsap.timeline({ paused, defaults: { ease: "power2.out" } });
  return tl.fromTo(
    headerEl.value.querySelectorAll(":scope > div, :scope > p"),
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: "opacity,transform" }
  )
    .fromTo(
      headerEl.value.querySelector(".edu-rule"),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut", clearProps: "transform" },
      0
    )
    .fromTo(
      el.value.querySelectorAll(".edu-group > h2, .edu-row"),
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
      el.value.querySelectorAll(".edu-tag"),
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

if (portalOpen) {
  // inside the portal the section is in view (scaled down) long before it is
  // readable, so wait for the zoom instead of the viewport
  let tl = null;
  onMounted(() => {
    tl = buildTimeline(true);
    if (portalOpen.value) tl?.play();
  });
  watch(portalOpen, (open) => open && tl?.play(), { once: true });
  onUnmounted(() => tl?.kill());
} else {
  useEnterAnimation(el, () => buildTimeline());
}
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
