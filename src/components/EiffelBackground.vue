<template>
  <canvas
    ref="canvas"
    class="tower-canvas pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-40 lg:opacity-100"
    aria-hidden="true"
  ></canvas>
  <svg
    ref="overlay"
    class="pointer-events-none fixed inset-0 -z-10 hidden h-full w-full lg:block"
    aria-hidden="true"
  ></svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import { CALLOUTS, calloutLabel } from "@/lib/eiffel/callouts.js";

const canvas = ref(null);
const overlay = ref(null);

let scene = null;
let idleHandle = null;
let usedIdle = false;
let observer = null;
let unmounted = false;
let offRender = null;
let reducedMotion = false;
let groups = [];
let laneWidth = 0;
const SVG_NS = "http://www.w3.org/2000/svg";
const GAP = 12;
const TEXT_PAD = 16;
const ANCHOR_INSET = 40;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function getProgress() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(1, Math.max(0, window.scrollY / max));
}

function updateProgress() {
  scene?.setProgress(getProgress());
}

function getLaneWidth() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;width:var(--tower-lane)";
  document.body.appendChild(probe);
  const w = probe.getBoundingClientRect().width;
  probe.remove();
  return w > 0 ? w : window.innerWidth * 0.28;
}

function updateStops() {
  if (!scene) return;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const stops = [];
  for (const c of CALLOUTS) {
    const el = document.querySelector(`[data-tower-anchor="${c.id}"]`);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const centerY = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
    stops.push({ p: centerY / max, y: c.y });
  }
  scene.setStops(stops);
}

function onLayoutChange() {
  laneWidth = getLaneWidth();
  updateStops();
  updateProgress();
}

function svgEl(tag, attrs, parent) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  parent.appendChild(el);
  return el;
}

function buildCallouts() {
  const svg = overlay.value;
  if (!svg) return;
  groups = CALLOUTS.map((c, i) => {
    const g = svgEl("g", { style: "display:none" }, svg);
    const path = svgEl(
      "path",
      {
        pathLength: "1",
        fill: "none",
        style:
          "stroke:rgb(var(--brand) / 0.7);stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;vector-effect:non-scaling-stroke",
      },
      g,
    );
    const dot = svgEl(
      "circle",
      { r: "3", style: "fill:rgb(var(--brand));filter:drop-shadow(0 0 4px rgb(var(--brand) / 0.9))" },
      g,
    );
    const label = svgEl(
      "text",
      { class: "font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted", fill: "currentColor" },
      g,
    );
    label.textContent = calloutLabel(i, c.y);
    return { c, g, path, dot, label, el: null };
  });
}

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function textExtent(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects()).filter((r) => r.width > 2);
  const box = el.getBoundingClientRect();
  if (!rects.length) return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
  return {
    left: Math.min(...rects.map((r) => r.left)),
    right: Math.max(...rects.map((r) => r.right)),
    top: Math.min(...rects.map((r) => r.top)),
    bottom: Math.max(...rects.map((r) => r.bottom)),
  };
}

function updateCallouts() {
  if (!scene || !groups.length) return;
  if (window.innerWidth < 1024) return;
  const W = window.innerWidth;
  const H = window.innerHeight;
  for (const grp of groups) {
    if (!grp.el || !grp.el.isConnected) {
      grp.el = document.querySelector(`[data-tower-anchor="${grp.c.id}"]`);
    }
    if (!grp.el) {
      grp.g.style.display = "none";
      continue;
    }
    const t = textExtent(grp.el);
    const cy = (t.top + t.bottom) / 2;
    const centered = Math.abs(cy - H / 2) / (H * 0.35);
    const lane = grp.el.closest(".lane-left, .lane-right");
    const laneRect = lane?.getBoundingClientRect();
    const left = lane ? lane.classList.contains("lane-left") : (t.left + t.right) / 2 < W / 2;
    const side = left ? -1 : 1;
    const a = scene.projectLevel(grp.c.y, side);
    const laneHalf = laneWidth / 2 - ANCHOR_INSET;
    a.x = Math.min(W / 2 + laneHalf, Math.max(W / 2 - laneHalf, a.x));
    const v = (1 - smoothstep(0.5, 1, centered)) * a.visible;
    if (v <= 0.01) {
      grp.g.style.display = "none";
      continue;
    }
    const ex = left
      ? (laneRect ? laneRect.right : W * 0.36) + GAP
      : (laneRect ? laneRect.left : W * 0.64) - GAP;
    let endX = left ? t.right + TEXT_PAD : t.left - TEXT_PAD;
    if (left ? endX > ex : endX < ex) endX = ex;
    grp.path.setAttribute("d", `M${a.x} ${a.y}L${ex} ${cy}L${endX} ${cy}`);
    grp.path.style.strokeDashoffset = reducedMotion ? "0" : String(1 - v);
    grp.dot.setAttribute("cx", a.x);
    grp.dot.setAttribute("cy", a.y);
    grp.dot.style.opacity = v;
    grp.labelW ||= grp.label.getComputedTextLength?.() || 96;
    const gap = Math.abs(ex - endX);
    if (gap >= grp.labelW + 12) {
      grp.label.setAttribute("x", left ? ex - 4 : ex + 4);
      grp.label.setAttribute("y", cy - 8);
      grp.label.setAttribute("text-anchor", left ? "end" : "start");
    } else {
      grp.label.setAttribute("x", left ? ex + 6 : ex - 6);
      grp.label.setAttribute("y", a.y > cy ? cy - 8 : cy + 16);
      grp.label.setAttribute("text-anchor", left ? "start" : "end");
    }
    grp.label.style.opacity = v;
    grp.g.style.display = "";
  }
}

function onResize() {
  scene?.resize();
  onLayoutChange();
}

function onVisibility() {
  if (!scene) return;
  if (document.hidden) scene.stop();
  else scene.start();
}

async function init() {
  idleHandle = null;
  if (unmounted || !canvas.value) return;
  const { createEiffelScene } = await import("@/lib/eiffel/scene.js");
  if (unmounted || !canvas.value) return;

  scene = createEiffelScene(canvas.value, {
    isMobile: window.matchMedia("(max-width: 768px)").matches,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  buildCallouts();
  offRender = scene.onRender(updateCallouts);
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  observer = new ResizeObserver(onLayoutChange);
  observer.observe(document.body);
  onLayoutChange();
  updateCallouts();
}

onMounted(() => {
  if (!hasWebGL()) return;
  if ("requestIdleCallback" in window) {
    usedIdle = true;
    idleHandle = window.requestIdleCallback(init, { timeout: 1000 });
  } else {
    idleHandle = setTimeout(init, 200);
  }
});

onUnmounted(() => {
  unmounted = true;
  if (idleHandle !== null) {
    if (usedIdle) window.cancelIdleCallback(idleHandle);
    else clearTimeout(idleHandle);
  }
  window.removeEventListener("scroll", updateProgress);
  window.removeEventListener("resize", onResize);
  document.removeEventListener("visibilitychange", onVisibility);
  observer?.disconnect();
  observer = null;
  offRender?.();
  scene?.dispose();
  scene = null;
});
</script>

<style scoped>
@media (min-width: 1024px) {
  .tower-canvas {
    --edge-l: calc(50% - var(--tower-lane) / 2);
    --edge-r: calc(50% + var(--tower-lane) / 2);
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent var(--edge-l),
      #000 calc(var(--edge-l) + 72px),
      #000 calc(var(--edge-r) - 72px),
      transparent var(--edge-r)
    );
    mask-image: linear-gradient(
      90deg,
      transparent var(--edge-l),
      #000 calc(var(--edge-l) + 72px),
      #000 calc(var(--edge-r) - 72px),
      transparent var(--edge-r)
    );
  }
}
</style>
