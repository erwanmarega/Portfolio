<template>
  <div class="bg-white overflow-hidden">
    <div ref="el" class="relative flex items-center justify-center py-24 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-float-slow"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div class="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div ref="badgeEl" class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 mb-8">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span class="text-sm font-medium text-gray-600">Découvrez mon travail</span>
        </div>

        <h1 class="mb-6 flex flex-row gap-3 justify-center">
          <span ref="span1El" class="text-6xl sm:text-6xl lg:text-6xl font-bold text-gray-900 tracking-tight">Mes</span>
          <span ref="span2El" class="text-6xl sm:text-6xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text tracking-tight">Projets</span>
        </h1>

        <p ref="paraEl" class="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
          Une collection de réalisations web alliant design moderne, performance et expérience utilisateur.
        </p>

        <div ref="statsEl" class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-gray-900">6+</div>
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

    <div class="flex flex-col px-6 pb-12">
      <div class="relative">
        <div class="absolute top-0 right-0 flex items-baseline gap-1 z-10">
          <span class="text-[2rem] font-bold text-gray-900 leading-none">{{ String(activeIndex + 1).padStart(2, "0") }}</span>
          <span class="text-base text-gray-300 mx-0.5">/</span>
          <span class="text-base text-gray-400">{{ String(creations.length).padStart(2, "0") }}</span>
        </div>

        <div class="flex items-center justify-center relative overflow-hidden mt-12 h-[420px]" ref="trackRef">
          <button
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 transition-all duration-200 hover:border-gray-700 hover:bg-gray-50 hover:scale-110 disabled:opacity-20 disabled:cursor-default disabled:hover:scale-100"
            @click="prev"
            :disabled="activeIndex === 0"
            aria-label="Précédent"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 transition-all duration-200 hover:border-gray-700 hover:bg-gray-50 hover:scale-110 disabled:opacity-20 disabled:cursor-default disabled:hover:scale-100"
            @click="next"
            :disabled="activeIndex === creations.length - 1"
            aria-label="Suivant"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            v-for="(creation, index) in creations"
            :key="creation.id"
            class="card-slide flex-shrink-0 h-full"
            :class="[
              index === activeIndex
                ? 'w-[55%] opacity-100 cursor-default z-10'
                : index < activeIndex
                  ? 'prev w-[18%] opacity-40 -translate-x-2.5 scale-[0.92] cursor-pointer'
                  : 'next w-[18%] opacity-40 translate-x-2.5 scale-[0.92] cursor-pointer'
            ]"
            @click="index !== activeIndex && goTo(index)"
          >
            <div
              class="bg-white rounded-[20px] overflow-hidden border border-gray-100 h-full"
              :class="index === activeIndex
                ? 'grid grid-cols-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                : 'flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.08)]'"
            >
              <div class="relative overflow-hidden" :class="index === activeIndex ? '' : 'aspect-[4/5]'">
                <img
                  :src="creation.image"
                  :alt="creation.title"
                  class="card-img w-full h-full object-cover"
                  :class="index === activeIndex ? 'hover:scale-[1.04]' : ''"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <Transition name="cta-fade">
                  <a
                    v-if="index === activeIndex"
                    :href="creation.link"
                    target="_blank"
                    class="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-white text-gray-900 px-[18px] py-2.5 rounded-full text-sm font-semibold no-underline transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                    @click.stop
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Voir le projet
                  </a>
                </Transition>
              </div>

              <Transition name="content-fade">
                <div v-if="index === activeIndex" :key="activeIndex" class="p-8 flex flex-col justify-center gap-3">
                  <div class="w-10 h-0.5 rounded-sm" :style="`background: ${creation.accent};`"></div>
                  <h2 class="text-2xl font-bold text-gray-900 leading-tight">{{ creation.title }}</h2>
                  <p class="text-sm text-gray-500 leading-relaxed">{{ creation.description }}</p>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="tag in creation.tags"
                      :key="tag"
                      class="px-3 py-1 rounded-full text-xs font-medium border"
                      :style="`color: ${creation.accent}; border-color: ${creation.accent}40; background: ${creation.accent}12;`"
                    >{{ tag }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 pt-6">
          <button
            v-for="(_, i) in creations"
            :key="i"
            class="h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
            :class="i === activeIndex ? 'w-6 rounded-[4px]' : 'w-2 bg-gray-200'"
            :style="i === activeIndex ? `background: ${creations[activeIndex].accent};` : ''"
            @click="goTo(i)"
            :aria-label="`Projet ${i + 1}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import spotifyImage from "../assets/spotify.webp";
import adiImage from "../assets/AdiImage.webp";
import PersonaUI from "../assets/PersonaUI.webp";
import GitAgent from "../assets/git-agent.webp";
import Postulo from "../assets/Postulo.webp";

const el = ref(null);
const badgeEl = ref(null);
const span1El = ref(null);
const span2El = ref(null);
const paraEl = ref(null);
const statsEl = ref(null);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });
  gsap.set(badgeEl.value, { opacity: 0, y: -20 });
  tl.to(badgeEl.value, { opacity: 1, y: 0 });
  gsap.set([span1El.value, span2El.value], { opacity: 0, y: 40 });
  tl.to([span1El.value, span2El.value], { opacity: 1, y: 0, stagger: 0.15 }, "-=0.4");
  gsap.set([paraEl.value, statsEl.value], { opacity: 0, y: 30 });
  tl.to([paraEl.value, statsEl.value], { opacity: 1, y: 0, stagger: 0.12 }, "-=0.4");
});

const creations = ref([
  {
    id: 0,
    title: "Postulo",
    description: "Postulo connecte vos étudiants à votre tableau de bord. Vous voyez leurs candidatures au fil de l'eau, sans leur envoyer un seul message. Pour les CFA et écoles en recherche d'alternance.",
    image: Postulo,
    link: "https://postulo.fr",
    accent: "#6366f1",
    tags: ["IA", "CLI", "GitHub", "Node.js"],
  },
  {
    id: 1,
    title: "Git Agent",
    description: "Assistant CLI intelligent qui génère automatiquement des messages de commit, suggère des noms de branches, et s'intègre avec Jira et GitHub pour un workflow de développement optimisé.",
    image: GitAgent,
    link: "https://git-agent-steel.vercel.app/",
    accent: "#6366f1",
    tags: ["IA", "CLI", "GitHub", "Node.js"],
  },
  {
    id: 2,
    title: "PersonaUI",
    description: "Création de personas UX grâce à l'intelligence artificielle. Génère des personas détaillés et exportables en PDF pour vos projets UX.",
    image: PersonaUI,
    link: "https://persona-ui-lyart.vercel.app/",
    accent: "#8b5cf6",
    tags: ["IA", "Vue.js", "UX", "PDF"],
  },
  {
    id: 3,
    title: "Refonte ADI",
    description: "Refonte complète du site de la société ADI spécialisée dans l'agencement immobilier. Design moderne et responsive.",
    image: adiImage,
    link: "https://agencementimmo.vercel.app/",
    accent: "#06b6d4",
    tags: ["Vue.js", "Tailwind", "Refonte", "Responsive"],
  },
  {
    id: 4,
    title: "Calendrier Spotify",
    description: "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify. Visualisez les nouvelles sorties de vos artistes préférés.",
    image: spotifyImage,
    link: "https://spotcalendar.vercel.app/",
    accent: "#1db954",
    tags: ["Spotify API", "Vue.js", "Music", "Calendar"],
  },
]);

const activeIndex = ref(0);
const goTo = (index) => { activeIndex.value = index; };
const prev = () => { if (activeIndex.value > 0) activeIndex.value--; };
const next = () => { if (activeIndex.value < creations.value.length - 1) activeIndex.value++; };

const onKeydown = (e) => {
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-30px) translateX(20px); }
}
@keyframes float-slow-reverse {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(30px) translateX(-20px); }
}

.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-slow-reverse { animation: float-slow-reverse 10s ease-in-out infinite; }

.bg-grid-pattern {
  background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.card-slide {
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-slide.prev,
.card-slide.next { filter: blur(1.5px); }

.card-img { transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1); }

.card-slide.prev ~ .card-slide.prev,
.card-slide.next ~ .card-slide.next { display: none; }

.content-fade-enter-active { transition: opacity 0.45s ease 0.25s, transform 0.45s ease 0.25s; }
.content-fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.content-fade-enter-from { opacity: 0; transform: translateY(10px); }
.content-fade-leave-to { opacity: 0; transform: translateY(-6px); }

.cta-fade-enter-active { transition: opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s; }
.cta-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.cta-fade-enter-from { opacity: 0; transform: translateY(6px); }
.cta-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
