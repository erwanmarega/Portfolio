<template>
  <div class="w-full relative bg-gray-100 flex flex-col lg:flex-row" ref="techWatchArea">
    <div class="h-auto lg:h-screen lg:sticky top-0 flex flex-col items-center justify-center flex-1 text-center p-6 mb-0 mt-20 lg:mt-32">
      <div class="flex flex-col items-center space-y-6">
        <h1 class="text-4xl sm:text-5xl lg:text-[64px] xl:text-[84px] font-bold leading-tight lg:leading-[88px]">
          Veille Technologique
        </h1>
        <p class="text-sm sm:text-base lg:text-lg mt-7 max-w-[420px]">
          Restons à jour avec les dernières tendances, outils et ressources en développement web et technologies modernes.
        </p>
      </div>
    </div>

    <div class="h-auto lg:h-screen flex items-center justify-center flex-1 p-6 mb-0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in techList"
          :key="index"
          class="tech-card p-6 rounded-[25px] shadow-lg flex flex-col justify-between bg-white hover:shadow-2xl transition-transform duration-300 ease-in-out"
          :style="{ backgroundColor: item.color }"
          @mouseover="setFocusCard(index)"
          @mouseleave="resetFocusCard"
        >
          <div>
            <h3 class="text-lg sm:text-xl font-bold text-white">{{ item.title }}</h3>
            <p class="mt-2 text-white">{{ item.description }}</p>
          </div>
          <a
            :href="item.link"
            target="_blank"
            class="mt-4 text-sm font-semibold text-white underline hover:text-gray-200"
          >
            En savoir plus →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const techList = ref([
      {
        title: "Node.js",
        description: "Un environnement JavaScript pour exécuter du code côté serveur.",
        link: "https://nodejs.org",
        color: "#68A063",
      },
      {
        title: "Express.js",
        description: "Un framework minimaliste pour créer des API et des applications web.",
        link: "https://expressjs.com",
        color: "#000000",
      },
      {
        title: "React",
        description: "Une bibliothèque JavaScript pour construire des interfaces utilisateur.",
        link: "https://reactjs.org",
        color: "#61DAFB",
      },
      {
        title: "Vue.js 3",
        description: "Un framework progressif pour construire des interfaces utilisateur.",
        link: "https://vuejs.org",
        color: "#42B883",
      },
      {
        title: "Tailwind CSS",
        description: "Un framework CSS utilitaire pour créer des designs modernes.",
        link: "https://tailwindcss.com",
        color: "#06B6D4",
      },
      {
        title: "Docker",
        description: "Outil de conteneurisation pour développer et déployer des applications.",
        link: "https://docker.com",
        color: "#2496ED",
      },
    ]);

    const setFocusCard = (index) => {
      const cards = document.querySelectorAll('.tech-card');
      cards.forEach((card, idx) => {
        if (idx !== index) {
          card.classList.add('blur');
        }
      });
    };

    const resetFocusCard = () => {
      const cards = document.querySelectorAll('.tech-card');
      cards.forEach((card) => {
        card.classList.remove('blur');
      });
    };

    return {
      techList,
      setFocusCard,
      resetFocusCard
    };
  },
};
</script>

<style scoped>
.blur {
  filter: blur(5px);
}

.tech-card {
  transition: filter 0.3s ease;
}

.tech-card {
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.tech-card:hover {
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
}

a {
  text-decoration: underline;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 15px;
  background-color: #181717;
  outline: 3px #181717 solid;
  outline-offset: -3px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: 400ms;
}

button:hover {
  background-color: transparent;
}

button:hover .text {
  color: #181717;
}

</style>
