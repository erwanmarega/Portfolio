<template>
  <div
    v-if="show"
    class="intro fixed inset-0 z-50 flex flex-col items-center justify-center bg-page px-6"
    :class="{ 'is-leaving': leaving }"
    @click="finish"
    @transitionend.self="onLeft"
  >
    <!-- Tiny hand-drawn story: a seed is planted, the sun comes up, a web app grows. -->
    <svg viewBox="0 0 400 270" class="w-full max-w-[440px]" aria-hidden="true">
      <defs>
        <filter id="intro-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
        <pattern id="intro-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="7" class="hatch-line" />
        </pattern>
        <pattern id="intro-hatch-sun" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
          <line x1="0" y1="0" x2="0" y2="5" class="hatch-sun" />
        </pattern>
        <linearGradient id="intro-soil-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" />
          <stop offset="1" stop-color="#000" />
        </linearGradient>
        <mask id="intro-soil-mask">
          <rect x="30" y="212" width="340" height="58" fill="url(#intro-soil-fade)" />
        </mask>
      </defs>

      <g filter="url(#intro-wobble)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sun -->
        <g class="sun">
          <g class="sun-rays">
            <line v-for="ray in rays" :key="ray.i" :x1="ray.x1" :y1="ray.y1" :x2="ray.x2" :y2="ray.y2" class="ray" :style="{ '--i': ray.i }" />
          </g>
          <circle cx="318" cy="70" r="25" class="sun-disc" />
          <circle cx="318" cy="70" r="25" fill="url(#intro-hatch-sun)" stroke="none" />
        </g>

        <!-- Soil and ground line -->
        <g mask="url(#intro-soil-mask)" class="soil">
          <rect x="30" y="212" width="340" height="58" class="soil-fill" stroke="none" />
          <rect x="30" y="212" width="340" height="58" fill="url(#intro-hatch)" stroke="none" />
        </g>
        <path d="M30 212 H184 Q200 236 216 212 H370" pathLength="1" class="ink draw ground" />
        <path v-for="(blade, i) in grass" :key="i" :d="blade" pathLength="1" class="ink thin draw grass" :style="{ '--i': i }" />

        <!-- Seed -->
        <ellipse cx="200" cy="218" rx="7" ry="4.5" class="seed" />

        <!-- Plant -->
        <path d="M200 216 C197 196 204 180 200 158 C196 140 203 124 200 106" pathLength="1" class="stem draw" />
        <path d="M200 172 C180 166 166 150 163 134 C181 136 196 150 200 172 Z" class="leaf leaf-left" />
        <path d="M200 150 C220 144 234 128 237 112 C219 114 204 128 200 150 Z" class="leaf leaf-right" />

        <!-- Fruit: a small browser window -->
        <g class="fruit">
          <rect x="158" y="48" width="84" height="58" rx="7" class="window" />
          <path d="M158 63 H242" class="ink thin" />
          <circle cx="167" cy="55.5" r="2" class="dot" />
          <circle cx="174.5" cy="55.5" r="2" class="dot" />
          <circle cx="182" cy="55.5" r="2" class="dot" />
          <rect x="167" y="71" width="26" height="26" rx="3" class="block" />
          <path d="M201 75 H232 M201 84 H226 M201 93 H218" class="ink thin" />
        </g>
        <path d="M146 44 L138 36 M254 44 L262 36 M200 36 V25" class="ink thin spark" />
      </g>
    </svg>

    <p class="name mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Erwan Marega</p>
    <p class="role mt-2 font-mono text-xs text-ink-muted">Développeur web fullstack</p>

    <button
      type="button"
      class="skip absolute bottom-6 right-6 rounded-sm font-mono text-xs text-ink-muted outline-none transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      @click.stop="finish"
    >
      Passer l'intro
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// Shown once per browser session, never with reduced motion. Any click or key skips it.
const STORAGE_KEY = "intro-seen";
const DURATION_MS = 4300;

const show = ref(false);
const leaving = ref(false);
let timer = 0;

const rays = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    i,
    x1: 318 + cos * 33,
    y1: 70 + sin * 33,
    x2: 318 + cos * (i % 2 ? 42 : 47),
    y2: 70 + sin * (i % 2 ? 42 : 47),
  };
});

const grass = [
  "M62 212 l-3 -9",
  "M70 212 l2 -11",
  "M118 212 l-2 -8",
  "M127 212 l3 -10",
  "M262 212 l-3 -10",
  "M271 212 l2 -8",
  "M322 212 l-2 -11",
  "M331 212 l3 -8",
];

const seen = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const remember = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the intro then simply replays.
  }
};

const unlock = () => {
  document.documentElement.style.overflow = "";
  window.removeEventListener("keydown", finish);
};

const finish = () => {
  if (!show.value || leaving.value) return;
  clearTimeout(timer);
  leaving.value = true;
  unlock();
};

const onLeft = () => {
  if (leaving.value) show.value = false;
};

onMounted(() => {
  if (seen() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  remember();
  show.value = true;
  document.documentElement.style.overflow = "hidden";
  window.addEventListener("keydown", finish);
  timer = setTimeout(finish, DURATION_MS);
});

onUnmounted(() => {
  clearTimeout(timer);
  unlock();
});
</script>

<style scoped>
.intro {
  --green: #4f8f3c;
  --leaf: #86bd6c;
  --sun: #f2b44d;
  transition: transform 0.75s cubic-bezier(0.7, 0, 0.2, 1);
}
.intro.is-leaving {
  transform: translateY(-100%);
}

/* Strokes */
.ink {
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.thin {
  stroke-width: 1.8;
}
.hatch-line {
  stroke: rgb(var(--brand) / 0.45);
  stroke-width: 1.2;
}
.hatch-sun {
  stroke: rgb(var(--brand) / 0.4);
  stroke-width: 1;
}

/* Self-drawing paths (pathLength="1") */
.draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw var(--dur, 0.6s) ease-out var(--at, 0s) forwards;
}
.ground {
  --dur: 0.7s;
  --at: 0.1s;
}
.grass {
  --dur: 0.25s;
  --at: calc(0.55s + var(--i) * 0.05s);
}
.stem {
  stroke: var(--green);
  stroke-width: 4;
  --dur: 0.9s;
  --at: 1.75s;
}

.soil {
  opacity: 0;
  animation: fade 0.6s ease-out 0.4s forwards;
}
.soil-fill {
  fill: rgb(var(--brand) / 0.16);
}

.seed {
  fill: rgb(var(--ink));
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: drop 0.75s cubic-bezier(0.5, 0, 0.8, 0.4) 0.75s forwards;
}

.sun {
  transform-box: fill-box;
  transform-origin: center;
  transform: scale(0);
  animation: pop 0.6s cubic-bezier(0.3, 1.5, 0.5, 1) 1.2s forwards;
}
.sun-disc {
  fill: var(--sun);
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.sun-rays {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 14s linear 1.2s infinite;
}
.ray {
  stroke: var(--sun);
  stroke-width: 2.5;
  opacity: 0;
  animation: fade 0.2s ease-out calc(1.5s + var(--i) * 0.04s) forwards;
}

.leaf {
  fill: var(--leaf);
  stroke: rgb(var(--ink));
  stroke-width: 2;
  transform-box: fill-box;
  transform: scale(0);
  animation: pop 0.45s cubic-bezier(0.3, 1.5, 0.5, 1) forwards;
}
.leaf-left {
  transform-origin: right bottom;
  animation-delay: 2.2s;
}
.leaf-right {
  transform-origin: left bottom;
  animation-delay: 2.4s;
}

.fruit {
  transform-box: fill-box;
  transform-origin: center bottom;
  transform: scale(0);
  animation:
    pop 0.55s cubic-bezier(0.3, 1.6, 0.5, 1) 2.65s forwards,
    sway 2.4s ease-in-out 3.2s infinite;
}
.window {
  fill: rgb(var(--surface));
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.dot {
  fill: rgb(var(--ink));
  stroke: none;
}
.block {
  fill: rgb(var(--brand));
  stroke: none;
}
.spark {
  opacity: 0;
  animation: spark 0.6s ease-out 3.05s forwards;
}

.name,
.role {
  opacity: 0;
  animation: rise 0.6s ease-out forwards;
}
.name {
  animation-delay: 3s;
}
.role {
  animation-delay: 3.2s;
}
.skip {
  opacity: 0;
  animation: fade 0.4s ease-out 0.6s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes fade {
  to {
    opacity: 1;
  }
}
@keyframes pop {
  to {
    transform: scale(1);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes drop {
  0% {
    opacity: 1;
    transform: translateY(-120px);
  }
  70% {
    transform: translateY(0);
  }
  82% {
    transform: translateY(-7px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes sway {
  0%,
  100% {
    transform: scale(1) rotate(-1.5deg);
  }
  50% {
    transform: scale(1) rotate(1.5deg);
  }
}
@keyframes spark {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
