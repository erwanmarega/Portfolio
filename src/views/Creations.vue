<template>
  <div class="bg-white overflow-hidden">
    <div ref="el" class="relative flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 class="mb-6 flex flex-row gap-3 justify-center">
          <span ref="span1El" class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">Mes projets</span>
        </h1>

        <p ref="paraEl" class="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Une collection de réalisations web alliant design moderne, performance et expérience utilisateur.
        </p>

        <div ref="statsEl" class="grid grid-cols-3 gap-4 sm:gap-8 max-w-xs sm:max-w-lg mx-auto">
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900">5</div>
            <div class="text-sm text-gray-500 mt-1">Projets</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900">5+</div>
            <div class="text-sm text-gray-500 mt-1">Technologies</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900">2+</div>
            <div class="text-sm text-gray-500 mt-1">Années</div>
          </div>
        </div>
      </div>
    </div>

    <div ref="gridEl" class="px-4 sm:px-8 lg:px-14 pb-20 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] sm:auto-rows-[240px] gap-4">
        <a
          v-for="(creation, index) in creations"
          :key="creation.id"
          :href="creation.link"
          target="_blank"
          class="proj-tile group relative block rounded-3xl overflow-hidden no-underline shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-shadow duration-500"
          :class="creation.span"
          :style="{ '--accent': creation.accent }"
        >
          <img
            :src="creation.image"
            :alt="creation.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" :style="{ background: `linear-gradient(to top, ${creation.accent}, transparent 60%)` }"></div>

          <span class="absolute top-4 left-4 font-mono text-xs text-white/70">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <span class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </span>

          <div class="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
            <div class="w-10 h-0.5 rounded-sm transition-all duration-500 group-hover:w-16" :style="{ background: creation.accent }"></div>
            <h2 class="text-xl sm:text-2xl font-bold text-white leading-tight transition-transform duration-500 group-hover:-translate-y-0.5">
              {{ creation.title }}
            </h2>
            <p class="text-sm text-white/70 leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
              {{ creation.description }}
            </p>
            <div class="flex flex-wrap gap-1.5 mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
              <span
                v-for="tag in creation.tags"
                :key="tag"
                class="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-white border border-white/25 bg-white/10 backdrop-blur-sm"
              >{{ tag }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import spotifyImage from "../assets/spotify.webp";
import adiImage from "../assets/adi-image.webp";
import PersonaUI from "../assets/persona-ui.webp";
import GitAgent from "../assets/git-agent.webp";
import Postulo from "../assets/postulo.webp";

const el = ref(null);
const badgeEl = ref(null);
const span1El = ref(null);
const paraEl = ref(null);
const statsEl = ref(null);
const gridEl = ref(null);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });
  gsap.set(badgeEl.value, { opacity: 0, y: -20 });
  tl.to(badgeEl.value, { opacity: 1, y: 0 });
  gsap.set(span1El.value, { opacity: 0, y: 40 });
  tl.to(span1El.value, { opacity: 1, y: 0 }, "-=0.4");
  gsap.set([paraEl.value, statsEl.value], { opacity: 0, y: 30 });
  tl.to([paraEl.value, statsEl.value], { opacity: 1, y: 0, stagger: 0.12 }, "-=0.4");

  const tiles = gridEl.value ? gridEl.value.querySelectorAll(".proj-tile") : [];
  tiles.forEach((tile) => {
    const rect = tile.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tx = gsap.utils.random(-1, 1) * (window.innerWidth * 0.6);
    const ty = gsap.utils.random(-1, 1) * (window.innerHeight * 0.6);
    gsap.set(tile, {
      x: tx - (cx - window.innerWidth / 2) * 0.2,
      y: ty,
      rotation: gsap.utils.random(-35, 35),
      scale: 0.4,
      opacity: 0,
    });
  });
  tl.to(tiles, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration: 1.1,
    stagger: 0.1,
    ease: "power4.out",
  }, "-=0.3");
});

const creations = ref([
  {
    id: 0,
    title: "Calendrier Spotify",
    description: "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify.",
    image: spotifyImage,
    link: "https://spotcalendar.fr",
    accent: "#1db954",
    tags: ["Spotify API", "Vue.js", "Music"],
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: 1,
    title: "Git Agent",
    description: "Assistant CLI qui génère messages de commit, noms de branches, et s'intègre à Jira et GitHub.",
    image: GitAgent,
    link: "https://git-agent-steel.vercel.app/",
    accent: "#6366f1",
    tags: ["IA", "CLI", "Node.js"],
    span: "",
  },
  {
    id: 2,
    title: "PersonaUI",
    description: "Création de personas UX par IA, détaillés et exportables en PDF pour vos projets.",
    image: PersonaUI,
    link: "https://persona-ui-lyart.vercel.app/",
    accent: "#8b5cf6",
    tags: ["IA", "Vue.js", "UX", "PDF"],
    span: "",
  },
  {
    id: 3,
    title: "Refonte ADI",
    description: "Refonte complète du site de la société ADI, spécialisée dans l'agencement immobilier.",
    image: adiImage,
    link: "https://agencementimmo.vercel.app/",
    accent: "#06b6d4",
    tags: ["Vue.js", "Tailwind", "Responsive"],
    span: "lg:col-span-2",
  },
  {
    id: 4,
    title: "Postulo",
    description: "Connecte vos étudiants à votre tableau de bord. Pour les CFA et écoles en recherche d'alternance.",
    image: Postulo,
    link: "https://postulo.fr",
    accent: "#f59e0b",
    tags: ["SaaS", "Vue.js", "Dashboard"],
    span: "",
  },
]);
</script>

