<template>
  <div
    ref="el"
    class="w-full min-h-screen pt-28 sm:pt-40 pb-12"
  >
    <div class="lane-grid lg:gap-y-8">
      <header
        ref="header"
        class="lane-full flex items-start justify-between gap-4"
      >
        <div
          class="flex items-center gap-4 sm:gap-5 lg:flex-col lg:items-start lg:max-w-[calc((100%-var(--tower-lane))/2-1.5rem)]"
        >
          <img
            :src="erwanImage"
            alt="Erwan Marega"
            class="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full object-cover object-center shadow-[0_2px_8px_rgba(10,10,10,0.1)] shrink-0"
          />
          <div>
            <AsciiDecodeText
              tag="h1"
              data-tower-anchor="about"
              text="Erwan Marega"
              idle-glitch
              :start="showName"
              :duration="2.5"
              class="block text-4xl sm:text-6xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-ink"
            />
            <p class="text-base sm:text-xl lg:text-lg text-ink-soft mt-1">
              Je code des apps web. J'aime apprendre et m'intéresser à tous les
              sujets.
            </p>
          </div>
        </div>
        <a
          :href="CV_Marega"
          target="_blank"
          class="hidden sm:inline-flex items-center gap-2 bg-ink text-page text-base font-semibold rounded-full px-6 py-3 transition-all hover:bg-ink/90 hover:shadow-md shrink-0"
        >
          <font-awesome-icon :icon="['fas', 'file-arrow-down']" />
          Mon CV
        </a>
      </header>

      <div
        ref="grid"
        class="lane-left lg:row-start-2 flex flex-col gap-4 sm:gap-5 lg:pr-6"
      >
        <a
          href="#projects"
          class="bento-card group block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] relative h-64 lg:h-[300px]"
          aria-label="Voir mes projets"
        >
          <AsciiEffect effect="torus" class="absolute inset-0" />
        </a>
        <a
          :href="CV_Marega"
          target="_blank"
          class="bento-card group flex flex-col rounded-3xl bg-surface-strong shadow-[0_2px_16px_rgba(10,10,10,0.08)] p-5 min-h-[200px]"
        >
          <div
            class="flex items-center gap-2 text-ink-soft text-sm font-medium mb-3"
          >
            <font-awesome-icon :icon="['fas', 'bookmark']" class="text-brand" />
            Mastère
          </div>
          <h3 class="font-bold text-ink text-lg leading-snug mb-2">
            Dev Manager Full Stack @ Efrei
          </h3>
          <p class="text-ink-soft leading-relaxed text-sm">
            Développeur web en formation, passionné par la création de sites
            internet et la gestion de projets digitaux. En Mastère Dev Manager
            Full Stack à l'Efrei, je suis actuellement en alternance pendant 2
            ans en tant qu'Ingénieur Développement de septembre 2025 à juillet
            2027.
          </p>
          <div
            class="flex items-center gap-1.5 text-ink-soft text-sm font-medium mt-auto pt-4"
          >
            <span>Lire plus</span>
            <font-awesome-icon
              :icon="['fas', 'arrow-up-right-from-square']"
              class="text-xs transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </a>
        <a
          href="#projects"
          class="bento-card group block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:flex-1 lg:h-auto lg:min-h-[200px]"
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

      <div
        class="lane-right lg:row-start-2 flex flex-col gap-4 sm:gap-5 lg:pl-6"
      >
        <a
          href="#projects"
          class="bento-card group block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:h-[300px]"
        >
          <img
            :src="ImgCity"
            alt="Voyage urbain"
            class="bento-img"
            loading="lazy"
            decoding="async"
          />
        </a>
        <a
          href="#projects"
          class="bento-card group block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:flex-1 lg:h-auto lg:min-h-[200px]"
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
          href="#projects"
          class="bento-card group block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:flex-1 lg:h-auto lg:min-h-[200px]"
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
import ImgErwan from "../assets/images/profile.webp";
import ImgBoat from "../assets/images/about/boat.webp";
import ImgCity from "../assets/images/about/city.webp";
import ImgBeach from "../assets/images/about/beach.webp";
import ImgRome from "../assets/images/about/rome.webp";
import CV_Marega from "../assets/docs/cv-erwan-marega.pdf";
import AsciiEffect from "../components/AsciiEffect.vue";
import AsciiDecodeText from "../components/AsciiDecodeText.vue";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

library.add(faFileArrowDown, faArrowUpRightFromSquare, faBookmark);

const el = ref(null);
const header = ref(null);
const grid = ref(null);
const erwanImage = ImgErwan;

const showName = ref(false);

useEnterAnimation(el, () => {
  showName.value = true;
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
