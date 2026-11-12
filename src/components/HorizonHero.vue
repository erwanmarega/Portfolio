<template>
  <div
    ref="wrap"
    class="hero relative overflow-hidden rounded-2xl border border-line/10"
    :class="{ 'is-paused': paused, 'is-static': reduced }"
    aria-hidden="true"
  >
    <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" class="block h-full w-full">
      <defs>
        <filter id="hero-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
        <pattern
          id="hero-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="7" class="hatch" />
        </pattern>
        <pattern
          id="hero-hatch-sun"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-32)"
        >
          <line x1="0" y1="0" x2="0" y2="5" class="hatch" />
        </pattern>
        <pattern
          id="hero-hatch-cloud"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(60)"
        >
          <line x1="0" y1="0" x2="0" y2="6" class="hatch-cloud" />
        </pattern>
        <pattern
          id="hero-hatch-night"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="8" class="hatch-night" />
        </pattern>
      </defs>

      <Transition name="scene">
        <g v-if="scene === 0" key="garden" filter="url(#hero-wobble)" class="art">
          <rect width="800" height="300" class="paper" />

          <g transform="translate(612 78)">
            <g class="pop" style="--at: 0.3s">
              <g class="spin">
                <line
                  v-for="ray in rays"
                  :key="ray.i"
                  :x1="ray.x1"
                  :y1="ray.y1"
                  :x2="ray.x2"
                  :y2="ray.y2"
                  class="ray fade"
                  :style="{ '--at': `${0.6 + ray.i * 0.04}s` }"
                />
              </g>
              <circle r="30" class="sun-disc" />
              <circle r="30" fill="url(#hero-hatch-sun)" />
            </g>
          </g>

          <g transform="translate(170 70)">
            <g class="drift fade" style="--at: 0.4s"><path :d="CLOUD" class="cloud" /></g>
          </g>
          <g transform="translate(490 40) scale(0.6)">
            <g class="drift slow fade" style="--at: 0.7s"><path :d="CLOUD" class="cloud" /></g>
          </g>

          <path :d="HILL_FILL" class="soil" />
          <path :d="HILL_FILL" fill="url(#hero-hatch)" />
          <path :d="HILL_LINE" pathLength="1" class="ink draw" style="--dur: 0.9s" />
          <path
            v-for="(blade, i) in grass"
            :key="i"
            :d="blade"
            pathLength="1"
            class="ink thin draw"
            :style="{ '--at': `${0.6 + i * 0.05}s`, '--dur': '0.25s' }"
          />

          <g
            v-for="plant in gardenPlants"
            :key="plant.x"
            :transform="`translate(${plant.x} ${plant.y}) scale(${plant.s})`"
          >
            <path
              :d="STEM"
              pathLength="1"
              class="stem draw"
              :style="{ '--at': `${plant.at}s`, '--dur': '0.9s' }"
            />
            <path
              :d="LEAF_LEFT"
              class="leaf pop origin-br"
              :style="{ '--at': `${plant.at + 0.45}s` }"
            />
            <path
              :d="LEAF_RIGHT"
              class="leaf pop origin-bl"
              :style="{ '--at': `${plant.at + 0.65}s` }"
            />
            <g v-if="plant.fruit" class="pop origin-b" :style="{ '--at': `${plant.at + 0.9}s` }">
              <g class="sway">
                <rect x="-42" y="-168" width="84" height="58" rx="7" class="window" />
                <path d="M-42 -153 H42" class="ink thin" />
                <circle
                  v-for="cx in [-33, -25.5, -18]"
                  :key="cx"
                  :cx="cx"
                  cy="-160.5"
                  r="2"
                  class="dot"
                />
                <rect
                  x="-33"
                  y="-145"
                  width="26"
                  height="26"
                  rx="3"
                  class="block"
                  :style="{ fill: plant.color }"
                />
                <path d="M1 -141 H32 M1 -132 H26 M1 -123 H18" class="ink thin" />
              </g>
            </g>
          </g>
        </g>

        <g v-else-if="scene === 1" key="rain" filter="url(#hero-wobble)" class="art">
          <rect width="800" height="300" class="paper rainy" />

          <g transform="translate(400 74) scale(1.9)">
            <g class="drift fade" style="--at: 0.2s">
              <path :d="CLOUD" class="cloud" />
              <path :d="CLOUD" fill="url(#hero-hatch-cloud)" />
            </g>
          </g>
          <line
            v-for="drop in rain"
            :key="drop.i"
            :x1="drop.x"
            y1="112"
            :x2="drop.x - 4"
            y2="124"
            class="drop"
            :style="{ '--at': `${0.8 + drop.delay}s` }"
          />

          <path :d="HILL_FILL" class="soil wet" />
          <path :d="HILL_FILL" fill="url(#hero-hatch)" />
          <path :d="HILL_LINE" pathLength="1" class="ink draw" style="--dur: 0.9s" />
          <path
            v-for="(blade, i) in grass"
            :key="i"
            :d="blade"
            pathLength="1"
            class="ink thin draw"
            :style="{ '--at': `${0.6 + i * 0.05}s`, '--dur': '0.25s' }"
          />

          <g
            v-for="sprout in sprouts"
            :key="sprout.x"
            :transform="`translate(${sprout.x} ${sprout.y}) scale(${sprout.s})`"
          >
            <g class="sway origin-b">
              <path
                :d="STEM"
                pathLength="1"
                class="stem draw"
                :style="{ '--at': `${sprout.at}s`, '--dur': '1.4s' }"
              />
              <path
                :d="LEAF_LEFT"
                class="leaf pop origin-br"
                :style="{ '--at': `${sprout.at + 0.7}s` }"
              />
              <path
                :d="LEAF_RIGHT"
                class="leaf pop origin-bl"
                :style="{ '--at': `${sprout.at + 1}s` }"
              />
            </g>
          </g>
        </g>

        <g v-else key="night" filter="url(#hero-wobble)" class="art night">
          <rect width="800" height="300" class="sky" />
          <rect width="800" height="300" fill="url(#hero-hatch-night)" />

          <g transform="translate(618 74)" class="fade" style="--at: 0.3s">
            <circle r="24" class="moon" />
            <circle cx="11" cy="-7" r="21" class="sky" />
          </g>
          <path
            v-for="star in stars"
            :key="star.i"
            :d="star.d"
            class="star twinkle"
            :style="{ '--at': `${star.delay}s` }"
          />

          <path :d="HILL_FILL" class="soil dark" />
          <path :d="HILL_FILL" fill="url(#hero-hatch-night)" />
          <path :d="HILL_LINE" pathLength="1" class="chalk draw" style="--dur: 0.9s" />

          <path
            v-for="(line, i) in TOWER"
            :key="i"
            :d="line"
            pathLength="1"
            class="chalk draw"
            :class="{ thin: i > 3 }"
            :style="{ '--at': `${0.9 + i * 0.28}s`, '--dur': '0.8s' }"
          />
          <circle cx="400" cy="44" r="3.5" class="beacon" />

          <g class="plane">
            <path d="M0 0 L26 -9 L10 3 Z M10 3 L12 11 L16 1" class="chalk thin paper-plane" />
          </g>
        </g>
      </Transition>
    </svg>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const SCENE_COUNT = 3;
const SCENE_MS = 8500;

const HILL_LINE = "M-20 250 Q400 190 820 250";
const HILL_FILL = `${HILL_LINE} L820 320 L-20 320 Z`;
const hillY = (x) => {
  const t = (x + 20) / 840;
  return 250 - 120 * t * (1 - t);
};

const STEM = "M0 0 C-3 -20 4 -36 0 -58 C-4 -76 3 -92 0 -110";
const LEAF_LEFT = "M0 -44 C-20 -50 -34 -66 -37 -82 C-19 -80 -4 -66 0 -44 Z";
const LEAF_RIGHT = "M0 -66 C20 -72 34 -88 37 -104 C19 -102 4 -88 0 -66 Z";
const CLOUD =
  "M-52 18 C-66 18 -68 -2 -52 -4 C-52 -24 -22 -30 -12 -14 C-2 -34 34 -30 36 -8 C56 -10 62 16 44 18 Z";

const TOWER = [
  "M352 222 C378 182 392 122 398 60",
  "M448 222 C422 182 408 122 402 60",
  "M366 222 Q400 184 434 222",
  "M400 60 V44",
  "M372 182 H428",
  "M385 140 H415",
  "M374 182 L415 140 M426 182 L385 140",
  "M387 140 L404 100 M413 140 L396 100",
];

const plantAt = (x, extra) => ({ x, y: hillY(x) + 1, ...extra });

const gardenPlants = [
  plantAt(290, { s: 0.62, at: 1.5, fruit: true, color: "#35557A" }),
  plantAt(400, { s: 1, at: 1, fruit: true, color: "rgb(var(--brand))" }),
  plantAt(505, { s: 0.5, at: 1.9, fruit: false }),
  plantAt(210, { s: 0.36, at: 2.2, fruit: false }),
];

const sprouts = [
  plantAt(300, { s: 0.55, at: 2.1 }),
  plantAt(350, { s: 0.8, at: 1.5 }),
  plantAt(402, { s: 0.65, at: 2.5 }),
  plantAt(452, { s: 0.9, at: 1.8 }),
  plantAt(502, { s: 0.5, at: 2.8 }),
];

const rays = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  const reach = i % 2 ? 48 : 54;
  return {
    i,
    x1: Math.cos(angle) * 38,
    y1: Math.sin(angle) * 38,
    x2: Math.cos(angle) * reach,
    y2: Math.sin(angle) * reach,
  };
});

const grass = [70, 82, 150, 600, 612, 690, 702, 745].map((x, i) => {
  const lean = i % 2 ? 3 : -3;
  return `M${x} ${hillY(x).toFixed(1)} l${lean} -${8 + (i % 3) * 2}`;
});

const rain = Array.from({ length: 18 }, (_, i) => ({
  i,
  x: 312 + i * 10.5,
  delay: ((i * 7) % 18) * 0.06,
}));

const STAR_POINTS = [
  [70, 50],
  [130, 110],
  [190, 40],
  [250, 90],
  [300, 36],
  [470, 44],
  [520, 100],
  [560, 30],
  [690, 40],
  [730, 110],
  [760, 64],
  [96, 160],
  [700, 170],
  [230, 150],
];
const stars = STAR_POINTS.map(([x, y], i) => {
  const r = 3 + (i % 3);
  return { i, delay: (i % 5) * 0.5, d: `M${x - r} ${y} H${x + r} M${x} ${y - r} V${y + r}` };
});

const wrap = ref(null);
const scene = ref(0);
const paused = ref(false);
const reduced = ref(false);
let timer = 0;
let visible = true;
let observer = null;

const play = () => {
  paused.value = false;
  if (timer || reduced.value) return;
  timer = setInterval(() => {
    scene.value = (scene.value + 1) % SCENE_COUNT;
  }, SCENE_MS);
};

const pause = () => {
  paused.value = true;
  clearInterval(timer);
  timer = 0;
};

const sync = () => (visible && !document.hidden ? play() : pause());

onMounted(() => {
  reduced.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(wrap.value);
  document.addEventListener("visibilitychange", sync);
});

onUnmounted(() => {
  clearInterval(timer);
  observer?.disconnect();
  document.removeEventListener("visibilitychange", sync);
});
</script>

<style scoped>
.hero {
  --green: #4f8f3c;
  --leaf: #86bd6c;
  --sun: #f2b44d;
  --night: #1c2740;
  --chalk: #f3e9d6;

  width: 100%;
  aspect-ratio: 8 / 3;
  min-height: 220px;
  background: rgb(var(--surface));
}

.scene-enter-active,
.scene-leave-active {
  transition: opacity 0.9s ease;
}
.scene-enter-from,
.scene-leave-to {
  opacity: 0;
}

.is-paused .art * {
  animation-play-state: paused !important;
}
.is-static .art * {
  animation: none !important;
}

.art {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.paper {
  fill: rgb(var(--surface));
}
.paper.rainy {
  fill: rgb(var(--surface-strong));
}
.sky {
  fill: var(--night);
}

.ink {
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.chalk {
  stroke: var(--chalk);
  stroke-width: 2.5;
}
.thin {
  stroke-width: 1.8;
}
.hatch {
  stroke: rgb(var(--brand) / 0.42);
  stroke-width: 1.2;
}
.hatch-cloud {
  stroke: rgb(var(--ink) / 0.22);
  stroke-width: 1;
}
.hatch-night {
  stroke: rgb(255 255 255 / 0.07);
  stroke-width: 1.2;
}

.soil {
  fill: rgb(var(--brand) / 0.16);
}
.soil.wet {
  fill: rgb(var(--brand) / 0.26);
}
.soil.dark {
  fill: #141c30;
}
.sun-disc {
  fill: var(--sun);
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.ray {
  stroke: var(--sun);
  stroke-width: 2.5;
}
.cloud {
  fill: rgb(var(--surface));
  stroke: rgb(var(--ink));
  stroke-width: 2.2;
}
.stem {
  stroke: var(--green);
  stroke-width: 4;
}
.leaf {
  fill: var(--leaf);
  stroke: rgb(var(--ink));
  stroke-width: 2;
}
.window {
  fill: rgb(var(--surface));
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.dot {
  fill: rgb(var(--ink));
}
.moon {
  fill: #f4e3b1;
}
.star {
  stroke: var(--chalk);
  stroke-width: 1.6;
}
.beacon {
  fill: var(--sun);
  animation: blink 1.6s ease-in-out 3.4s infinite both;
}
.paper-plane {
  fill: var(--night);
}

.draw {
  stroke-dasharray: 1;
  animation: draw var(--dur, 0.6s) ease-out var(--at, 0s) both;
}
.pop {
  transform-box: fill-box;
  transform-origin: center;
  animation: pop 0.55s cubic-bezier(0.3, 1.5, 0.5, 1) var(--at, 0s) both;
}
.fade {
  animation: fade 0.5s ease-out var(--at, 0s) both;
}
.origin-b {
  transform-box: fill-box;
  transform-origin: center bottom;
}
.origin-bl {
  transform-origin: left bottom;
}
.origin-br {
  transform-origin: right bottom;
}

.spin {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 16s linear infinite;
}
.sway {
  transform-box: fill-box;
  transform-origin: center bottom;
  animation: sway 2.6s ease-in-out infinite;
}
.drift.fade {
  animation:
    fade 0.5s ease-out var(--at, 0s) both,
    drift 9s ease-in-out infinite alternate;
}
.drift.slow.fade {
  animation:
    fade 0.5s ease-out var(--at, 0s) both,
    drift 13s ease-in-out infinite alternate-reverse;
}
.twinkle {
  animation: twinkle 2.4s ease-in-out var(--at, 0s) infinite;
}
.drop {
  stroke: #5b7fa6;
  stroke-width: 2;
  animation: fall 0.85s linear var(--at, 0s) infinite both;
}
.plane {
  animation: fly 7s linear 1.2s infinite both;
}

@keyframes draw {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes pop {
  from {
    transform: scale(0);
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes sway {
  0%,
  100% {
    transform: rotate(-1.6deg);
  }
  50% {
    transform: rotate(1.6deg);
  }
}
@keyframes drift {
  from {
    transform: translateX(-14px);
  }
  to {
    transform: translateX(14px);
  }
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
}
@keyframes blink {
  0%,
  100% {
    opacity: 0.15;
  }
  50% {
    opacity: 1;
  }
}
@keyframes fall {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  15% {
    opacity: 0.9;
  }
  85% {
    opacity: 0.9;
  }
  100% {
    transform: translate(-32px, 96px);
    opacity: 0;
  }
}
@keyframes fly {
  0% {
    transform: translate(-40px, 150px);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  50% {
    transform: translate(400px, 96px);
  }
  92% {
    opacity: 1;
  }
  100% {
    transform: translate(840px, 130px);
    opacity: 0;
  }
}
</style>
