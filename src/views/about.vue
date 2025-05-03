<template>
  <div class="w-full relative bg-gray-100 flex flex-col lg:flex-row min-h-screen overflow-hidden" ref="stackArea">
    <div class="h-auto lg:h-screen lg:sticky top-0 flex flex-col items-center justify-center flex-1 text-center p-6 mb-0 mt-20 lg:mt-2">
      <div class="flex flex-col items-center space-y-6">
        <div class="flex flex-col items-center lg:items-center lg:flex-row lg:space-x-4">
          <img 
            :src="erwanImage" 
            alt="Photo d'Erwan" 
            class="w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover object-center shadow-lg border-2 border-white mt-3 lg:mt-0"
          />
          <h1 class="text-3xl sm:text-4xl lg:text-[48px] xl:text-[60px] font-bold leading-tight lg:leading-[72px] text-center mt-6 lg:mt-0">
            Portfolio
          </h1>
        </div>
        <p class="text-sm sm:text-base italic lg:text-lg mt-7 max-w-[420px] text-gray-600">
          Développeur web en formation, passionné par la création de sites internet et la gestion de projets digitaux. Actuellement en BUT Métiers du Multimédia et de l'Internet, en alternance au sein de Présence Verte en tant qu’assistant communication.
        </p>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <a 
            :href="CV_Marega"
            target="_blank"
            class="button"
          >
            <span class="text">Téléchargez mon CV !</span>
          </a>
          <a 
            :href="Portfolio"
            target="_blank"
            class="button"
          >
            <span class="text">Téléchargez mon portfolio en design !</span>
          </a>
        </div>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center relative pt-0 mb-32 lg:mb-0">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[ 
          'absolute w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[400px] xl:w-[450px] h-[150px] sm:h-[150px] md:h-[350px] lg:h-[250px] xl:h-[300px] rounded-[20px] flex flex-col justify-between p-3 shadow-lg transition-transform duration-500 ease-in-out',
          { away: index !== currentCardIndex, shake: index === currentCardIndex && isShaking },
        ]"
        :style="getCardStyle(index)"
        @click="showNextCard"
      >
        <img 
          :src="Clique" 
          alt="Clique" 
          class="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-16 lg:h-16" 
        />

        <div class="text-lg sm:text-xl font-bold text-white">{{ card.sub }}</div>
        <div class="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight sm:leading-[44px] text-white">
          {{ card.content }}
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { ref, reactive } from "vue";
import ErwanImage from "../assets/img_erwan.webp"; 
import Clique from "../assets/Clique.webp";
import CV_Marega from "../assets/CV_MAREGA_Erwan.pdf"
import Portfolio from "../assets/portfolio_MAREGA.pdf"

export default {
  setup() {
    const stackArea = ref(null);
    const erwanImage = ErwanImage; 
    const cards = reactive([ 
      { sub: "Certifications", content: "Certificat en NodeJs et SQL sur UDEMY", color: "rgb(64, 122, 255)" },
      { sub: "Objectifs de carrière", content: "Je veux contribuer à des projets et renforcer mes compétences backend.", color: "rgb(221, 62, 88)" },
      { sub: "Langues", content: "Français (natif), Anglais (courant), Espagnol (intermédiaire)", color: "rgb(186, 113, 245)" },
      { sub: "Hobbies", content: "Passionné par le dessin, le sport et les voyages.", color: "rgb(247, 92, 208)" },
    ]);
    const currentCardIndex = ref(0);

    const getCardStyle = (index) => {
      const zIndex = cards.length - index;
      const rotationAngle = index === currentCardIndex.value ? 0 : -10 * (index - currentCardIndex.value);
      const translateY = index === currentCardIndex.value ? "0" : "-120vh";
      const transform = `translateY(${translateY}) rotate(${rotationAngle}deg)`;
      const backgroundColor = cards[index].color;
      return {
        zIndex,
        transform,
        backgroundColor,
        transition: "0.5s ease-in-out",
      };
    };

    const showNextCard = () => {
      currentCardIndex.value = (currentCardIndex.value + 1) % cards.length;
    };

   
    return {
      erwanImage,
      stackArea,
      cards,
      currentCardIndex,
      getCardStyle,
      showNextCard,
      Clique,
      CV_Marega,
      Portfolio,
    };
  },
};
</script>

<style scoped>

.button {
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

.button .text {
  color: white;
  font-weight: 700;
  font-size: 1em;
  transition: 400ms;
}

.button:hover {
  background-color: transparent;
}

.button:hover .text {
  color: #181717;
}

@media (max-width: 1024px) {
  .w-full {
    margin-top: -60px;
  }

  .text-center {
    margin-top: 1rem;
    font-size: 1rem;
  }

  .button {
    margin-top: 1rem;
    font-size: 1rem;
    padding: 10px 15px;
  }

  .w-32 {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .w-full {
    margin-top: -50px;
  }

  .text-center {
    font-size: 1rem;
  }

  .button {
    font-size: 1rem;
    padding: 10px 15px;
  }
}

@media (max-width: 480px) {
  .text-center {
    font-size: 0.875rem;
  }

  .button {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  .w-32 {
    width: 90px;
    height: 90px;
  }

  .w-24 {
    width: 70px;
    height: 70px;
  }
}
</style>
