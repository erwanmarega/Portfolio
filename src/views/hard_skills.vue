<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
    <header class="mb-12 text-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 animate-fade-in">
                Compétences
      </h1>
    </header>

    <div class="w-full flex justify-center items-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
        <div
          v-for="(competence, index) in competences"
          :key="competence.title"
          class="card-container perspective-1000"
        >
          <div
            class="card relative w-72 h-[22rem] transform-style-preserve-3d transition-transform duration-700 ease-in-out"
            :class="{ 'rotate-y-180': flippedCardIndex === index }"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <div class="card-face card-front absolute w-full h-full backface-hidden rounded-xl shadow-lg bg-gradient-to-br from-white/80 to-indigo-50/50 backdrop-blur-md border border-indigo-200/50 p-4 flex flex-col justify-between animate-fade-in hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="icon bg-gradient-to-r from-indigo-600 to-purple-500 p-3 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                    <svg v-if="competence.title === 'Développement Front-End'" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l-9 4.5v12L12 22l9-4.5v-12L12 2zm-7 5.5h14v9H5v-9z"/>
                    </svg>
                    <svg v-else-if="competence.title === 'Développement Back-End'" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 00-10 10c0 4.41 2.87 8.14 6.84 9.49.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.83.56 1.67v2.48c0 .27.18.58.69.48A10 10 0 0022 12 10 10 0 0012 2z"/>
                    </svg>
                    <svg v-else class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-2-2H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7v-2h10v2z"/>
                    </svg>
                  </div>
                  <h2 class="text-lg font-semibold text-gray-800 uppercase truncate">{{ competence.title }}</h2>
                </div>
                <div v-if="competence.title === 'Développement Front-End'" class="grid grid-cols-3 gap-3">
                  <img src="@/assets/Front-end/html5.svg" alt="HTML" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Front-end/css_old.svg" alt="CSS" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Front-end/javascript.svg" alt="JavaScript" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Front-end/vue.svg" alt="Vue.js" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Front-end/React_wordmark_light.svg" alt="React" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Front-end/tailwindcss.svg" alt="Tailwind CSS" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Front-end/typescript.svg" alt="Bootstrap" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                </div>
                <div v-else-if="competence.title === 'Développement Back-End'" class="grid grid-cols-3 gap-3">
                  <img src="@/assets/Back-end/docker.svg" alt="Docker" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Back-end/mysql.svg" alt="MySQL" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Back-end/nodejs.svg" alt="Node.js" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Back-end/php.svg" alt="PHP" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Back-end/symfony.png" alt="Symfony" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                </div>
                <div v-else-if="competence.title === 'Outils et Méthodologies'" class="grid grid-cols-3 gap-3">
                  <img src="@/assets/Gestion de projet/agile.png" alt="Agile" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Gestion de projet/git.svg" alt="Git" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Gestion de projet/github-light.svg" alt="Github" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Gestion de projet/gitlab.svg" alt="Gitlab" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                  <img src="@/assets/Gestion de projet/kanban.png" alt="Kanban" class="w-8 h-8 object-contain transition-transform duration-300 hover:scale-125" />
                </div>
              </div>
              <div class="flex justify-center">
                <button
                  class="mt-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-500 rounded-lg hover:from-indigo-700 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md hover:shadow-lg"
                  @click="flipCard(index)"
                  :aria-label="`Voir les détails de ${competence.title}`"
                >
                  Lire Plus
                </button>
              </div>
            </div>
            <div class="card-face card-back absolute w-full h-full backface-hidden rounded-xl shadow-lg bg-gradient-to-br from-indigo-600 to-purple-500 text-white p-4 transform rotate-y-180 border border-indigo-600 flex flex-col justify-between">
              <div>
                <h3 class="text-lg font-semibold mb-3 text-white">Détails</h3>
                <ul class="list-disc pl-5 space-y-2 text-sm">
                  <li v-for="(detail, idx) in competence.description" :key="idx">
                    {{ detail }}
                  </li>
                </ul>
              </div>
              <div class="flex justify-center">
                <button
                  class="mt-2 px-4 py-2 text-sm font-bold text-indigo-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-lg"
                  @click="flipCard(-1)"
                  aria-label="Retourner la carte"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const flippedCardIndex = ref(-1);

const competences = ref([
  {
    title: "Développement Front-End",
    description: [
      "Sites statiques en HTML & CSS",
      "Apps dynamiques avec JavaScript",
      "Frameworks comme Vue.js et React",
      "Interfaces responsives",
    ],
  },
  {
    title: "Développement Back-End",
    description: [
      "Serveurs Node.js et Express",
      "Bases de données SQL/NoSQL",
      "API RESTful",
    ],
  },
  {
    title: "Outils et Méthodologies",
    description: [
      "Git et GitHub",
      "Agile (Scrum, Kanban)",
      "CI/CD avec GitLab",
    ],
  },
]);

const flipCard = (index) => {
  flippedCardIndex.value = flippedCardIndex.value === index ? -1 : index;
};
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

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.perspective-1000 {
  perspective: 1000px;
}

.card {
  transform-style: preserve-3d;
  position: relative;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.card-face {
  transition: transform 0.7s ease-in-out;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.card-container {
  width: 288px;
  height: 352px;
}

@media (max-width: 640px) {
  .card-container {
    width: 280px;
    height: 340px;
  }
}
</style>