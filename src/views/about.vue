<template>
  <div class="w-full relative bg-gray-100 flex flex-col lg:flex-row  min-h-[120vh] overflow-hidden" ref="stackArea">
    <div class="flex-1 flex flex-col items-center justify-center p-4 pb-2">
      <div class="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-4">
        <h1 class="text-3xl sm:text-4xl lg:text-[48px] xl:text-[60px] font-bold leading-tight lg:leading-[88px] text-center lg:text-left">
          Portfolio
        </h1>

        <img 
          :src="erwanImage" 
          alt="Photo d'Erwan" 
          class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover object-center shadow-lg border-2 border-white mt-3 lg:mt-0"
        />
      </div>

      <p class="text-center lg:text-left text-sm sm:text-base lg:text-lg mt-2 max-w-[420px]">
        Développeur web en formation, passionné par la création de sites internet et la gestion de projets digitaux. Actuellement en BUT Métiers du Multimédia et de l'Internet, en alternance au sein de Présence Verte en tant qu’assistant communication.
      </p>

      <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
        <a 
          :href="CV_Link"
          target="_blank"
          class="button"
        >
          <span class="text">Téléchargez mon CV !</span>
        </a>

        <a 
          :href="Portfolio_Link"
          target="_blank"
          class="button"
        >
          <span class="text">Téléchargez mon portfolio en design !</span>
        </a>
      </div>
    </div>

<div class="flex-1 flex items-center justify-center relative pt-0"> 
  <div
    v-for="(card, index) in cards"
    :key="index"
    :class="[ 
      'absolute w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[400px] xl:w-[450px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] rounded-[20px] flex flex-col justify-between p-3 shadow-lg transition-transform duration-500 ease-in-out',
      { away: index !== currentCardIndex, shake: index === currentCardIndex && isShaking }
    ]"
    :style="getCardStyle(index)"
    @click="showNextCard"
  >
    <div class="text-lg sm:text-xl font-bold text-white">{{ card.sub }}</div>
    <div class="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight sm:leading-[44px] text-white">
      {{ card.content }}
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ErwanImage from "../assets/img_erwan.JPG"; 

export default {
  setup() {
    const CV_Link = "https://drive.google.com/file/d/1jbPXZD6-mMvPCqerhvApvyMFWUY1alRb/view?usp=drive_link";
    const Portfolio_Link = "https://drive.google.com/file/d/1gbwL6-WvAEey_DaKdZSM0f64DIyAMvGa/view?usp=drive_link";

    const stackArea = ref(null);
    const erwanImage = ErwanImage; 
    const cards = reactive([ 
      { sub: "Certifications", content: "Certificat en NodeJs et SQL sur UDEMY", color: "rgb(64, 122, 255)" },
      { sub: "Objectifs de carrière", content: "Je veux contribuer à des projets et renforcer mes compétences backend.", color: "rgb(221, 62, 88)" },
      { sub: "Langues", content: "Français (natif), Anglais (courant), Espagnol (intermédiaire)", color: "rgb(186, 113, 245)" },
      { sub: "Hobbies", content: "Passionné par le dessin, le sport et les voyages.", color: "rgb(247, 92, 208)" },
    ]);
    const currentCardIndex = ref(0);
    const isShaking = ref(false);

    const getCardStyle = (index) => {
  const zIndex = cards.length - index;
  const rotationAngle = index === currentCardIndex.value ? 0 : -10 * (index - currentCardIndex.value);
  const translateY = index === currentCardIndex.value ? "0" : "-150vh";  
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

    const handleShakeEffect = () => {
      isShaking.value = true;
      setTimeout(() => {
        isShaking.value = false;
      }, 500); 
    };

    onMounted(() => {
      const shakeInterval = setInterval(handleShakeEffect, 3000);

      return () => {
        clearInterval(shakeInterval);
      };
    });

    return {
      CV_Link,
      Portfolio_Link,
      erwanImage,
      stackArea,
      cards,
      currentCardIndex,
      isShaking,
      getCardStyle,
      showNextCard,
    };
  },
};
</script>

<style scoped>
.away {
  transform-origin: bottom left;
}

.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
  50% {
    transform: translateX(15px);
  }
  75% {
    transform: translateX(-15px);
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 10px;
  background-color: #181717;
  outline: 3px #181717 solid;
  outline-offset: -3px;
  border-radius: 9999px; 
  border: none;
  cursor: pointer;
  transition: 400ms;
  margin: 0;
}

.button .text {
  color: white;
  font-weight: 700;
  font-size: 0.9em;
  transition: 400ms;
}

.button:hover {
  background-color: transparent;
}

.button:hover .text {
  color: #181717;
}
</style>
