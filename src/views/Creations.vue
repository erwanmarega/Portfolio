<template>
  <div ref="el" class="bg-white">
    <!-- Section Portal -->
    <section
      ref="portalSection"
      class="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center"
    >
      <div
        ref="portalWrapper"
        class="portal-wrapper relative w-screen h-screen overflow-hidden"
      >
        <AsciiPortal>
          <div class="flex flex-col items-center">
            <span
              class="text-white/70 text-xs sm:text-sm font-mono uppercase tracking-widest mb-3"
            >
              Portfolio
            </span>
            <h2
              class="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Projets
            </h2>
          </div>
        </AsciiPortal>
      </div>

      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-medium flex flex-col items-center gap-2 z-20"
      >
        <span>Découvrir</span>
        <svg
          class="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <!-- Section Contenu -->
    <section
      ref="contentSection"
      class="relative bg-white pt-20 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-14"
    >
      <div class="max-w-6xl mx-auto">
        <header ref="headerEl" class="text-center mb-12">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none"
          >
            Mes projets
          </h1>
          <p
            class="mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Une collection de réalisations web alliant design moderne,
            performance et expérience utilisateur.
          </p>

          <div
            ref="statsEl"
            class="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10"
          >
            <div class="text-center">
              <div
                ref="statProjects"
                class="text-3xl sm:text-4xl font-bold text-gray-900"
              >
                0
              </div>
              <div class="text-sm text-gray-500 mt-1">Projets</div>
            </div>
            <div class="text-center">
              <div
                ref="statTech"
                class="text-3xl sm:text-4xl font-bold text-gray-900"
              >
                0
              </div>
              <div class="text-sm text-gray-500 mt-1">Technologies</div>
            </div>
            <div class="text-center">
              <div
                ref="statYears"
                class="text-3xl sm:text-4xl font-bold text-gray-900"
              >
                0
              </div>
              <div class="text-sm text-gray-500 mt-1">Années</div>
            </div>
          </div>
        </header>

        <div ref="filtersEl" class="flex flex-wrap justify-center gap-2 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="filter-chip px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300"
            :class="
              activeFilter === category
                ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            "
            @click="setFilter(category)"
          >
            {{ category }}
          </button>
        </div>

        <TransitionGroup
          ref="gridEl"
          name="project-list"
          tag="div"
          class="project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <a
            v-for="(creation, index) in filteredCreations"
            :key="creation.id"
            :href="creation.link"
            target="_blank"
            rel="noopener noreferrer"
            class="proj-card group relative flex flex-col bg-white rounded-3xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden"
            :style="{ '--accent': creation.accent }"
          >
            <div class="relative h-52 overflow-hidden">
              <img
                :src="creation.image"
                :alt="creation.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              />
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                :style="{
                  background: `linear-gradient(to top, ${creation.accent}90, transparent 65%)`,
                }"
              />

              <span
                class="absolute top-4 left-4 font-mono text-xs text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg"
              >
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <span
                class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              >
                <font-awesome-icon
                  :icon="['fas', 'arrow-up-right-from-square']"
                  class="w-3.5 h-3.5"
                />
              </span>

              <div class="absolute bottom-4 left-4 right-4">
                <span
                  class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/20 mb-2"
                >
                  {{ creation.category }}
                </span>
                <h2
                  class="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-sm"
                >
                  {{ creation.title }}
                </h2>
              </div>
            </div>

            <div class="flex flex-col flex-1 p-5 gap-3">
              <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {{ creation.description }}
              </p>

              <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
                <span
                  v-for="tag in creation.tags"
                  :key="tag"
                  class="px-2.5 py-1 rounded-full text-[11px] font-medium border"
                  :style="{
                    color: creation.accent,
                    borderColor: `${creation.accent}40`,
                    backgroundColor: `${creation.accent}10`,
                  }"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div
              class="h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
              :style="{ background: creation.accent }"
            />
          </a>
        </TransitionGroup>

        <div
          v-if="filteredCreations.length === 0"
          ref="emptyEl"
          class="text-center py-20"
        >
          <div
            class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400"
          >
            <font-awesome-icon :icon="['fas', 'folder-open']" class="w-7 h-7" />
          </div>
          <p class="text-gray-500 font-medium">
            Aucun projet dans cette catégorie.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import spotifyImage from "../assets/spotify.webp";
import adiImage from "../assets/adi-image.webp";
import Hovly from "../assets/hovly.png";
import GitAgent from "../assets/git-agent.webp";
import Postulo from "../assets/postulo.webp";
import AsciiPortal from "../components/AsciiPortal.vue";

library.add(faArrowUpRightFromSquare, faFolderOpen);
gsap.registerPlugin(ScrollTrigger);

const el = ref(null);
const portalSection = ref(null);
const portalWrapper = ref(null);
const contentSection = ref(null);
const headerEl = ref(null);
const statsEl = ref(null);
const filtersEl = ref(null);
const gridEl = ref(null);
const emptyEl = ref(null);

const statProjects = ref(null);
const statTech = ref(null);
const statYears = ref(null);

const activeFilter = ref("Tous");
const categories = ["Tous", "Web App", "SaaS", "Outil", "Refonte"];

const creations = ref([
  {
    id: 0,
    title: "Calendrier Spotify",
    description:
      "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify.",
    image: spotifyImage,
    link: "https://spotcalendar.fr",
    accent: "#1db954",
    tags: ["Spotify API", "Vue.js", "Music"],
    category: "Web App",
  },
  {
    id: 1,
    title: "Git Agent",
    description:
      "Assistant CLI qui génère messages de commit, noms de branches, et s'intègre à Jira et GitHub.",
    image: GitAgent,
    link: "https://git-agent-steel.vercel.app/",
    accent: "#6366f1",
    tags: ["IA", "CLI", "Node.js"],
    category: "Outil",
  },
  {
    id: 2,
    title: "Hovly",
    description: "Crée ton tableau de bord immobilier en moins d'une minute.",
    image: Hovly,
    link: "https://hovly-production.up.railway.app/",
    accent: "#ffd02f",
    tags: ["IA", "Vue.js", "UX", "PDF"],
    category: "SaaS",
  },
  {
    id: 3,
    title: "Refonte ADI",
    description:
      "Refonte complète du site de la société ADI, spécialisée dans l'agencement immobilier.",
    image: adiImage,
    link: "https://agencementimmo.vercel.app/",
    accent: "#06b6d4",
    tags: ["Vue.js", "Tailwind", "Responsive"],
    category: "Refonte",
  },
  {
    id: 4,
    title: "Postulo",
    description:
      "Connecte vos étudiants à votre tableau de bord. Pour les CFA et écoles en recherche d'alternance.",
    image: Postulo,
    link: "https://postulo.fr",
    accent: "#f59e0b",
    tags: ["SaaS", "Vue.js", "Dashboard"],
    category: "SaaS",
  },
]);

const filteredCreations = computed(() => {
  if (activeFilter.value === "Tous") return creations.value;
  return creations.value.filter((c) => c.category === activeFilter.value);
});

const uniqueTechnologies = computed(() => {
  const techs = new Set();
  creations.value.forEach((c) => c.tags.forEach((t) => techs.add(t)));
  return techs.size;
});

const setFilter = (category) => {
  activeFilter.value = category;
};

const animateStats = () => {
  const targets = [
    { el: statProjects.value, value: creations.value.length },
    { el: statTech.value, value: uniqueTechnologies.value },
    { el: statYears.value, value: 3 },
  ];

  targets.forEach(({ el, value }) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.5,
        ease: "power2.out",
        snap: { innerText: 1 },
      }
    );
  });
};

const getTiles = () =>
  Array.from(gridEl.value?.$el?.querySelectorAll(".proj-card") ?? []);

const animateCardsEnter = () => {
  const tiles = getTiles();
  if (!tiles.length) return;

  gsap.fromTo(
    tiles,
    { rotationY: -90, opacity: 0, scale: 0.9 },
    {
      rotationY: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
    }
  );
};

const animateCardsExit = () => {
  const tiles = getTiles();
  if (!tiles.length) return Promise.resolve();

  return gsap.to(tiles, {
    rotationY: 90,
    opacity: 0,
    scale: 0.9,
    duration: 0.4,
    stagger: 0.04,
    ease: "power2.in",
  });
};

const attachTilt = () => {
  const tiles = getTiles();
  tiles.forEach((card) => {
    if (card.dataset.tiltAttached) return;
    card.dataset.tiltAttached = "true";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.18)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
};

watch(activeFilter, async () => {
  await animateCardsExit();
  await nextTick();
  animateCardsEnter();
  attachTilt();
});

const animateContent = () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  gsap.set(statsEl.value, { opacity: 0, y: 20 });
  gsap.set(filtersEl.value, { opacity: 0, y: 20 });

  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.8 })
    .to(statsEl.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
    .to(filtersEl.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
    .add(() => animateStats(), "-=0.4")
    .add(() => {
      animateCardsEnter();
      attachTilt();
    }, "-=0.8");
};

let contentTrigger = null;
let portalTrigger = null;

onMounted(() => {
  const portal = portalWrapper.value;

  gsap.set(portal, { willChange: "transform, opacity" });

  // Portal scroll effect — plein écran sans border-radius
  const portalTl = gsap.timeline({
    scrollTrigger: {
      trigger: portalSection.value,
      start: "top top",
      end: "+=120%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onLeaveBack: () => {
        gsap.set(portal, { scale: 1, opacity: 1 });
      },
      onLeave: () => {
        gsap.set(portal, { willChange: "auto" });
      },
    },
  });

  portalTl.fromTo(
    portal,
    { scale: 1, opacity: 1 },
    { scale: 1.15, opacity: 0, ease: "power2.inOut" },
    0
  );

  portalTrigger = portalTl.scrollTrigger;

  // Animation du contenu quand il entre dans la vue
  contentTrigger = ScrollTrigger.create({
    trigger: contentSection.value,
    start: "top 75%",
    once: true,
    onEnter: animateContent,
  });
});

onUnmounted(() => {
  if (portalTrigger) {
    portalTrigger.kill();
    portalTrigger = null;
  }
  if (contentTrigger) {
    contentTrigger.kill();
    contentTrigger = null;
  }
  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger === portalSection.value || t.trigger === contentSection.value) {
      t.kill();
    }
  });
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-grid {
  perspective: 1200px;
}

.proj-card {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.portal-wrapper {
  transform-origin: center center;
}
</style>
