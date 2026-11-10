<template>
  <canvas
    ref="cv"
    class="fireworks pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-50 lg:opacity-100"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Fireworks launched from the antenna tip. Drawn on their own 2D canvas so the
// tower scene itself is untouched; EiffelBackground feeds the tip's screen position.

const TIP_Y = 10.05; // tower units, just above the antenna
const MAX_DPR = 2;
const GRAVITY = 90; // px/s² on sparks
const ROCKET_GRAVITY = 240;
const COLORS = [
  [249, 168, 212], // ink
  [236, 72, 153], // brand
  [251, 207, 232], // bright
  [255, 244, 250], // white-ish
];

const cv = ref(null);
let ctx = null;
let dpr = 1;
let W = 0;
let H = 0;
let raf = 0;
let last = 0;
let nextLaunch = 0;
let reduced = false;
const anchor = { x: 0, y: 0, visible: 0 };
let rockets = [];
let sparks = [];

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

function resize() {
  const c = cv.value;
  if (!c) return;
  dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  W = c.clientWidth || window.innerWidth;
  H = c.clientHeight || window.innerHeight;
  c.width = Math.round(W * dpr);
  c.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Positions are stored relative to the tip, so bursts follow the tower while scrolling.
function launch() {
  rockets.push({
    x: rand(-4, 4),
    y: 0,
    vx: rand(-18, 18),
    vy: -rand(270, 340),
    color: pick(COLORS),
  });
}

function explode(r) {
  const n = rand(100, 140) | 0;
  const ring = Math.random() < 0.3;
  const base = rand(160, 250);
  const alt = Math.random() < 0.35 ? pick(COLORS) : null;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
    const s = ring ? base : base * Math.sqrt(Math.random());
    sparks.push({
      x: r.x,
      y: r.y,
      px: r.x,
      py: r.y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0,
      ttl: rand(1.2, 2),
      size: rand(1.3, 2.4),
      color: alt && i % 2 ? alt : r.color,
    });
  }
}

function step(dt) {
  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i];
    r.px = r.x;
    r.py = r.y;
    r.vy += ROCKET_GRAVITY * dt;
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    if (r.vy > -35) {
      explode(r);
      rockets.splice(i, 1);
    }
  }
  const drag = Math.exp(-2.2 * dt);
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.life += dt;
    if (s.life >= s.ttl) {
      sparks.splice(i, 1);
      continue;
    }
    s.px = s.x;
    s.py = s.y;
    s.vx *= drag;
    s.vy = s.vy * drag + GRAVITY * dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
  }
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, W, H);
  if (!rockets.length && !sparks.length) return;
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  const ox = anchor.x;
  const oy = anchor.y;
  const vis = anchor.visible;

  for (const r of rockets) {
    const [cr, cg, cb] = r.color;
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.8 * vis})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ox + r.x, oy + r.y + 10);
    ctx.lineTo(ox + r.x, oy + r.y);
    ctx.stroke();
  }

  for (const s of sparks) {
    const t = s.life / s.ttl;
    const fade = (1 - t) * (1 - t);
    // A little twinkle near the end of the spark's life.
    const flick = t > 0.6 ? 0.6 + 0.4 * Math.random() : 1;
    const [cr, cg, cb] = s.color;
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},${fade * flick * vis})`;
    ctx.lineWidth = s.size;
    ctx.beginPath();
    ctx.moveTo(ox + s.px, oy + s.py);
    ctx.lineTo(ox + s.x + 0.01, oy + s.y);
    ctx.stroke();
  }
}

function tick(now) {
  raf = 0;
  if (document.hidden) return;
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
  last = now;

  const live = anchor.visible > 0.2;
  if (live && now >= nextLaunch) {
    launch();
    if (Math.random() < 0.25) setTimeout(launch, rand(120, 260));
    nextLaunch = now + rand(900, 2200);
  }

  step(dt);
  draw();
  if (live || rockets.length || sparks.length) raf = requestAnimationFrame(tick);
}

function kick() {
  if (reduced || raf || document.hidden || !ctx) return;
  last = performance.now();
  if (!nextLaunch || nextLaunch < last) nextLaunch = last + 400;
  raf = requestAnimationFrame(tick);
}

// Called by EiffelBackground on every scene render.
function update(scene) {
  const p = scene.projectPoint(0, TIP_Y, 0);
  anchor.x = p.x;
  anchor.y = p.y;
  anchor.visible = p.visible;
  if (p.visible > 0.2) kick();
}

function onVisibility() {
  if (!document.hidden && anchor.visible > 0.2) kick();
}

onMounted(() => {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !cv.value) return;
  ctx = cv.value.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
});

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  document.removeEventListener("visibilitychange", onVisibility);
  rockets = [];
  sparks = [];
});

defineExpose({ update });
</script>

<style scoped>
@media (min-width: 1024px) {
  .fireworks {
    /* Wider than the tower lane so big bursts aren't clipped; soft fade at the edges. */
    --edge-l: calc(50% - var(--tower-lane) * 0.85);
    --edge-r: calc(50% + var(--tower-lane) * 0.85);
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent var(--edge-l),
      #000 calc(var(--edge-l) + 120px),
      #000 calc(var(--edge-r) - 120px),
      transparent var(--edge-r)
    );
    mask-image: linear-gradient(
      90deg,
      transparent var(--edge-l),
      #000 calc(var(--edge-l) + 120px),
      #000 calc(var(--edge-r) - 120px),
      transparent var(--edge-r)
    );
  }
}
</style>
