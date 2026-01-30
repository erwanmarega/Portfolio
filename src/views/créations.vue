<template>
  <div
    class="min-h-screen bg-gray-100 text-gray-900 py-20 px-4 sm:px-6 lg:px-8"
  >
    <header class="mb-16 text-center">
      <h1
        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 animate-fade-in tracking-tight"
      >
        Mes Créations
      </h1>
      <p
        class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in-delay font-light"
      >
        Explorez mes projets, conçus avec créativité et expertise technique.
      </p>
    </header>

    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(creation, index) in creations"
          :key="creation.id"
          class="group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <a
            :href="creation.link"
            target="_blank"
            class="block h-full"
            :aria-label="`Voir le projet ${creation.title}`"
          >
            <div
              class="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 h-full card-animate"
            >
              <div class="relative overflow-hidden aspect-[16/10]">
                <img
                  :src="creation.image"
                  :alt="creation.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>
                <div
                  class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                >
                  <span
                    class="inline-flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                  >
                    <svg
                      class="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h2
                  class="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300"
                >
                  {{ creation.title }}
                </h2>
                <p
                  class="mt-3 text-gray-500 text-sm leading-relaxed line-clamp-2"
                >
                  {{ creation.description }}
                </p>
                <div
                  class="mt-4 flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  <span>Découvrir</span>
                  <svg
                    class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Fkfolio from "../assets/fkfolio.webp";
import pokemonImage from "../assets/pokemon.webp";
import spotifyImage from "../assets/spotify.webp";
import calculatriceImage from "../assets/Calculatrice.webp";
import adiImage from "../assets/AdiImage.webp";
import React_nativeImage from "../assets/react_native.webp";
import Symfony from "../assets/symfony.webp";
import PersonaUI from "../assets/PersonaUI.webp";
import GitAgent from "../assets/git-agent.webp";

const creations = ref([
  {
    id: 0,
    title: "Git Agent",
    description:
      "Assistant CLI intelligent qui génère automatiquement des messages de commit, suggère des noms de branches, et s'intègre avec Jira et GitHub.",
    image: GitAgent,
    link: "https://git-agent-steel.vercel.app/",
  },
  {
    id: 1,
    title: "PersonaUI",
    description: "Création de persona grâce à l'IA.",
    image: PersonaUI,
    link: "https://persona-ui-lyart.vercel.app/",
  },
  {
    id: 2,
    title: "Refonte ADI",
    description: "Refonte du site de la société ADI.",
    image: adiImage,
    link: "https://agencementimmo.vercel.app/",
  },
  {
    id: 3,
    title: "Fkfolio",
    description: "Création portfolio Feryel Khelifi.",
    image: Fkfolio,
    link: "https://www.fkfolio.com/",
  },
  {
    id: 4,
    title: "Calendrier Spotify",
    description: "Suivi des sorties musicales avec une interface moderne.",
    image: spotifyImage,
    link: "https://spotcalendar.vercel.app/",
  },
  {
    id: 5,
    title: "Application Vsj_natation",
    description: "Application React native + back-end Symfony.",
    image: React_nativeImage,
    link: "https://github.com/erwanmarega/Vsj_natation_app_new",
  },
  {
    id: 6,
    title: "API Pokémon",
    description: "Exploration des APIs avec un projet Pokémon interactif.",
    image: pokemonImage,
    link: "https://erwanmarega.github.io/Api_exo/",
  },
  {
    id: 7,
    title: "Calculatrice iOS",
    description: "Reproduction fidèle d'une calculatrice iOS.",
    image: calculatriceImage,
    link: "https://erwanmarega.github.io/Calculatrice_ios/",
  },
  {
    id: 8,
    title: "Symfony Vsj_natation",
    description: "L'architecture de mon application back-end Symfony.",
    image: Symfony,
    link: "https://github.com/erwanmarega/Vsj_backend",
  },
  {
    id: 9,
    title: "Test projet",
    description: "L'architecture de mon application back-end Symfony.",
    image: Symfony,
    link: "https://github.com/erwanmarega/Vsj_backend",
  },
]);
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delay {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in-delay 1.2s ease-out forwards;
}

.card-animate {
  animation: card-fade-up 0.6s ease-out forwards;
  animation-delay: inherit;
  opacity: 0;
}
</style>
