<template>
  <div
    ref="el"
    class="w-full min-h-screen bg-white pt-28 sm:pt-40 pb-12 px-4 sm:px-8 lg:px-14"
  >
    <div class="max-w-6xl mx-auto">
      <header ref="header" class="flex items-start justify-between gap-4 mb-10">
        <div class="flex items-center gap-4 sm:gap-5">
          <img
            :src="erwanImage"
            alt="Erwan Marega"
            class="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full object-cover object-center shadow-sm"
          />
          <div>
            <h1
              class="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900"
            >
              Erwan Marega
            </h1>
            <p class="text-base sm:text-xl text-gray-500 mt-1">
              Je code des apps web. J'aime apprendre et m'intéresser à tous les
              sujets.
            </p>
          </div>
        </div>
        <a
          :href="CV_Marega"
          target="_blank"
          class="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white text-base font-semibold rounded-full px-6 py-3 transition-all hover:bg-black hover:shadow-md shrink-0"
        >
          <font-awesome-icon :icon="['fas', 'file-arrow-down']" />
          Mon CV
        </a>
      </header>

      <div
        ref="grid"
        class="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr_1fr] gap-4 sm:gap-5 lg:auto-rows-auto"
      >
        <div class="flex flex-col gap-4 sm:gap-5">
          <a
            href="#créations"
            class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] h-64 lg:h-[360px]"
          >
          </a>
          <a
            href="#créations"
            class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] flex-1"
          >
            <img
              :src="ImgBoat"
              alt="Voyage"
              class="bento-img"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>

        <div class="flex flex-col gap-4 sm:gap-5">
          <a
            href="#créations"
            class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] h-64 lg:h-[360px]"
          >
            <img
              :src="ImgCity"
              alt="Voyage urbain"
              class="bento-img"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
            <a
              href="#créations"
              class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] min-h-[200px]"
            >
              <img
                :src="ImgBeach"
                alt="Plage"
                class="bento-img"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              :href="CV_Marega"
              target="_blank"
              class="bento-card group flex flex-col rounded-3xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-5 min-h-[200px]"
            >
              <div
                class="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3"
              >
                <font-awesome-icon
                  :icon="['fas', 'bookmark']"
                  class="text-orange-500"
                />
                Mastère
              </div>
              <h3 class="font-bold text-gray-900 text-lg leading-snug mb-2">
                Dev Manager Full Stack @ Efrei
              </h3>
              <p class="text-gray-500 leading-relaxed text-sm">
                Développeur web en formation, passionné par la création de sites
                internet et la gestion de projets digitaux. En Mastère Dev
                Manager Full Stack à l'Efrei, je suis actuellement en alternance
                pendant 2 ans en tant qu'Ingénieur Développement de septembre
                2025 à juillet 2027.
              </p>
              <div
                class="flex items-center gap-1.5 text-gray-700 text-sm font-medium mt-auto pt-4"
              >
                <span>Lire plus</span>
                <font-awesome-icon
                  :icon="['fas', 'arrow-up-right-from-square']"
                  class="text-xs transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </a>
          </div>
        </div>

        <a
          href="#créations"
          class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] h-64 lg:h-auto"
        >
          <img
            :src="ImgRome"
            alt="Rome"
            class="bento-img"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileArrowDown,
  faArrowUpRightFromSquare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import ImgErwan from "../assets/img-erwan.webp";
import ImgBoat from "../assets/about-boat.webp";
import ImgCity from "../assets/about-city.webp";
import ImgBeach from "../assets/about-beach.webp";
import ImgRome from "../assets/about-rome.webp";
import CV_Marega from "../assets/CV_Marega.pdf";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

library.add(faFileArrowDown, faArrowUpRightFromSquare, faBookmark);

const el = ref(null);
const header = ref(null);
const grid = ref(null);
const erwanImage = ImgErwan;

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  gsap.set(header.value, { opacity: 0, y: 30 });
  tl.to(header.value, { opacity: 1, y: 0, duration: 0.7 });

  const cards = el.value ? el.value.querySelectorAll(".bento-card") : [];
  gsap.set(cards, { willChange: "transform, opacity" });

  tl.from(
    cards,
    {
      y: () => gsap.utils.random(80, 160),
      x: () => gsap.utils.random(-60, 60),
      rotation: () => gsap.utils.random(-12, 12),
      scale: 0.85,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      onComplete: () => {
        cards.forEach((card) => {
          card.style.willChange = "auto";
        });
      },
    },
    "-=0.3"
  );
});
</script>

<style scoped>
.bento-img {
  @apply w-full h-full object-cover transition-transform duration-700 ease-out;
}

.bento-card:hover .bento-img {
  @apply scale-105;
}
</style>
