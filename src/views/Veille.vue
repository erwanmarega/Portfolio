<template>
  <div ref="el" class="h-full bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-10 gap-8 overflow-hidden">

    <header ref="headerEl" class="text-center">
      <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none animate-fade-in">
        Veille Technologique
      </h1>
      <p class="mt-2 text-sm text-gray-400 italic animate-fade-in-delay">
        Les sources que je consulte pour rester à jour.
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="(item, index) in techList"
        :key="index"
        :href="item.link"
        target="_blank"
        class="veille-card group flex flex-col gap-3 bg-white border border-gray-100 rounded-2xl p-5 no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        :style="`border-left: 3px solid ${item.accent};`"
      >
        <div class="flex items-center justify-between">
          <span
            class="text-xs font-semibold px-3 py-1 rounded-full border"
            :style="`color: ${item.accent}; background: ${item.accent}18; border-color: ${item.accent}40;`"
          >
            {{ item.category }}
          </span>
        </div>

        <h3 class="text-base font-bold text-gray-900">{{ item.title }}</h3>

        <p class="text-xs text-gray-500 leading-relaxed flex-1">{{ item.description }}</p>

        <div
          class="flex items-center gap-1.5 text-xs font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          :style="`color: ${item.accent};`"
        >
          <span>Consulter</span>
          <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </div>
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
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.8 });

  const cards = el.value.querySelectorAll(".veille-card");
  gsap.set(cards, { opacity: 0, y: 50 });
  tl.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.4");
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
.animate-fade-in-delay { opacity: 0; animation: fade-in 0.7s ease-out 0.15s forwards; }
</style>
