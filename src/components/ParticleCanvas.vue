<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0 z-0 h-full w-full"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let rafId = null;
let ctx = null;
let particles = [];
let width = 0;
let height = 0;

const PARTICLE_COUNT = 35;
const CONNECTION_DISTANCE = 100;
const MAX_CONNECTIONS = 3;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.15 + 0.05;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100, 100, 120, ${this.alpha})`;
    ctx.fill();
  }
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.value.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  canvas.value.width = width * dpr;
  canvas.value.height = height * dpr;
  ctx = canvas.value.getContext("2d");
  ctx.scale(dpr, dpr);
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    let connections = 0;
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(150, 150, 170, ${0.08 * (1 - dist / CONNECTION_DISTANCE)})`;
        ctx.stroke();
        connections++;
        if (connections >= MAX_CONNECTIONS) break;
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  drawConnections();

  rafId = requestAnimationFrame(animate);
}

onMounted(() => {
  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  animate();

  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  window.removeEventListener("resize", resize);
  particles = [];
});
</script>
