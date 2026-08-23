<template>
  <main
    ref="el"
    class="relative min-h-screen bg-white flex flex-col font-sans overflow-hidden"
  >
    <ParticleCanvas />

    <!-- Navbar -->
    <nav
      ref="navEl"
      class="w-full flex items-center justify-between px-6 sm:px-8 lg:px-12 py-5 relative z-20"
    >
      <a href="/" class="flex items-center gap-3 group">
        <img
          :src="erwanImage"
          alt="Erwan Marega"
          class="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-gray-300 transition-all"
        />
        <span class="hidden sm:block font-bold text-gray-900 text-lg">
          Erwan Marega
        </span>
      </a>

      <div class="flex items-center gap-3 sm:gap-4">
        <a
          href="https://github.com/erwanmarega"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
          aria-label="GitHub"
        >
          <font-awesome-icon :icon="['fab', 'github']" class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/erwanmarega"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#0a66c2] hover:text-white transition-all duration-300"
          aria-label="LinkedIn"
        >
          <font-awesome-icon :icon="['fab', 'linkedin-in']" class="w-5 h-5" />
        </a>
        <a
          href="#contact"
          class="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-all hover:bg-black hover:shadow-lg hover:shadow-gray-900/20"
        >
          <font-awesome-icon :icon="['fas', 'paper-plane']" class="w-4 h-4" />
          Me contacter
        </a>
      </div>
    </nav>

    <!-- Hero -->
    <section
      class="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24 flex-1 relative z-10 max-w-7xl mx-auto w-full"
    >
      <div
        ref="textBlock"
        class="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12"
      >
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6"
        >
          <span class="text-gray-900">Développeur Web Fullstack</span>
        </h1>

        <p
          class="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
        >
          Je conçois des applications web modernes et performantes. Passionné
          par Vue.js, Node.js et l'expérience utilisateur.
        </p>

        <div
          ref="ctaEl"
          class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
        >
          <a
            href="#creations"
            class="inline-flex items-center gap-2 bg-gray-900 text-white text-base font-semibold rounded-full px-7 py-3.5 transition-all hover:bg-black hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5"
          >
            <font-awesome-icon :icon="['fas', 'rocket']" class="w-4 h-4" />
            Voir mes projets
          </a>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 bg-white text-gray-900 text-base font-semibold rounded-full px-7 py-3.5 border border-gray-200 transition-all hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" class="w-4 h-4" />
            Me contacter
          </a>
        </div>

        <div
          ref="statsEl"
          class="flex items-center justify-center lg:justify-start gap-8 sm:gap-10"
        >
          <div class="text-center lg:text-left">
            <div
              ref="statProjects"
              class="text-2xl sm:text-3xl font-bold text-gray-900"
            >
              0
            </div>
            <div class="text-xs sm:text-sm text-gray-500">Projets</div>
          </div>
          <div class="w-px h-10 bg-gray-200" />
          <div class="text-center lg:text-left">
            <div
              ref="statTech"
              class="text-2xl sm:text-3xl font-bold text-gray-900"
            >
              0
            </div>
            <div class="text-xs sm:text-sm text-gray-500">Technologies</div>
          </div>
          <div class="w-px h-10 bg-gray-200" />
          <div class="text-center lg:text-left">
            <div
              ref="statYears"
              class="text-2xl sm:text-3xl font-bold text-gray-900"
            >
              0
            </div>
            <div class="text-xs sm:text-sm text-gray-500">Années</div>
          </div>
        </div>
      </div>

      <div
        ref="mockupBlock"
        class="lg:w-1/2 flex justify-center lg:justify-end"
      >
        <div class="mockup-container relative">
          <div
            class="absolute -inset-4 bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-pink-200/40 rounded-full blur-3xl"
          />
          <img
            :src="ipadMockup"
            alt="Portfolio mockup"
            class="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain animate-float transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>

    <!-- Scroll indicator -->
    <div
      ref="scrollIndicator"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-400"
    >
      <span class="text-xs font-medium uppercase tracking-widest">Scroll</span>
      <div
        class="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center p-1"
      >
        <div class="w-1.5 h-2.5 bg-gray-400 rounded-full animate-scroll-dot" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPaperPlane,
  faEnvelope,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import ParticleCanvas from "../components/ParticleCanvas.vue";
import erwanImage from "../assets/erwan.webp";
import ipadMockup from "../assets/ipad-mockup.webp";

library.add(faPaperPlane, faEnvelope, faRocket, faGithub, faLinkedinIn);

const el = ref(null);
const navEl = ref(null);
const badgeEl = ref(null);
const textBlock = ref(null);
const ctaEl = ref(null);
const statsEl = ref(null);
const mockupBlock = ref(null);
const scrollIndicator = ref(null);

const statProjects = ref(null);
const statTech = ref(null);
const statYears = ref(null);

const animateStats = () => {
  const targets = [
    { el: statProjects.value, value: 5 },
    { el: statTech.value, value: 12 },
    { el: statYears.value, value: 3 },
  ];

  targets.forEach(({ el, value }) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.5,
        ease: "power2.out",
        snap: { innerText: 1 },
      }
    );
  });
};

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(navEl.value, { y: -20, opacity: 0 });
  gsap.set(badgeEl.value, { y: 20, opacity: 0, scale: 0.9 });
  gsap.set(textBlock.value.querySelector("h1"), { y: 40, opacity: 0 });
  gsap.set(textBlock.value.querySelector("p"), { y: 30, opacity: 0 });
  gsap.set(ctaEl.value, { y: 30, opacity: 0 });
  gsap.set(statsEl.value, { y: 30, opacity: 0 });
  gsap.set(mockupBlock.value, { x: 80, opacity: 0, scale: 0.95 });
  gsap.set(scrollIndicator.value, { opacity: 0, y: 20 });

  tl.to(navEl.value, { y: 0, opacity: 1, duration: 0.6 })
    .to(badgeEl.value, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, "-=0.3")
    .to(
      textBlock.value.querySelector("h1"),
      { y: 0, opacity: 1, duration: 0.9 },
      "-=0.4"
    )
    .to(
      textBlock.value.querySelector("p"),
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .to(ctaEl.value, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
    .to(statsEl.value, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
    .to(mockupBlock.value, { x: 0, opacity: 1, scale: 1, duration: 1 }, "-=0.8")
    .add(() => animateStats(), "-=0.6")
    .to(scrollIndicator.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

@keyframes scroll-dot {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  60% {
    transform: translateY(12px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

.animate-scroll-dot {
  animation: scroll-dot 1.8s ease-in-out infinite;
}

.mockup-container {
  position: relative;
  perspective: 1000px;
}

.mockup-container::after {
  content: "";
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%) rotate(12deg);
  width: 80%;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  filter: blur(20px);
  z-index: -1;
}
</style>
