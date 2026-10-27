<template>
  <div ref="el" class="h-full bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-10 gap-8 overflow-hidden">

    <header ref="headerEl" class="flex items-end justify-between gap-4 border-b border-gray-200 pb-5">
      <div>
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-indigo-500 mb-2 animate-fade-in">
          // sources
        </p>
        <h1 class="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none animate-fade-in">
          Veille Technologique
        </h1>
      </div>
      <p class="hidden sm:block text-sm text-gray-400 italic max-w-xs text-right animate-fade-in-delay">
        Les sources que je consulte pour rester à jour.
      </p>
    </header>

    <div class="flex flex-col">
      <a
        v-for="(item, index) in techList"
        :key="index"
        :href="item.link"
        target="_blank"
        class="veille-row group relative flex items-center gap-4 sm:gap-8 py-5 px-3 sm:px-6 no-underline border-b border-gray-200 overflow-hidden"
        :style="{ '--accent': item.accent }"
      >
        <span class="veille-fill absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span class="relative z-10 font-mono text-sm w-8 shrink-0 text-gray-300 group-hover:text-[color:var(--accent)] transition-colors duration-300">
          {{ String(index + 1).padStart(2, "0") }}
        </span>

        <div class="relative z-10 flex-1 min-w-0">
          <div class="flex items-center gap-3">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-500 group-hover:text-gray-900 transition-colors duration-300 group-hover:translate-x-1 transform-gpu">
              {{ item.title }}
            </h3>
            <span
              class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-gray-200 text-gray-400 group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)] transition-colors duration-300"
            >
              {{ item.category }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-0 max-h-0 opacity-0 group-hover:max-h-12 group-hover:mt-2 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
            {{ item.description }}
          </p>
        </div>

        <svg
          class="relative z-10 w-5 h-5 shrink-0 text-gray-300 group-hover:text-[color:var(--accent)] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H8M17 7V16" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

const el = ref(null);
const headerEl = ref(null);

const techList = ref([
  {
    title: "Medium",
    description: "Articles de développeurs et experts tech sur des sujets de fond.",
    link: "https://medium.com/tag/programming",
    category: "Blog",
    accent: "#12b886",
  },
  {
    title: "Daily.dev",
    description: "Réseau de développeurs — agrégateur de news tech personnalisé.",
    link: "https://daily.dev/fr-fr",
    category: "Communauté",
    accent: "#6366f1",
  },
  {
    title: "GitHub Trending",
    description: "Dépôts et développeurs en tendance chaque jour sur GitHub.",
    link: "https://github.com/trending/developers",
    category: "Open Source",
    accent: "#374151",
  },
  {
    title: "Dev.to",
    description: "Communauté ouverte de développeurs partageant articles et retours d'expérience.",
    link: "https://dev.to/",
    category: "Communauté",
    accent: "#f59e0b",
  },
  {
    title: "Hashnode",
    description: "Plateforme de blogs pour développeurs avec une audience tech engagée.",
    link: "https://hashnode.com/",
    category: "Blog",
    accent: "#06b6d4",
  },
  {
    title: "Node.js Blog",
    description: "Actualités officielles, releases et mises à jour de l'écosystème Node.js.",
    link: "https://nodejs.org/fr/blog/",
    category: "Officiel",
    accent: "#22c55e",
  },
]);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.8 });

  const rows = el.value.querySelectorAll(".veille-row");
  gsap.set(rows, { opacity: 0, x: -40 });
  tl.to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, "-=0.4");
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
.animate-fade-in-delay { opacity: 0; animation: fade-in 0.7s ease-out 0.15s forwards; }

.veille-fill {
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 75%);
}
</style>
