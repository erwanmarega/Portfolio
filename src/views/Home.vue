<template>
  <main
    ref="el"
    class="relative min-h-screen flex flex-col font-sans overflow-hidden"
  >
    <nav
      ref="navEl"
      class="w-full flex items-center justify-between px-6 sm:px-8 lg:px-12 py-5 relative z-20"
    >
      <a href="/" class="flex items-center gap-3 group">
        <img
          :src="erwanImage"
          alt="Erwan Marega"
          class="w-11 h-11 rounded-full object-cover ring-2 ring-line/15 group-hover:ring-line/40 transition-all"
        />
        <span class="hidden sm:block font-bold text-ink text-lg">
          Erwan Marega
        </span>
      </a>

      <div class="flex items-center gap-3 sm:gap-4">
        <a
          href="https://github.com/erwanmarega"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-ink-soft hover:bg-ink hover:text-page transition-all duration-300"
          aria-label="GitHub"
        >
          <font-awesome-icon :icon="['fab', 'github']" class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/erwanmarega"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-ink-soft hover:bg-[#0a66c2] hover:text-white transition-all duration-300"
          aria-label="LinkedIn"
        >
          <font-awesome-icon :icon="['fab', 'linkedin-in']" class="w-5 h-5" />
        </a>
        <a
          href="#contact"
          class="hidden sm:inline-flex items-center gap-2 bg-ink text-page text-sm font-semibold rounded-full px-5 py-2.5 transition-all hover:bg-ink/90 hover:shadow-lg hover:shadow-ink/20"
        >
          <font-awesome-icon :icon="['fas', 'paper-plane']" class="w-4 h-4" />
          Me contacter
        </a>
      </div>
    </nav>

    <section
      class="lane-grid items-center px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24 lg:pb-32 flex-1 relative z-10 w-full"
    >
      <div
        ref="textBlock"
        class="lane-left text-center lg:text-left lg:pr-6"
      >
        <h1
          data-tower-anchor="home"
          class="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-[1.1] mb-6"
        >
          <span class="text-ink">Développeur Web Fullstack</span>
        </h1>

        <p
          class="text-ink-soft text-lg sm:text-xl lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
        >
          Je conçois des applications web modernes et performantes. Passionné
          par Vue.js, Node.js et l'expérience utilisateur.
        </p>

        <div
          ref="ctaEl"
          class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
        >
          <a
            href="#projects"
            class="inline-flex items-center gap-2 bg-ink text-page text-base font-semibold rounded-full px-7 py-3.5 transition-all hover:bg-ink/90 hover:shadow-xl hover:shadow-ink/20 hover:-translate-y-0.5"
          >
            <font-awesome-icon :icon="['fas', 'rocket']" class="w-4 h-4" />
            Voir mes projets
          </a>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 bg-surface-strong text-ink text-base font-semibold rounded-full px-7 py-3.5 border border-line/15 transition-all hover:border-line/40 hover:bg-surface hover:-translate-y-0.5"
          >
            <font-awesome-icon :icon="['fas', 'envelope']" class="w-4 h-4" />
            Me contacter
          </a>
        </div>

        <div
          ref="statsEl"
          class="flex items-center justify-center lg:justify-start gap-6 sm:gap-10 lg:gap-6 xl:gap-10"
        >
          <div class="text-center lg:text-left">
            <div class="text-2xl sm:text-3xl font-bold text-ink">
              {{ stats.projects }}
            </div>
            <div class="text-xs sm:text-sm text-ink-soft">
              Projets
            </div>
          </div>
          <div class="w-px h-10 bg-line/20" />
          <div class="text-center lg:text-left">
            <div class="text-2xl sm:text-3xl font-bold text-ink">
              {{ stats.tech }}
            </div>
            <div class="text-xs sm:text-sm text-ink-soft">
              Technologies
            </div>
          </div>
          <div class="w-px h-10 bg-line/20" />
          <div class="text-center lg:text-left">
            <div class="text-2xl sm:text-3xl font-bold text-ink">
              {{ stats.years }}
            </div>
            <div class="text-xs sm:text-sm text-ink-soft">
              Années
            </div>
          </div>
        </div>
      </div>

      <div
        ref="mockupBlock"
        class="lane-right flex justify-center lg:justify-end lg:pl-6"
      >
        <div class="mockup-container relative lg:w-full lg:max-w-[30rem]">
          <div
            class="absolute inset-4 bg-gradient-to-tr from-brand/20 via-surface-strong/40 to-brand/10 rounded-full blur-3xl"
          />
          <img
            :src="ipadMockup"
            alt="Portfolio mockup"
            class="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-full lg:h-auto lg:aspect-square object-contain animate-float transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>

    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-10"
    >
      <div
        ref="scrollIndicator"
        class="flex flex-col items-center lg:items-start gap-2 text-ink-muted"
      >
        <span class="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <div
          class="w-6 h-10 rounded-full border-2 border-ink-muted/50 flex justify-center p-1"
        >
          <div class="w-1.5 h-2.5 bg-ink-muted rounded-full animate-scroll-dot" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { gsap } from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPaperPlane,
  faEnvelope,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import erwanImage from "../assets/images/logo.webp";
import ipadMockup from "../assets/images/ipad-mockup.webp";

library.add(faPaperPlane, faEnvelope, faRocket, faGithub, faLinkedinIn);

const el = ref(null);
const navEl = ref(null);
const textBlock = ref(null);
const ctaEl = ref(null);
const statsEl = ref(null);
const mockupBlock = ref(null);
const scrollIndicator = ref(null);

const stats = reactive({ projects: 0, tech: 0, years: 0 });

const animateStats = () => {
  const targets = { projects: 5, tech: 12, years: 3 };
  Object.entries(targets).forEach(([key, value]) => {
    const counter = { v: 0 };
    gsap.to(counter, {
      v: value,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        stats[key] = Math.round(counter.v);
      },
    });
  });
};

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(navEl.value, { y: -20, opacity: 0 });
  gsap.set(textBlock.value.querySelector("h1"), { y: 40, opacity: 0 });
  gsap.set(textBlock.value.querySelector("p"), { y: 30, opacity: 0 });
  gsap.set(ctaEl.value, { y: 30, opacity: 0 });
  gsap.set(statsEl.value, { y: 30, opacity: 0 });
  gsap.set(mockupBlock.value, { x: 80, opacity: 0, scale: 0.95 });
  gsap.set(scrollIndicator.value, { opacity: 0, y: 20 });

  tl.to(navEl.value, { y: 0, opacity: 1, duration: 0.6 })
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
  background: rgba(10, 10, 10, 0.1);
  filter: blur(20px);
  z-index: -1;
}
</style>
