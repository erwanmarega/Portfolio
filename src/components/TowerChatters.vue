<template>
  <div
    ref="root"
    class="chatters pointer-events-none fixed inset-0 -z-10 hidden lg:block"
    :class="{ 'is-static': reduced }"
    style="visibility: hidden"
    aria-hidden="true"
  >
    <div v-for="(c, i) in chars" :key="i" :ref="(el) => (wraps[i] = el)" class="chatter">
      <div :ref="(el) => (bubbles[i] = el)" class="bubble" :class="`bubble-${i}`">
        <span class="ghost">{{ c.text }}</span>
        <span :ref="(el) => (typed[i] = el)" class="typed">{{ reduced ? c.text : "" }}</span>
      </div>
      <div :ref="(el) => (hops[i] = el)" class="hop">
        <svg
          :ref="(el) => (sprites[i] = el)"
          class="sprite"
          :class="{ flip: c.flip }"
          width="16"
          height="24"
          viewBox="0 0 8 12"
          shape-rendering="crispEdges"
        >
          <rect
            v-for="(r, k) in c.rects"
            :key="k"
            :x="r.x"
            :y="r.y"
            width="1"
            height="1"
            :fill="r.fill"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { gsap, prefersReducedMotion, typeText } from "@/lib/motion.js";
import { halfWidthAt } from "@/lib/eiffel/geometry.js";

const DECK_Y = 8.9;
const WORD = "hello";
const BUBBLE_W = 156;
const BUBBLE_MARGIN = 6;
const ALONG = [0.35, 0.65];

const COLORS = {
  C: "rgb(var(--brand))",
  S: "rgb(var(--ink))",
  K: "rgb(var(--page))",
  H: "rgb(var(--brand-text))",
  W: "rgb(var(--paper))",
  J: "rgb(var(--ink-muted))",
  L: "rgb(var(--surface-strong))",
  B: "rgb(var(--ink-soft))",
};

const MAPS = [
  // pink cap + hoodie
  [
    "..CCCC..",
    ".CCCCCC.",
    "..SSSS..",
    "..SSKS..",
    "..SSSS..",
    "..HHHH..",
    ".SHHHHS.",
    ".SHHHHS.",
    "..HHHH..",
    "..LLLL..",
    "..L..L..",
    ".BB..BB.",
  ],
  // paper hair + pink scarf + grey jacket
  [
    "..WWWW..",
    ".WWWWWW.",
    ".WSSSS..",
    "..SSKS..",
    "..SSSS..",
    "..CCCC..",
    ".SJJJJS.",
    ".SJJJJS.",
    "..JJJJ..",
    "..LLLL..",
    "..L..L..",
    ".BB..BB.",
  ],
];

function toRects(map) {
  const out = [];
  map.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (COLORS[ch]) out.push({ x, y, fill: COLORS[ch] });
    });
  });
  return out;
}

const chars = [
  { text: "Wow, tu as vu le nouveau portfolio d'Erwan ?", rects: toRects(MAPS[0]), flip: false },
  { text: "Oui, il est vraiment cool !", rects: toRects(MAPS[1]), flip: true },
];

const reduced = prefersReducedMotion();
const root = ref(null);
const wraps = [];
const bubbles = [];
const typed = [];
const hops = [];
const sprites = [];

let ctx = null;
let tl = null;
let idleTweens = [];
let active = false;
let shown = false;
let enabled = false;
let typedKeys = "";

function isEditable(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

function onKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (isEditable(document.activeElement) || isEditable(e.target)) {
    typedKeys = "";
    return;
  }
  if (e.key.length !== 1) return;
  typedKeys = (typedKeys + e.key.toLowerCase()).slice(-WORD.length);
  if (typedKeys === WORD) {
    typedKeys = "";
    enabled ? disable() : enable();
  }
}

function setActive(next) {
  if (next === active) return;
  active = next;
  tl?.paused(!next);
  for (const t of idleTweens) t.paused(!next);
}

function onVisibility() {
  setActive(shown && !document.hidden);
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

// Called by EiffelBackground on every scene render.
function update(scene, laneWidth) {
  const el = root.value;
  if (!enabled || !el) return;
  const w = halfWidthAt(DECK_Y);
  const pts = [
    [w, w],
    [-w, w],
    [-w, -w],
    [w, -w],
  ].map(([x, z]) => scene.projectPoint(x, DECK_Y, z));
  // Front edge = the two lowest projected corners (largest screen y).
  const [a, b] = pts
    .sort((p, q) => q.y - p.y)
    .slice(0, 2)
    .sort((p, q) => p.x - q.x);
  const edgeLen = Math.hypot(b.x - a.x, b.y - a.y);
  const sizeFade = clamp((edgeLen - 30) / 50, 0, 1);
  const v = Math.min(a.visible, b.visible) * sizeFade;
  shown = v > 0.01;
  el.style.visibility = shown ? "visible" : "hidden";
  el.style.opacity = v.toFixed(3);
  setActive(shown && !document.hidden);
  if (!shown) return;

  const cx = window.innerWidth / 2;
  const half = (laneWidth || window.innerWidth * 0.28) / 2;
  const laneL = cx - half + BUBBLE_MARGIN;
  const laneR = cx + half - BUBBLE_MARGIN - BUBBLE_W;
  ALONG.forEach((t, i) => {
    const x = Math.round(a.x + (b.x - a.x) * t);
    const y = Math.round(a.y + (b.y - a.y) * t);
    wraps[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const left = clamp(x - BUBBLE_W / 2, laneL, laneR);
    bubbles[i].style.left = `${Math.round(left - x)}px`;
    bubbles[i].style.setProperty("--tail", `${clamp(x - left - 4, 8, BUBBLE_W - 16)}px`);
  });
}

function buildTimeline() {
  const hop = (i) =>
    gsap.fromTo(
      hops[i],
      { y: 0 },
      { y: -2, duration: 0.2, ease: "steps(1)", repeat: 5, yoyo: true },
    );
  const say = (i, hold) => {
    tl.call(() => {
      typed[i].textContent = "";
    });
    tl.fromTo(
      bubbles[i],
      { autoAlpha: 0, scale: 0.6 },
      { autoAlpha: 1, scale: 1, duration: 0.2, ease: "steps(4)" },
    );
    const type = typeText(typed[i], chars[i].text);
    tl.add(type, "<0.15");
    tl.add(hop(i), "<");
    tl.to({}, { duration: hold });
  };
  tl = gsap.timeline({ repeat: -1, repeatDelay: 4, paused: true });
  tl.set(bubbles, { autoAlpha: 0 });
  say(0, 2.5);
  tl.to(bubbles[0], { autoAlpha: 0, duration: 0.2 });
  say(1, 2.5);
  tl.to(bubbles, { autoAlpha: 0, duration: 0.3 });
}

function enable() {
  if (enabled) return;
  enabled = true;
  ctx = gsap.context(() => {
    if (reduced) {
      gsap.set(bubbles, { autoAlpha: 1 });
      return;
    }
    gsap.set(bubbles, { autoAlpha: 0 });
    idleTweens = sprites.map((s, i) =>
      gsap.to(s, {
        y: -1,
        duration: 0.5 + i * 0.12,
        ease: "steps(1)",
        repeat: -1,
        yoyo: true,
        paused: true,
      }),
    );
    buildTimeline();
  });
}

// Kill every tween and hide the layer so nothing runs while disabled.
function disable() {
  if (!enabled) return;
  enabled = false;
  tl?.kill();
  ctx?.revert();
  ctx = null;
  tl = null;
  idleTweens = [];
  active = false;
  shown = false;
  if (!reduced) typed.forEach((t) => t && (t.textContent = ""));
  if (root.value) {
    root.value.style.visibility = "hidden";
    root.value.style.opacity = "0";
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  document.addEventListener("visibilitychange", onVisibility);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.removeEventListener("visibilitychange", onVisibility);
  disable();
});

defineExpose({ update });
</script>

<style scoped>
.chatter {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  will-change: transform;
}
.hop {
  position: absolute;
  left: -8px;
  bottom: 0;
}
.sprite {
  display: block;
}
.sprite.flip {
  transform: scaleX(-1);
}
.bubble {
  position: absolute;
  bottom: 30px;
  width: 156px;
  box-sizing: border-box;
  padding: 5px 7px;
  border: 1px solid rgb(var(--paper));
  background: rgb(var(--page));
  color: rgb(var(--paper));
  font-family: "Geist Mono", ui-monospace, monospace;
  font-size: 11px;
  line-height: 14px;
  transform-origin: var(--tail, 50%) 100%;
  position: absolute;
}
.bubble::after {
  content: "";
  position: absolute;
  left: var(--tail, 50%);
  bottom: -5px;
  width: 7px;
  height: 7px;
  box-sizing: border-box;
  background: rgb(var(--page));
  border-right: 1px solid rgb(var(--paper));
  border-bottom: 1px solid rgb(var(--paper));
  transform: rotate(45deg);
}
.ghost {
  visibility: hidden;
  display: block;
}
.typed {
  position: absolute;
  inset: 5px 7px;
}
/* Reduced motion: both bubbles shown, the second one stacked above the first. */
.is-static .bubble-1 {
  bottom: 96px;
}
</style>
