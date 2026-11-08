<template>
  <component :is="tag" ref="root">
    <span class="relative inline-block">
      <span
        ref="textEl"
        class="inline-block transition-opacity duration-500"
        :class="[ready ? 'opacity-100' : 'opacity-0', { glitching: glitchText }]"
        aria-hidden="true"
        >{{ glitchText || text }}</span
      ><span class="sr-only">{{ text }}</span>
      <span
        v-if="showDecode"
        class="absolute inset-x-0 -inset-y-[0.25em] pointer-events-none transition-opacity duration-500"
        :class="ready ? 'opacity-0' : 'opacity-100'"
        aria-hidden="true"
      >
        <AsciiEffect effect="decode" :options="decodeOptions" @done="reveal" />
      </span>
    </span>
    <slot />
  </component>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AsciiEffect from "./AsciiEffect.vue";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: "span" },
  start: { type: Boolean, default: null },
  duration: { type: Number, default: 2 },
  delay: { type: Number, default: 0 },
  idleGlitch: { type: Boolean, default: false },
});
const emit = defineEmits(["done"]);

const root = ref(null);
const textEl = ref(null);
const showDecode = ref(false);
const ready = ref(false);
const decodeOptions = ref({});

let started = false;
let trigger = null;
let delayTimer = null;
let safetyTimer = null;
let removeTimer = null;
let glitchRaf = 0;
let idleTimer = null;
let idleObserver = null;
let onScreen = false;

const GLYPHS = "!<>-_\\/[]{}=+*^?#%&$@";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const glitchText = ref("");

const glitch = (duration = 450) => {
  if (!ready.value || reducedMotion || glitchRaf) return;
  const el = textEl.value;
  if (el) el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  const chars = [...props.text];
  const settleAt = chars.map(
    (_, i) => (i / chars.length) * duration * 0.7 + Math.random() * duration * 0.3,
  );
  const t0 = performance.now();
  const tick = (now) => {
    const t = now - t0;
    if (t >= duration) {
      glitchText.value = "";
      glitchRaf = 0;
      if (el) el.style.minWidth = "";
      return;
    }
    glitchText.value = chars
      .map((c, i) =>
        c === " " || t >= settleAt[i] ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      )
      .join("");
    glitchRaf = requestAnimationFrame(tick);
  };
  glitchRaf = requestAnimationFrame(tick);
};

defineExpose({ glitch });

const reveal = () => {
  if (ready.value) return;
  ready.value = true;
  clearTimeout(safetyTimer);
  emit("done");
  removeTimer = setTimeout(() => {
    showDecode.value = false;
  }, 600);
  if (props.idleGlitch) startIdleGlitch();
};

const scheduleIdleGlitch = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(
    () => {
      if (onScreen && !document.hidden) glitch(550);
      scheduleIdleGlitch();
    },
    4000 + Math.random() * 5000,
  );
};

const startIdleGlitch = () => {
  if (reducedMotion || idleObserver || !root.value) return;
  idleObserver = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
  });
  idleObserver.observe(root.value);
  scheduleIdleGlitch();
};

const begin = () => {
  if (started) return;
  started = true;
  safetyTimer = setTimeout(reveal, (props.duration + props.delay + 2) * 1000);

  delayTimer = setTimeout(() => {
    const el = textEl.value;
    if (!el) return;
    const cs = getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize) || 16;
    const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.2;
    if (el.getBoundingClientRect().height > lineHeight * 1.5) {
      reveal();
      return;
    }
    decodeOptions.value = {
      text: props.text,
      font: `${cs.fontWeight} {size}px ${cs.fontFamily}`,
      fs: Math.min(8, Math.max(3, Math.round(fontSize / 10))),
      loop: false,
      duration: props.duration,
    };
    showDecode.value = true;
  }, props.delay * 1000);
};

watch(
  () => props.start,
  (v) => {
    if (v) begin();
  },
);

onMounted(() => {
  if (props.start === null) {
    trigger = ScrollTrigger.create({
      trigger: root.value,
      start: "top 85%",
      once: true,
      onEnter: begin,
    });
  } else if (props.start) {
    begin();
  }
});

onUnmounted(() => {
  trigger?.kill();
  clearTimeout(delayTimer);
  clearTimeout(safetyTimer);
  clearTimeout(removeTimer);
  cancelAnimationFrame(glitchRaf);
  clearTimeout(idleTimer);
  idleObserver?.disconnect();
});
</script>

<style scoped>
.glitching {
  animation: glitch-jitter 0.12s steps(2) infinite;
  text-shadow:
    2px 0 rgb(var(--ink) / 0.8),
    -2px 0 rgb(255 255 255 / 0.35);
}

@keyframes glitch-jitter {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-2px, 1px);
  }
  100% {
    transform: translate(2px, -1px);
  }
}
</style>
