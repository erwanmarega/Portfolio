<template>
  <div class="relative w-full h-full overflow-hidden bg-[#8B2E1F]">
    <canvas
      ref="canvas"
      class="absolute inset-0 w-full h-full"
    />
    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 pointer-events-none"
    >
      <slot>
        <h2 class="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Be Real<span class="text-white/60">*</span>
        </h2>
        <h2 class="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Be Creative<span class="text-white/60">#</span>
        </h2>
        <h2 class="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Be Bold<span class="text-white/60">™</span>
        </h2>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let rafId = null;
let ctx = null;
let width = 0;
let height = 0;
let cols = 0;
let rows = 0;
let time = 0;

const CHARS = ["$", "@", "#", "*", "+", "^", "-", "=", "~", "&", "%", "!"];
const BRIGHT_CHARS = ["@", "#", "$", "*", "%", "&"];
const FONT_SIZE = 16;
const GAP = 20;

let grid = [];
let mouse = { x: -1000, y: -1000, active: false };
const CURSOR_RADIUS = 140;
const LERP_FACTOR = 0.12;

const initGrid = () => {
  grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        baseX: x * GAP + GAP / 2,
        baseY: y * GAP + GAP / 2,
        x: x * GAP + GAP / 2,
        y: y * GAP + GAP / 2,
        phase: Math.random() * Math.PI * 2,
        currentBrightness: 0.3,
        targetBrightness: 0.3,
        currentScale: 1,
        targetScale: 1,
        changeTimer: Math.random() * 100,
      });
    }
    grid.push(row);
  }
};

const resize = () => {
  if (!canvas.value) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.value.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  canvas.value.width = width * dpr;
  canvas.value.height = height * dpr;
  ctx = canvas.value.getContext("2d");
  ctx.scale(dpr, dpr);

  cols = Math.ceil(width / GAP);
  rows = Math.ceil(height / GAP);
  initGrid();
};

const lerp = (start, end, factor) => start + (end - start) * factor;

const draw = () => {
  ctx.clearRect(0, 0, width, height);
  ctx.font = `${FONT_SIZE}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.min(width, height) * 0.45;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];

      const dx = cell.baseX - cx;
      const dy = cell.baseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Vagues fluides superposées
      const waveX = cell.baseX * 0.012;
      const waveY = cell.baseY * 0.012;
      const t = time * 1.2;

      const wave1 = Math.sin(waveX + t);
      const wave2 = Math.sin(waveY + t * 0.8 + Math.PI / 3);
      const wave3 = Math.sin((waveX + waveY) * 0.7 + t * 0.6);
      const combinedWave = (wave1 + wave2 + wave3) / 3;

      // Effet centre
      const centerFactor = Math.max(0, 1 - dist / maxDist);
      const offsetX = (dx / dist) * centerFactor * 12 || 0;
      const offsetY = (dy / dist) * centerFactor * 12 || 0;

      // Mouvement ondulant fluide
      const waveOffsetX = combinedWave * 6 + Math.cos(waveY * 1.5 + t) * 4;
      const waveOffsetY =
        Math.sin(waveX * 1.3 + t) * 8 + combinedWave * 4;

      cell.x = lerp(
        cell.x,
        cell.baseX + offsetX + waveOffsetX,
        0.08
      );
      cell.y = lerp(
        cell.y,
        cell.baseY + offsetY + waveOffsetY,
        0.08
      );

      // Effet curseur
      const mdx = cell.baseX - mouse.x;
      const mdy = cell.baseY - mouse.y;
      const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
      const cursorFactor = mouse.active
        ? Math.max(0, 1 - mouseDist / CURSOR_RADIUS)
        : 0;
      const cursorGlow = cursorFactor * 1.1;

      // Valeurs cibles basées sur les vagues
      const baseBrightness =
        0.28 + centerFactor * 0.5 + combinedWave * 0.18;
      cell.targetBrightness = baseBrightness + cursorGlow;
      cell.targetScale = 1 + cursorFactor * 0.5 + Math.abs(combinedWave) * 0.08;

      // Interpolation fluide
      cell.currentBrightness = lerp(
        cell.currentBrightness,
        cell.targetBrightness,
        LERP_FACTOR
      );
      cell.currentScale = lerp(cell.currentScale, cell.targetScale, LERP_FACTOR);

      const brightness = cell.currentBrightness;
      const r = Math.floor(255 * Math.min(1, brightness * 1.15));
      const g = Math.floor(220 * Math.min(1, brightness * 0.95));
      const b = Math.floor(180 * Math.min(1, brightness * 0.85));
      const alpha =
        0.25 +
        centerFactor * 0.45 +
        Math.abs(combinedWave) * 0.15 +
        cursorFactor * 0.7;

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.12, Math.min(1, alpha))})`;

      ctx.save();
      ctx.translate(cell.x, cell.y);
      ctx.scale(cell.currentScale, cell.currentScale);
      ctx.fillText(cell.char, 0, 0);
      ctx.restore();

      // Changement de caractère progressif
      cell.changeTimer += 1;
      if (cell.changeTimer > 120 + Math.random() * 180) {
        cell.changeTimer = 0;
        if (cursorFactor > 0.5) {
          cell.char = BRIGHT_CHARS[Math.floor(Math.random() * BRIGHT_CHARS.length)];
        } else {
          cell.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
    }
  }
};

const animate = () => {
  time += 0.01;
  draw();
  rafId = requestAnimationFrame(animate);
};

const handleMouseMove = (e) => {
  const rect = canvas.value.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouse.active = true;
};

const handleMouseLeave = () => {
  mouse.active = false;
};

onMounted(() => {
  resize();
  animate();
  window.addEventListener("resize", resize);
  canvas.value.addEventListener("mousemove", handleMouseMove);
  canvas.value.addEventListener("mouseleave", handleMouseLeave);
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  window.removeEventListener("resize", resize);
  if (canvas.value) {
    canvas.value.removeEventListener("mousemove", handleMouseMove);
    canvas.value.removeEventListener("mouseleave", handleMouseLeave);
  }
});
</script>
