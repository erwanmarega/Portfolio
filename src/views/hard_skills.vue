<template>
  <div class="bg-gray-100 text-black p-4 flex flex-col justify-center items-center mb-0">
    <div class="min-h-[10vh] lg:sticky top-0 flex flex-col items-center justify-center text-center p-4 pb-4 mb-0">
      <div class="flex flex-col items-center space-y-4">
        <h1 class="text-4xl sm:text-5xl lg:text-[64px] xl:text-[84px] font-bold leading-tight lg:leading-[88px]">
          Compétences
        </h1>
      </div>
    </div>

    <div class="w-full flex justify-center items-center min-h-[70vh] mb-0">
      <div class="flex flex-wrap justify-center gap-8">
        <div
          v-for="(competence, index) in competences"
          :key="competence.title"
          class="card-container"
          :class="{ flipped: flippedCardIndex === index }"
        >
          <div class="card-front brutalist-card">
            <div class="brutalist-card__header">
              <div class="brutalist-card__icon"></div>
              <div class="brutalist-card__alert">{{ competence.title }}</div>
            </div>
            <div v-if="competence.title === 'Développement Front-End'" class="grid grid-cols-2 gap-4 mt-4">
              <img src="@/assets/Front-end/html.png" alt="HTML" class="w-12 h-12">
              <img src="@/assets/Front-end/css.png" alt="CSS" class="w-12 h-12">
              <img src="@/assets/Front-end/javascript.png" alt="JavaScript" class="w-12 h-12">
              <img src="@/assets/Front-end/vue.png" alt="Vue.js" class="w-12 ">
              <img src="@/assets/Front-end/react.png" alt="React" class="w-12 ">
              <img src="@/assets/Front-end/tailwind.webp" alt="Tailwind CSS" class="w-16">
            </div>
            <div v-if="competence.title === 'Développement Back-End'" class="grid grid-cols-2 gap-4 mt-4">
              <img src="@/assets/Back-end/docker.png" alt="Docker" class="w-12 ">
              <img src="@/assets/Back-end/mysql.png" alt="MySQL" class="w-12 h-12">
              <img src="@/assets/Back-end/Node.png" alt="Node.js" class="w-12 ">
              <img src="@/assets/Back-end/php.png" alt="PHP" class="w-12 h-12">
              <img src="@/assets/Back-end/symfony.png" alt="Symfony" class="w-12 h-12">
            </div>
            <div v-if="competence.title === 'Outils et Méthodologies'" class="grid grid-cols-2 gap-4 mt-4">
              <img src="@/assets/Gestion de projet/agile.png" alt="Agile" class="w-12 h-12">
              <img src="@/assets/Gestion de projet/git.png" alt="Git" class="w-12 h-12">
              <img src="@/assets/Gestion de projet/Github.png" alt="Github" class="w-12">
              <img src="@/assets/Gestion de projet/Gitlab.png" alt="Gitlab" class="w-12 ">
              <img src="@/assets/Gestion de projet/kanban.png" alt="Kanban" class="w-12 h-12">
            </div>
            <div class="brutalist-card__actions">
              <button
                class="brutalist-card__button brutalist-card__button--mark"
                @click="flipCard(index)"
              >
                Lire Plus
              </button>
            </div>
          </div>

          <div class="card-back brutalist-card">
            <div class="brutalist-card__header">
              <div class="brutalist-card__alert">Détails</div>
            </div>
            <div class="brutalist-card__message">
              <ul class="list-disc pl-5">
                <li v-for="(detail, idx) in competence.description" :key="idx">
                  {{ detail }}
                </li>
              </ul>
            </div>
            <div class="brutalist-card__actions">
              <button
                class="brutalist-card__button brutalist-card__button--read"
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
.card-container {
  perspective: 1000px;
  width: 320px;
  height: 420px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.6s ease-in-out;
  border-radius: 12px;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

.card-container.flipped .card-front {
  transform: rotateY(-180deg);
}

.card-container.flipped .card-back {
  transform: rotateY(0deg);
}

.brutalist-card {
  border: 2px solid #333;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
}

.brutalist-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.brutalist-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  padding: 0.5rem;
  border-radius: 50%;
}

.brutalist-card__icon svg {
  height: 1.5rem;
  width: 1.5rem;
  fill: #fff;
}

.brutalist-card__alert {
  font-weight: 700;
  color: #333;
  font-size: 1.3rem;
  text-transform: uppercase;
}

.brutalist-card__message {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
}

.brutalist-card__actions {
  margin-top: 1rem;
}

.brutalist-card__button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid #333;
  background-color: #333;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.brutalist-card__button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}
</style>
