<template>
  <div ref="el" class="w-full min-h-screen bg-white pt-28 sm:pt-40 pb-12 px-4 sm:px-8 lg:px-14">
    <div class="max-w-6xl mx-auto">
      <header ref="header" class="flex items-start justify-between gap-4 mb-10">
        <div class="flex items-center gap-4 sm:gap-5">
          <img
            :src="erwanImage"
            alt="Erwan Marega"
            class="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full object-cover object-center shadow-sm"
          />
          <div>
            <h1 class="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Erwan Marega
            </h1>
            <p class="text-base sm:text-xl text-gray-500 mt-1">
              Je code des apps web. Je dessine quand je m'ennuie.
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
          <a href="#créations" class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] h-64 lg:h-[360px]">
            <img :src="ph.hiker" alt="Randonnée" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </a>
          <a
            :href="Portfolio"
            target="_blank"
            class="bento-card group flex-1 flex flex-col rounded-3xl overflow-hidden bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-3"
          >
            <img :src="ph.boat" alt="Voyage" class="w-full h-32 object-cover rounded-2xl" />
            <h3 class="font-bold text-gray-900 text-lg mt-4 px-1">Gap year : Indonésie '25</h3>
            <div class="flex items-center gap-1.5 text-gray-400 text-sm mt-auto pt-4 px-1">
              <span>ewmdev.com</span>
              <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-xs transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        </div>

        <div class="flex flex-col gap-4 sm:gap-5">
          <a href="#créations" class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] h-64 lg:h-[360px]">
            <img :src="ph.dog" alt="Chien" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </a>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
            <a href="#créations" class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] min-h-[200px]">
              <img :src="ph.smoothie" alt="Smoothie" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </a>
            <a :href="CV_Marega" target="_blank" class="bento-card group flex flex-col rounded-3xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-5 min-h-[200px]">
              <div class="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                <font-awesome-icon :icon="['fas', 'bookmark']" class="text-orange-500" />
                Mastère
              </div>
              <h3 class="font-bold text-gray-900 text-lg leading-snug mb-2">Dev Manager Full Stack @ Efrei ?</h3>
              <p class="text-gray-500 leading-relaxed text-sm line-clamp-3">
                En alternance chez Cegedim Business Services comme Ingénieur Développement Front…
              </p>
              <div class="flex items-center gap-1.5 text-gray-700 text-sm font-medium mt-auto pt-4">
                <span>Lire plus</span>
                <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="text-xs transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>
        </div>

        <a href="#créations" class="bento-card group block rounded-3xl overflow-hidden bg-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] h-64 lg:h-auto">
          <img :src="ph.friends" alt="Amis" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileArrowDown, faArrowUpRightFromSquare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import ImgErwan from "../assets/img-erwan.webp";
import CV_Marega from "../assets/cv-marega-erwan.pdf";
import Portfolio from "../assets/portfolio-marega.pdf";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

library.add(faFileArrowDown, faArrowUpRightFromSquare, faBookmark);

const u = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const ph = {
  hiker: u("1551632811-561732d1e306"),
  boat: u("1544551763-46a013bb70d5", 600),
  dog: u("1633722715463-d30f4f325e24", 1000),
  smoothie: u("1638176066666-ffb2f013c7dd", 600),
  friends: u("1529626455594-4ff0802cfb7e", 700),
};

const el = ref(null);
const header = ref(null);
const grid = ref(null);
const erwanImage = ImgErwan;

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  gsap.set(header.value, { opacity: 0, y: 30 });
  tl.to(header.value, { opacity: 1, y: 0, duration: 0.7 });

  const cards = el.value ? el.value.querySelectorAll(".bento-card") : [];
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tx = gsap.utils.random(-1, 1) * (window.innerWidth * 0.6);
    const ty = gsap.utils.random(-1, 1) * (window.innerHeight * 0.6);
    gsap.set(card, {
      x: tx - (cx - window.innerWidth / 2) * 0.2,
      y: ty,
      rotation: gsap.utils.random(-35, 35),
      scale: 0.4,
      opacity: 0,
    });
  });
  tl.to(cards, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration: 1.1,
    stagger: 0.1,
    ease: "power4.out",
  }, "-=0.3");
});
</script>
