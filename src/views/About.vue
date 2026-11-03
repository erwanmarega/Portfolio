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
          <div class="relative shrink-0">
            <img
              :src="erwanImage"
              alt="Erwan Marega"
              class="about-avatar w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full object-cover object-center shadow-[0_2px_8px_rgba(10,10,10,0.1)]"
            />
            <span
              class="about-ring absolute inset-0 rounded-full border border-brand-text opacity-0 pointer-events-none"
              aria-hidden="true"
            />
          </div>
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
            <p class="about-sub text-base sm:text-xl lg:text-lg text-ink-soft mt-1">
              Je code des apps web. J'aime apprendre et m'intéresser à tous les
              sujets.
            </p>
          </div>
        </div>
        <a
          :href="CV_Marega"
          target="_blank"
          class="about-cv hidden sm:inline-flex items-center gap-2 bg-ink text-page text-base font-semibold rounded-full px-6 py-3 transition-all hover:bg-ink/90 hover:shadow-md shrink-0"
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
          class="bento-card group relative flex flex-col rounded-3xl bg-surface-strong shadow-[0_2px_16px_rgba(10,10,10,0.08)] p-5 min-h-[200px]"
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
          class="bento-card group relative block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:flex-1 lg:h-auto lg:min-h-[200px]"
        >
          <div class="bento-par">
            <img
              :src="ImgBoat"
              alt="Voyage"
              class="bento-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </a>
      </div>

      <div
        class="lane-right lg:row-start-2 flex flex-col gap-4 sm:gap-5 lg:pl-6"
      >
        <a
          href="#projects"
          class="bento-card group relative block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:h-[300px]"
        >
          <div class="bento-par">
            <img
              :src="ImgCity"
              alt="Voyage urbain"
              class="bento-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </a>
        <a
          href="#projects"
          class="bento-card group relative block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:flex-1 lg:h-auto lg:min-h-[200px]"
        >
          <div class="bento-par">
            <img
              :src="ImgBeach"
              alt="Plage"
              class="bento-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </a>
        <a
          href="#projects"
          class="bento-card group relative block rounded-3xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(10,10,10,0.08)] h-64 lg:flex-1 lg:h-auto lg:min-h-[200px]"
        >
          <div class="bento-par">
            <img
              :src="ImgRome"
              alt="Rome"
              class="bento-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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
import { gsap, prefersReducedMotion } from "../lib/motion.js";

library.add(faFileArrowDown, faArrowUpRightFromSquare, faBookmark);

const el = ref(null);
const header = ref(null);
const grid = ref(null);
const erwanImage = ImgErwan;

const showName = ref(false);

// One gsap.context scoped to the root: reverts every tween + ScrollTrigger on unmount.
let ctx = null;
const getCtx = () => {
  if (!ctx && el.value) ctx = gsap.context(() => {}, el.value);
  return ctx;
};
onUnmounted(() => ctx?.revert());

const SCAN_STYLE =
  "position:absolute;top:0;bottom:0;left:0;width:1px;z-index:10;pointer-events:none;" +
  "background:rgb(var(--brand-text));box-shadow:0 0 8px rgb(var(--brand-text));";

const playEntrance = () => {
  const root = el.value;
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Avatar: circular reveal + settle, then a ring that pulses once.
  tl.fromTo(
    q(".about-avatar"),
    { clipPath: "circle(0% at 50% 50%)", rotation: -14, scale: 0.85 },
    {
      clipPath: "circle(50% at 50% 50%)",
      rotation: 0,
      scale: 1,
      duration: 1,
      clearProps: "clipPath,transform",
    },
    0
  ).fromTo(
    q(".about-ring"),
    { opacity: 0.9, scale: 1 },
    { opacity: 0, scale: 1.7, duration: 0.9, ease: "power2.out", clearProps: "opacity,transform" },
    0.55
  );

  // Subtitle + CV slide in right after the name decode starts.
  tl.fromTo(
    q(".about-sub"),
    { opacity: 0, x: -24 },
    { opacity: 1, x: 0, duration: 0.7, clearProps: "opacity,transform" },
    0.25
  );
  const cv = q(".about-cv");
  tl.fromTo(
    cv,
    { opacity: 0, x: 32 },
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      clearProps: "opacity,transform,transition",
      onStart: () => cv.forEach((c) => (c.style.transition = "none")),
    },
    0.4
  );

  // Blueprint scan: columns reveal outward (left column from the left, right from the right).
  [".lane-left", ".lane-right"].forEach((col, ci) => {
    const fromLeft = ci === 0;
    q(`${col} .bento-card`).forEach((card, i) => {
      const at = 0.45 + ci * 0.15 + i * 0.2;
      const dur = 0.95;
      const ease = "power2.inOut";
      const hidden = fromLeft ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";

      tl.fromTo(
        card,
        { clipPath: hidden },
        { clipPath: "inset(0% 0% 0% 0%)", duration: dur, ease, clearProps: "clipPath" },
        at
      );

      const img = card.querySelector(".bento-img");
      if (img) {
        tl.fromTo(
          img,
          { scale: 1.25 },
          {
            scale: 1,
            duration: dur + 0.3,
            ease: "power3.out",
            clearProps: "transform,transition",
            onStart: () => (img.style.transition = "none"),
          },
          at
        );
      }

      const line = document.createElement("span");
      line.setAttribute("aria-hidden", "true");
      line.style.cssText = SCAN_STYLE;
      card.appendChild(line);
      tl.fromTo(
        line,
        { x: () => (fromLeft ? -1 : card.offsetWidth) },
        {
          x: () => (fromLeft ? card.offsetWidth - 1 : 0),
          duration: dur,
          ease,
          onComplete: () => line.remove(),
        },
        at
      );
    });
  });
};

// Scroll parallax: images drift inside their (oversized) wrapper.
const setupParallax = () => {
  if (prefersReducedMotion()) return;
  getCtx()?.add(() => {
    gsap.utils.toArray(".bento-par", el.value).forEach((par) => {
      gsap.fromTo(
        par,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: par.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  });
};

onMounted(setupParallax);

useEnterAnimation(el, () => {
  showName.value = true;
  if (prefersReducedMotion() || !el.value) return;
  getCtx().add(playEntrance);
});
</script>

<style scoped>
.bento-par {
  @apply absolute left-0 w-full h-[120%] -top-[10%] will-change-transform;
}

.bento-img {
  @apply w-full h-full object-cover transition-transform duration-700 ease-out;
}

.bento-card:hover .bento-img {
  @apply scale-105;
}
</style>
