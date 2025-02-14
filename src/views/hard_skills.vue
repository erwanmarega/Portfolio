<template>
  <div class="bg-gray-100 text-black p-6 flex flex-col items-center">
    <div class="sticky top-0 z-10 flex flex-col items-center justify-center text-center p-4 mb-8">
      <h2 class="text-5xl sm:text-5xl lg:text-[64px] xl:text-[49px] font-bold leading-tight lg:leading-[88px] text-gray-800">
        Compétences
      </h2>
    </div>

    <div class="w-full flex justify-center items-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(competence, index) in competences"
          :key="competence.title"
          class="card-container perspective-1000"
        >
          <div
            class="card relative w-80 h-96 transform-style-preserve-3d transition-transform duration-700"
            :class="{ 'rotate-y-180': flippedCardIndex === index }"
          >
            <div class="card-face card-front absolute w-full h-full backface-hidden rounded-xl shadow-xl bg-white p-6 border border-gray-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <div class="icon bg-indigo-600 p-2 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 108 8 8 8 0 00-8-8zm1 11H9v-2h2zm0-4H9V5h2z"/>
                    </svg>
                  </div>
                  <div class="text-xl font-bold text-gray-700 uppercase">
                    {{ competence.title }}
                  </div>
                </div>
                <div v-if="competence.title === 'Développement Front-End'" class="grid grid-cols-3 gap-4">
                  <img src="@/assets/Front-end/html5.svg" alt="HTML" class="w-10 h-10" />
                  <img src="@/assets/Front-end/css_old.svg" alt="CSS" class="w-10 h-10" />
                  <img src="@/assets/Front-end/javascript.svg" alt="JavaScript" class="w-10 h-10" />
                  <img src="@/assets/Front-end/vue.svg" alt="Vue.js" class="w-10 h-10" />
                  <img src="@/assets/Front-end/React_wordmark_light.svg" alt="React" class="w-10 h-10" />
                  <img src="@/assets/Front-end/tailwindcss.svg" alt="Tailwind CSS" class="w-10 h-10" />
                </div>
                <div v-else-if="competence.title === 'Développement Back-End'" class="grid grid-cols-2 gap-4 mt-4">
                  <img src="@/assets/Back-end/docker.svg" alt="Docker" class="w-10 h-10" />
                  <img src="@/assets/Back-end/mysql.svg" alt="MySQL" class="w-10 h-10" />
                  <img src="@/assets/Back-end/nodejs.svg" alt="Node.js" class="w-10 h-10" />
                  <img src="@/assets/Back-end/php.svg" alt="PHP" class="w-10 h-10" />
                  <img src="@/assets/Back-end/symfony.png" alt="Symfony" class="w-10 h-10" />
                </div>
                <div v-else-if="competence.title === 'Outils et Méthodologies'" class="grid grid-cols-2 gap-4 mt-4">
                  <img src="@/assets/Gestion de projet/agile.png" alt="Agile" class="w-10 h-10" />
                  <img src="@/assets/Gestion de projet/git.svg" alt="Git" class="w-10 h-10" />
                  <img src="@/assets/Gestion de projet/github-light.svg" alt="Github" class="w-10 h-10" />
                  <img src="@/assets/Gestion de projet/gitlab.svg" alt="Gitlab" class="w-10 h-10" />
                  <img src="@/assets/Gestion de projet/kanban.png" alt="Kanban" class="w-10 h-10" />
                </div>
              </div>
              <div class="flex justify-center">
                <button
                  class="mt-4 px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition duration-300"
                  @click="flipCard(index)"
                >
                  Lire Plus
                </button>
              </div>
            </div>

            <div class="card-face card-back absolute w-full h-full backface-hidden rounded-xl shadow-xl bg-indigo-600 text-white p-6 transform rotate-y-180 border border-indigo-600 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-bold mb-3">Détails</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(detail, idx) in competence.description" :key="idx" class="text-sm">
                    {{ detail }}
                  </li>
                </ul>
              </div>
              <div class="flex justify-center">
                <button
                  class="mt-4 px-4 py-2 text-sm font-bold text-indigo-600 bg-white rounded hover:bg-gray-100 transition duration-300"
                  @click="flipCard(-1)"
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

<script>
export default {
  data() {
    return {
      flippedCardIndex: -1,
      competences: [
        {
          title: "Développement Front-End",
          description: [
            "Création de sites statiques en HTML & CSS",
            "Développement dynamique avec JavaScript",
            "Maîtrise de frameworks front-end comme Vue.js et React",
            "Création d’interfaces responsives",
          ],
        },
        {
          title: "Développement Back-End",
          description: [
            "Création de serveurs avec Node.js et Express",
            "Gestion de bases de données relationnelles et non relationnelles",
            "Mise en place d’API RESTful",
          ],
        },
        {
          title: "Outils et Méthodologies",
          description: [
            "Utilisation de Git et GitHub",
            "Méthodologies agiles (Scrum, Kanban)",
            "Déploiement continu avec GitLab CI/CD",
          ],
        },
      ],
    };
  },
  methods: {
    flipCard(index) {
      this.flippedCardIndex = this.flippedCardIndex === index ? -1 : index;
    },
  },
};
</script>

<style scoped>
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
  transition: transform 0.6s ease-in-out;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.card-container {
  width: 320px;
  height: 420px;
}

@media (max-width: 768px) {
  .card-container {
    width: 280px;
    height: 380px;
  }
}
</style>