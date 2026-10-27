<template>
  <canvas
    ref="canvasEl"
    class="pointer-events-none absolute inset-0 z-0 h-full w-full"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { applySharkMask, clearSharkMask } from "../composables/useSharkMask";
import {
  CELL, FRAME_MS, MAX_DT, createWorld, resizeWorld, clearWorld, createShark, updateShark,
  buildSpine, rasterize, buildAtlas, drawCells, isSolid, translateShark,
} from "../lib/sharkEngine";
import { chase, registerHero } from "../lib/sharkChase";

const canvasEl = ref(null);
let canvas = null;
let ctx = null;
let rafId = null;

const world = createWorld();

function resize() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  resizeWorld(world, rect.width, rect.height);
}

function populate() {
  const count = world.W < 640 ? 2 : 3;
  world.sharks.length = 0;
  for (let i = 0; i < count; i++) world.sharks.push(createShark(world, i, count));
  if (chase.shark) world.sharks.pop();
  world.sharks.forEach(buildSpine);
}

function detachShark() {
  if (world.sharks.length < 2) return null;
  const rect = canvas.getBoundingClientRect();
  let best = 0;
  world.sharks.forEach((s, i) => { if (s.y > world.sharks[best].y) best = i; });
  const [s] = world.sharks.splice(best, 1);
  translateShark(s, rect.left, rect.top);
  return s;
}

function attachShark(s) {
  const rect = canvas.getBoundingClientRect();
  translateShark(s, -rect.left, -rect.top);
  world.sharks.push(s);
}

function draw(t) {
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, world.W, world.H);
  drawCells(ctx, world, t, null, true);
}

const solid = (idx) => isSolid(world, idx);

let last = performance.now();
let inView = true;
let pageVisible = true;
let observer = null;

function loop(now) {
  rafId = requestAnimationFrame(loop);
  const elapsed = now - last;
  if (elapsed < FRAME_MS - 4) return;
  const dt = Math.min(elapsed / 1000, MAX_DT);
  last = now;
  clearWorld(world);
  for (const s of world.sharks) updateShark(s, dt, world);
  for (const s of [...world.sharks].sort((a, b) => a.depth - b.depth)) rasterize(s, world);
  draw(now / 1000);
  applySharkMask({ canvasRect: canvas.getBoundingClientRect(), cell: CELL, cols: world.cols, rows: world.rows, isSolid: solid });
}

function start() {
  if (rafId !== null || !inView || !pageVisible) return;
  last = performance.now();
  rafId = requestAnimationFrame(loop);
}

function stop() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}

function onVisibility() {
  pageVisible = !document.hidden;
  if (pageVisible) start(); else stop();
}

function onResize() {
  resize();
  populate();
}

function onPointerMove(e) {
  const rect = canvas.getBoundingClientRect();
  world.mouse.x = e.clientX - rect.left;
  world.mouse.y = e.clientY - rect.top;
}

function onPointerLeave() {
  world.mouse.x = world.mouse.y = -9999;
}

onMounted(() => {
  canvas = canvasEl.value;
  ctx = canvas.getContext("2d");
  buildAtlas();
  resize();
  populate();
  registerHero({ detach: detachShark, attach: attachShark });

  observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) start(); else stop();
  });
  observer.observe(canvas);
  document.addEventListener("visibilitychange", onVisibility);

  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerleave", onPointerLeave);
});

onUnmounted(() => {
  stop();
  observer?.disconnect();
  observer = null;
  registerHero(null);
  document.removeEventListener("visibilitychange", onVisibility);
  clearSharkMask();
  window.removeEventListener("resize", onResize);
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerleave", onPointerLeave);
  world.sharks.length = 0;
});
</script>
