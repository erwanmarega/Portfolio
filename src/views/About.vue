<template>
  <div
    ref="el"
    class="w-full relative bg-white flex flex-col lg:flex-row min-h-screen overflow-hidden"
  >
    <div
      class="h-auto lg:h-screen lg:sticky top-0 flex flex-col items-center justify-center flex-1 text-center p-6 mb-0 mt-20 lg:mt-2"
    >
      <div ref="leftBlock" class="flex flex-col items-center space-y-6">
        <div
          class="flex flex-col items-center lg:items-center lg:flex-row lg:space-x-4"
        >
          <img
            :src="erwanImage"
            alt="Photo d'Erwan"
            class="w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover object-center shadow-lg border-2 border-white mt-3 lg:mt-0"
          />
          <h1
            class="text-3xl sm:text-4xl lg:text-[48px] xl:text-[60px] font-bold leading-tight lg:leading-[72px] text-center mt-6 lg:mt-0"
          >
            Portfolio
          </h1>
        </div>
        <p
          class="text-sm sm:text-base italic lg:text-lg mt-7 max-w-[420px] text-gray-600"
        >
          Développeur web en formation, passionné par la création de sites
          internet et la gestion de projets digitaux. Actuellement en Mastère
          Dev Manager Full Stack au sein de l'Efrei, en alternance au sein de
          Cegedim Business Services en tant que Ingénieur Développement Front.
        </p>
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4"
        >
          <a :href="CV_Marega" target="_blank" class="group flex justify-center items-center gap-4 px-4 py-2.5 bg-gray-900 border-2 border-gray-900 rounded-full cursor-pointer transition-all duration-300 hover:bg-transparent">
            <span class="text-white font-bold text-sm transition-all duration-300 group-hover:text-gray-900">Téléchargez mon CV !</span>
          </a>
          <a :href="Portfolio" target="_blank" class="group flex justify-center items-center gap-4 px-4 py-2.5 bg-gray-900 border-2 border-gray-900 rounded-full cursor-pointer transition-all duration-300 hover:bg-transparent">
            <span class="text-white font-bold text-sm transition-all duration-300 group-hover:text-gray-900">Téléchargez mon portfolio en design !</span>
          </a>
        </div>
      </div>
    </div>

    <div
      ref="rightBlock"
      class="flex-1 flex items-center justify-center relative pt-0 mb-32 lg:mb-0"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          'absolute w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[400px] xl:w-[450px] h-[150px] sm:h-[150px] md:h-[350px] lg:h-[250px] xl:h-[300px] rounded-[20px] flex flex-col justify-between p-3 shadow-lg transition-transform duration-500 ease-in-out',
          {
            away: index !== currentCardIndex,
            shake: index === currentCardIndex && isShaking,
          },
        ]"
        :style="getCardStyle(index)"
        @click="showNextCard"
      >
        <img
          :src="Clique"
          alt="Clique"
          class="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-16 lg:h-16"
        />

        <div class="text-lg sm:text-xl font-bold text-white">
          {{ card.sub }}
        </div>
        <div
          class="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold leading-tight sm:leading-[44px] text-white"
        >
          {{ card.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import gsap from "gsap";
import ErwanImage from "../assets/img_erwan.webp";
import Clique from "../assets/Clique.webp";
import CV_Marega from "../assets/CV_MAREGA_Erwan.pdf";
import Portfolio from "../assets/portfolio_MAREGA.pdf";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

const el = ref(null);
const leftBlock = ref(null);
const rightBlock = ref(null);
const erwanImage = ErwanImage;

const cards = reactive([
  {
    sub: "Certifications",
    content: "Certificat en NodeJs et SQL sur UDEMY",
    color: "rgb(64, 122, 255)",
  },
  {
    sub: "Objectifs de carrière",
    content:
      "Je veux contribuer à des projets et renforcer mes compétences backend.",
    color: "rgb(221, 62, 88)",
  },
  {
    sub: "Langues",
    content:
      "Français (natif), Anglais (courant), Espagnol (intermédiaire)",
    color: "rgb(186, 113, 245)",
  },
  {
    sub: "Hobbies",
    content: "Passionné par le dessin, le sport et les voyages.",
    color: "rgb(247, 92, 208)",
  },
]);

const currentCardIndex = ref(0);
const isShaking = ref(false);

const getCardStyle = (index) => {
  const zIndex = cards.length - index;
  const rotationAngle =
    index === currentCardIndex.value
      ? 0
      : -10 * (index - currentCardIndex.value);
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

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });

  const leftItems = leftBlock.value
    ? leftBlock.value.querySelectorAll(":scope > *, :scope > div > *")
    : [];
  gsap.set(leftBlock.value, { opacity: 0, x: -50 });
  tl.to(leftBlock.value, { opacity: 1, x: 0 });

  if (rightBlock.value) {
    const cardEls = rightBlock.value.querySelectorAll(":scope > div");
    gsap.set(cardEls, { opacity: 0, x: 50 });
    tl.to(cardEls, { opacity: 1, x: 0, stagger: 0.12 }, "-=0.4");
  }
});
</script>

