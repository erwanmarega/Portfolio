<template>
  <!-- Page change: a cream panel slides in from the left with a small hand-drawn
       scene (a paper plane loops across the sky), the page swaps underneath,
       then the panel leaves to the right. Same drawing style as IntroSplash. -->
  <div
    v-if="phase !== 'idle'"
    class="page-wipe print:hidden fixed inset-0 z-50 flex flex-col items-center justify-center bg-page px-6"
    :class="phase === 'in' ? 'is-in' : 'is-out'"
    aria-hidden="true"
    @animationend.self="onAnimationEnd"
  >
    <svg viewBox="0 0 400 220" class="w-full max-w-[520px] overflow-visible">
      <defs>
        <filter id="wipe-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
        <!-- The dashed trail is revealed by a solid stroke that draws itself. -->
        <mask
          id="wipe-trail-mask"
          maskUnits="userSpaceOnUse"
          x="-40"
          y="0"
          width="520"
          height="220"
        >
          <path :d="FLIGHT" pathLength="1" class="trail-reveal" />
        </mask>
      </defs>

      <g filter="url(#wipe-wobble)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path
          d="M52 78 q-13 0 -13 -11 q0 -11 13 -10 q4 -13 19 -9 q11 -7 18 5 q13 0 12 12 q0 13 -13 13 Z"
          pathLength="1"
          class="ink draw cloud-a"
        />
        <path
          d="M292 190 q-10 0 -10 -9 q0 -9 10 -8 q3 -10 15 -7 q9 -5 14 4 q10 0 10 10 q0 10 -11 10 Z"
          pathLength="1"
          class="ink thin draw cloud-b"
        />

        <path :d="FLIGHT" class="trail" mask="url(#wipe-trail-mask)" />

        <g class="plane">
          <path d="M16 0 L-13 -10 L-7 0 L-13 10 Z" class="plane-body" />
          <path d="M16 0 L-7 0 L-13 10 Z" class="plane-shade" />
          <path d="M16 0 L-7 0" class="ink thin" />
        </g>
      </g>
    </svg>

    <p class="label mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
      {{ label }}
    </p>
  </div>
</template>

<script setup>
import { nextTick, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { localeFromRoute, messages } from "../composables/useLocale.js";

// Total = IN_MS + HOLD_MS + the 0.45s exit (keep the CSS durations below in sync).
const IN_MS = 450;
const HOLD_MS = 800;

// Flight path of the plane (one loop, then off the right edge); also the trail.
const FLIGHT =
  "M-30 150 C60 150 90 90 150 110 C200 127 190 180 160 170 C128 160 150 100 220 105 C300 110 350 85 440 50";

const router = useRouter();
const phase = ref("idle"); // "idle" | "in" | "out"
const label = ref("");
let timer = 0;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const removeBefore = router.beforeEach((to, from) => {
  // Only real page changes: not the first load, a hash, or a language switch.
  if (!from.name || to.name === from.name) return;
  if (phase.value !== "idle" || reducedMotion()) return;

  label.value = messages[localeFromRoute(to)].nav.pages[to.name] ?? "Erwan Marega";
  phase.value = "in";
  // Hold the navigation until the scene has played, so the swap stays hidden.
  return new Promise((resolve) => {
    timer = setTimeout(resolve, IN_MS + HOLD_MS);
  });
});

const leave = () => {
  if (phase.value === "in") nextTick(() => (phase.value = "out"));
};
const removeAfter = router.afterEach(leave);
const removeError = router.onError(leave);

const onAnimationEnd = () => {
  if (phase.value === "out") phase.value = "idle";
};

onUnmounted(() => {
  clearTimeout(timer);
  removeBefore();
  removeAfter();
  removeError();
});
</script>

<style scoped>
/* Panel: in from the left, out to the right. The scene animations below are not
   tied to .is-in / .is-out, so they do not restart when the panel leaves. */
.page-wipe.is-in {
  animation: wipe-in 0.45s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}
.page-wipe.is-out {
  animation: wipe-out 0.45s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}

/* Strokes */
.ink {
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.thin {
  stroke-width: 1.8;
}

/* Self-drawing paths (pathLength="1") */
.draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw var(--dur, 0.5s) ease-out var(--at, 0s) forwards;
}
.cloud-a {
  --at: 0.25s;
}
.cloud-b {
  --at: 0.4s;
}

.trail {
  stroke: rgb(var(--brand-text));
  stroke-width: 1.8;
  stroke-dasharray: 5 7;
}
.trail-reveal {
  stroke: #fff;
  stroke-width: 8;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 0.85s cubic-bezier(0.45, 0, 0.4, 1) 0.3s forwards;
}

/* The plane follows the same path as the trail, nose first. */
.plane {
  offset-path: path(
    "M-30 150 C60 150 90 90 150 110 C200 127 190 180 160 170 C128 160 150 100 220 105 C300 110 350 85 440 50"
  );
  offset-rotate: auto;
  offset-distance: 0%;
  animation: fly 0.85s cubic-bezier(0.45, 0, 0.4, 1) 0.3s forwards;
}
.plane-body {
  fill: rgb(var(--page));
  stroke: rgb(var(--ink));
  stroke-width: 2.5;
}
.plane-shade {
  fill: rgb(var(--brand) / 0.3);
}
@supports not (offset-path: path("M0 0")) {
  .plane {
    display: none;
  }
}

.label {
  opacity: 0;
  animation: rise 0.45s ease-out 0.45s forwards;
}

@keyframes wipe-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes wipe-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes fly {
  to {
    offset-distance: 100%;
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
