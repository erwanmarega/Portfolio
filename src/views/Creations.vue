<template>
  <div ref="el" class="bg-white">
    <!-- Section Portal (intro pleine page) -->
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

    <!-- Section horizontale (desktop) -->
    <section
      ref="horizontalSection"
      class="hidden lg:block relative bg-white overflow-hidden"
    >
      <div ref="horizontalTrack" class="horizontal-track flex h-screen">
        <!-- Slide projet : image pleine page + overlay sombre + infos -->
        <article
          v-for="(creation, index) in creations"
          :key="creation.id"
          class="project-slide relative flex-shrink-0 w-screen h-screen"
          :style="{ '--accent': creation.accent }"
        >
          <!-- Image de fond -->
          <img
            :src="creation.image"
            :alt="creation.title"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <!-- Overlay sombre avec dégradé -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"
          />
          <div
            class="absolute inset-0"
            :style="{
              background: `linear-gradient(to top, ${creation.accent}30 0%, transparent 60%)`,
            }"
          />

          <!-- Contenu du projet -->
          <div
            class="absolute bottom-0 left-0 w-full p-12 lg:p-16 xl:p-24 flex flex-col justify-end"
          >
            <div class="max-w-4xl">
              <div class="flex items-center gap-4 mb-5">
                <span
                  class="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                  :style="{ backgroundColor: creation.accent }"
                >
                  {{ creation.category }}
                </span>
                <span class="font-mono text-sm text-white/60">
                  {{ String(index + 1).padStart(2, "0") }} /
                  {{ String(creations.length).padStart(2, "0") }}
                </span>
              </div>

              <h2
                class="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-5 leading-tight"
              >
                {{ creation.title }}
              </h2>

              <p
                class="text-lg lg:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl"
              >
                {{ creation.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-10">
                <span
                  v-for="tag in creation.tags"
                  :key="tag"
                  class="px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm"
                  :style="{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }"
                >
                  {{ tag }}
                </span>
              </div>

              <a
                :href="creation.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
                :style="{ backgroundColor: creation.accent }"
              >
                Voir le projet
                <font-awesome-icon
                  :icon="['fas', 'arrow-up-right-from-square']"
                  class="w-4 h-4"
                />
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Indicateur de progression -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <button
          v-for="(_, index) in creations"
          :key="index"
          type="button"
          class="progress-dot w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
          :class="{ 'w-8 bg-gray-900': activeSlide === index }"
          @click="goToSlide(index)"
          :aria-label="`Projet ${index + 1}`"
        />
      </div>
    </section>

    <!-- Fallback mobile : grille verticale -->
    <section
      ref="contentSection"
      class="lg:hidden relative bg-white pt-20 sm:pt-28 pb-20 px-4 sm:px-8"
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

        <div
          ref="gridEl"
          class="project-grid grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <a
            v-for="(creation, index) in creations"
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import spotifyImage from "../assets/spotify.png";
import adiImage from "../assets/adi-image.webp";
import Hovly from "../assets/hovly.png";
import GitAgent from "../assets/git-agent.webp";
import Postulo from "../assets/postulo.webp";
import AsciiPortal from "../components/AsciiPortal.vue";

library.add(faArrowUpRightFromSquare);
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const el = ref(null);
const portalSection = ref(null);
const portalWrapper = ref(null);
const horizontalSection = ref(null);
const horizontalTrack = ref(null);
const contentSection = ref(null);
const headerEl = ref(null);
const statsEl = ref(null);
const gridEl = ref(null);

const statProjects = ref(null);
const statTech = ref(null);
const statYears = ref(null);
const activeSlide = ref(0);

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
    accent: "#841EFA",
    tags: ["SaaS", "Vue.js", "Dashboard"],
    category: "SaaS",
  },
]);

const uniqueTechnologies = computed(() => {
  const techs = new Set();
  creations.value.forEach((c) => c.tags.forEach((t) => techs.add(t)));
  return techs.size;
});

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
  Array.from(gridEl.value?.querySelectorAll(".proj-card") ?? []);

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

const animateContent = () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  gsap.set(statsEl.value, { opacity: 0, y: 20 });

  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.8 })
    .to(statsEl.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
    .add(() => animateStats(), "-=0.4")
    .add(() => {
      animateCardsEnter();
      attachTilt();
    }, "-=0.8");
};

let portalTrigger = null;
let contentTrigger = null;
let horizontalTriggers = [];
let matchMediaInstance = null;
let scrollBlockers = [];

const addScrollBlocker = (type, handler, options = {}) => {
  window.addEventListener(type, handler, options);
  scrollBlockers.push({ type, handler, options });
};

const removeScrollBlockers = () => {
  scrollBlockers.forEach(({ type, handler, options }) => {
    window.removeEventListener(type, handler, options);
  });
  scrollBlockers = [];
};

const blockWheelAtEnd = (e) => {
  const tween = horizontalTriggers[0];
  if (!tween?.scrollTrigger) return;
  if (tween.scrollTrigger.progress >= 0.995 && e.deltaY > 0) {
    e.preventDefault();
  }
};

let touchStartY = 0;
const blockTouchStart = (e) => {
  touchStartY = e.touches[0]?.clientY ?? 0;
};
const blockTouchMoveAtEnd = (e) => {
  const tween = horizontalTriggers[0];
  if (!tween?.scrollTrigger) return;
  const currentY = e.touches[0]?.clientY ?? touchStartY;
  const deltaY = touchStartY - currentY;
  if (tween.scrollTrigger.progress >= 0.995 && deltaY > 0) {
    e.preventDefault();
  }
  touchStartY = currentY;
};

const goToSlide = (index) => {
  if (!horizontalTrack.value) return;
  const slides = gsap.utils.toArray(".project-slide", horizontalTrack.value);
  if (!slides[index]) return;

  const st = horizontalTriggers[0];
  if (st && st.scrollTrigger) {
    const progress = index / (slides.length - 1);
    const scrollTo =
      st.scrollTrigger.start +
      progress * (st.scrollTrigger.end - st.scrollTrigger.start);
    gsap.to(window, {
      scrollTo: { y: scrollTo, autoKill: false },
      duration: 0.8,
      ease: "power2.inOut",
    });
  }
};

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

  // Animation du contenu mobile quand il entre dans la vue
  contentTrigger = ScrollTrigger.create({
    trigger: contentSection.value,
    start: "top 75%",
    once: true,
    onEnter: animateContent,
  });

  // Scroll horizontal — uniquement sur desktop
  matchMediaInstance = gsap.matchMedia();
  matchMediaInstance.add("(min-width: 1024px)", () => {
    const slides = gsap.utils.toArray(".project-slide", horizontalTrack.value);
    if (!slides.length) return;

    gsap.set(horizontalTrack.value, { willChange: "transform" });

    const maxScroll = () => horizontalTrack.value.scrollWidth - window.innerWidth;

    const horizontalTween = gsap.to(horizontalTrack.value, {
      x: () => -maxScroll(),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection.value,
        start: "top top",
        end: () => "+=" + maxScroll(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const newIndex = Math.round(self.progress * (slides.length - 1));
          if (newIndex !== activeSlide.value) {
            activeSlide.value = newIndex;
          }
        },
        onLeave: () => {
          gsap.set(horizontalTrack.value, { willChange: "auto" });
        },
        onLeaveBack: () => {
          activeSlide.value = 0;
        },
      },
    });

    horizontalTriggers.push(horizontalTween);

    // Bloque le scroll vers le bas après le dernier slide
    addScrollBlocker("wheel", blockWheelAtEnd, { passive: false });
    addScrollBlocker("touchstart", blockTouchStart, { passive: true });
    addScrollBlocker("touchmove", blockTouchMoveAtEnd, { passive: false });

    return () => {
      removeScrollBlockers();
    };
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
  horizontalTriggers.forEach((t) => {
    if (t.scrollTrigger) t.scrollTrigger.kill();
    t.kill();
  });
  horizontalTriggers = [];
  if (matchMediaInstance) {
    matchMediaInstance.revert();
    matchMediaInstance = null;
  }
  removeScrollBlockers();
  ScrollTrigger.getAll().forEach((t) => {
    if (
      t.trigger === portalSection.value ||
      t.trigger === contentSection.value ||
      t.trigger === horizontalSection.value
    ) {
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

.horizontal-track {
  width: fit-content;
}

.project-slide {
  will-change: transform;
}
</style>
