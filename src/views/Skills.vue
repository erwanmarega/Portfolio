<template>
  <section
    ref="el"
    aria-labelledby="skills-title"
    class="skills w-full py-16 sm:py-24"
  >
    <header class="lane-grid gap-y-8 pb-12 sm:pb-16">
      <div class="lane-left">
        <p
          v-reveal
          class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60"
        >
          <span class="h-px w-8 bg-brand-text" aria-hidden="true" />
          03 — Stack technique
        </p>
        <h1
          id="skills-title"
          v-reveal="80"
          data-tower-anchor="skills"
          class="mt-6 text-5xl sm:text-6xl xl:text-7xl font-bold tracking-[-0.04em] leading-[0.95] text-paper"
        >
          Du socle <span class="text-ink">au sommet.</span>
        </h1>
        <p
          v-reveal="160"
          class="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-paper/70"
        >
          Les technologies et outils que j'utilise pour concevoir, développer et
          déployer des applications web, couche par couche.
        </p>
      </div>

      <dl v-reveal="240" class="lane-right flex items-end justify-start gap-10 lg:justify-end">
        <div class="flex flex-col-reverse items-start gap-2 lg:items-end">
          <dt class="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
            Technologies
          </dt>
          <dd class="stat-num">{{ pad(techCount) }}</dd>
        </div>
        <div class="flex flex-col-reverse items-start gap-2 lg:items-end">
          <dt class="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
            Couches
          </dt>
          <dd class="stat-num">{{ pad(layers.length) }}</dd>
        </div>
      </dl>
    </header>

    <ol
      ref="listEl"
      class="layers border-t border-paper/10"
      :class="{ 'is-dimmed': hovered !== null }"
      @mouseleave="setHovered(null)"
    >
      <li
        v-for="(layer, i) in layers"
        :key="layer.code"
        :ref="(r) => (rowEls[i] = r)"
        :data-index="i"
        class="layer lane-grid gap-y-6 border-b border-paper/10 py-10 lg:items-center lg:py-12"
        :class="{ 'is-active': active[i], 'is-hovered': hovered === i }"
        @mouseenter="setHovered(i)"
        @focusin="setHovered(i)"
        @focusout="onFocusOut($event)"
      >
        <div class="lane-left">
          <p
            v-reveal
            class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <span class="text-brand-text">{{ layer.meters }} M</span>
            <span class="h-px w-4 bg-paper/25" aria-hidden="true" />
            <span class="text-paper/60">{{ layer.floor }}</span>
          </p>
          <h2
            v-reveal="40"
            class="mt-3 text-3xl xl:text-4xl font-bold tracking-[-0.03em] text-paper"
          >
            {{ layer.title }}
          </h2>
          <p v-reveal="80" class="mt-3 text-sm sm:text-base text-paper/70">
            {{ layer.subtitle }}
          </p>
          <ul v-reveal="120" class="mt-5 flex flex-wrap gap-1.5" aria-label="Pratiques">
            <li
              v-for="detail in layer.details"
              :key="detail"
              class="rounded-full border border-paper/15 px-2.5 py-0.5 font-mono text-[11px] text-paper/60"
            >
              {{ detail }}
            </li>
          </ul>
        </div>

        <div class="connector hidden lg:block lg:col-start-2 lg:row-start-1 self-stretch" aria-hidden="true">
          <span class="connector-line" />
          <span class="connector-dot" />
        </div>

        <div class="lane-right lg:pl-5">
          <ul class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" :aria-label="`Technologies ${layer.title}`">
            <li
              v-for="(tech, j) in layer.technologies"
              :key="tech"
              v-reveal="120 + j * 40"
            >
              <div class="tile">
                <span class="font-mono text-[10px] tracking-[0.18em] text-paper/45">
                  {{ layer.code }}.{{ pad(j + 1) }}
                </span>
                <span class="mt-3 block text-[15px] font-semibold text-paper">{{ tech }}</span>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ol>

    <Teleport to="body">
      <div
        class="altimeter hidden lg:flex"
        :class="{ 'is-visible': altVisible }"
        aria-hidden="true"
      >
        <span class="text-paper/45">ALT</span>
        <span ref="altEl" class="text-brand-text">330 M</span>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { vReveal } from "@/directives/reveal.js";
import { setTowerHighlight } from "@/lib/eiffel/bus.js";

// `y` is the floor height in tower units (see lib/eiffel/geometry.js).
const layers = [
  {
    code: "IA",
    title: "IA",
    meters: 330,
    floor: "Antenne",
    y: 10,
    subtitle: "Développement assisté : je délègue, je vérifie, je livre plus vite.",
    details: ["Agents", "Prompt engineering", "Code review IA"],
    technologies: ["Claude", "Codex", "Cursor"],
  },
  {
    code: "FE",
    title: "Front-end",
    meters: 276,
    floor: "Sommet",
    y: 8.9,
    subtitle: "Interfaces modernes, rapides et soignées.",
    details: ["Responsive", "SPA", "SSR", "Animations"],
    technologies: ["Vue.js", "React", "TypeScript", "Tailwind"],
  },
  {
    code: "BE",
    title: "Back-end",
    meters: 115,
    floor: "2e étage",
    y: 3.8,
    subtitle: "Serveurs, APIs et bases de données.",
    details: ["REST API", "GraphQL", "SQL"],
    technologies: ["Node.js", "Symfony", "MySQL", "Supabase"],
  },
  {
    code: "DA",
    title: "Data",
    meters: 57,
    floor: "1er étage",
    y: 1.8,
    subtitle: "Analyse, tableaux de bord et BI.",
    details: ["Dashboards", "Data viz", "ETL"],
    technologies: ["Power BI", "Excel"],
  },
  {
    code: "OP",
    title: "DevOps & outils",
    meters: 0,
    floor: "Socle",
    y: 0.4,
    subtitle: "Versionner, conteneuriser, déployer.",
    details: ["CI/CD", "Déploiement", "Code review", "Testing"],
    technologies: ["Git", "GitHub", "GitLab", "Docker", "Railway"],
  },
];

const techCount = layers.reduce((n, l) => n + l.technologies.length, 0);
const pad = (n) => String(n).padStart(2, "0");

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const el = ref(null);
const listEl = ref(null);
const altEl = ref(null);
const rowEls = [];
const active = ref(layers.map(() => reduced));
const hovered = ref(null);
const altVisible = ref(false);

let lastMeters = -1;
let frame = 0;
let rowObserver = null;
let altObserver = null;

function activate(i) {
  if (!active.value[i]) active.value[i] = true;
}

// Altimeter: interpolates between the rows' altitudes based on which row sits at mid-screen.
function updateAltimeter() {
  frame = 0;
  if (!altEl.value) return;
  const mid = window.innerHeight / 2;
  const pts = rowEls
    .filter(Boolean)
    .map((r, i) => {
      const b = r.getBoundingClientRect();
      return [b.top + b.height / 2, layers[i].meters];
    });
  if (!pts.length) return;
  let m = pts[0][1];
  if (mid >= pts[pts.length - 1][0]) m = pts[pts.length - 1][1];
  else if (mid > pts[0][0]) {
    for (let i = 1; i < pts.length; i++) {
      const [y0, m0] = pts[i - 1];
      const [y1, m1] = pts[i];
      if (mid <= y1) {
        m = m0 + ((m1 - m0) * (mid - y0)) / (y1 - y0);
        break;
      }
    }
  }
  const rounded = Math.round(m);
  if (rounded === lastMeters) return;
  lastMeters = rounded;
  altEl.value.textContent = `${String(rounded).padStart(3, "0")} M`;
}

function onScroll() {
  if (altVisible.value && !frame) frame = requestAnimationFrame(updateAltimeter);
}

function setHovered(i) {
  if (hovered.value === i) return;
  hovered.value = i;
  setTowerHighlight(i === null ? null : layers[i].y);
}

function onFocusOut(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null);
}

onMounted(() => {
  if (!reduced) {
    // A floor lights up when its row reaches the middle band of the viewport.
    rowObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number(entry.target.dataset.index);
          // Also covers a fast scroll / anchor jump past the row.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) activate(i);
        }
      },
      { rootMargin: "-25% 0px -25% 0px" }
    );
    rowEls.forEach((r) => r && rowObserver.observe(r));
  }

  altObserver = new IntersectionObserver(
    ([entry]) => {
      altVisible.value = entry.isIntersecting;
      if (entry.isIntersecting) updateAltimeter();
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );
  if (listEl.value) altObserver.observe(listEl.value);
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  rowObserver?.disconnect();
  altObserver?.disconnect();
  window.removeEventListener("scroll", onScroll);
  if (frame) cancelAnimationFrame(frame);
  setTowerHighlight(null);
});
</script>

<style scoped>
.stat-num {
  font-family: "Geist Mono", ui-monospace, monospace;
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgb(var(--paper) / 0.6);
  font-variant-numeric: tabular-nums;
}

/* Hover: the other layers step back. */
.layer {
  transition: opacity 300ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.layers.is-dimmed .layer:not(.is-hovered) {
  opacity: 0.4;
}

.tile {
  height: 100%;
  border-radius: 6px;
  border: 1px solid rgb(var(--paper) / 0.1);
  background: rgb(var(--paper) / 0.03);
  padding: 0.75rem 0.875rem;
  transition:
    border-color 300ms cubic-bezier(0.2, 0.7, 0.2, 1),
    background-color 300ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.layer.is-hovered .tile {
  border-color: rgb(var(--brand-text) / 0.6);
  background: rgb(var(--brand) / 0.06);
}

/* Connector: dot on the tower axis, dashed line drawn outward from it. */
.connector {
  position: relative;
  min-height: 1px;
}
.connector-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 0;
  border-top: 1px dashed rgb(var(--brand-text) / 0.45);
  transform: scaleX(0);
  transform-origin: 50% 50%;
  transition: transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.connector-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 9px;
  height: 9px;
  margin: -4.5px 0 0 -4.5px;
  border-radius: 9999px;
  border: 1px solid rgb(var(--paper) / 0.25);
  background: rgb(var(--page));
  transition:
    background-color 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;
}
.layer.is-active .connector-line {
  transform: scaleX(1);
}
.layer.is-active .connector-dot {
  border-color: rgb(var(--ink));
  background: rgb(var(--ink));
  box-shadow:
    0 0 0 4px rgb(var(--ink) / 0.15),
    0 0 12px rgb(var(--brand) / 0.7);
}
.layer.is-active.is-hovered .connector-dot {
  box-shadow:
    0 0 0 6px rgb(var(--ink) / 0.2),
    0 0 20px rgb(var(--brand) / 0.95);
}
.layer.is-hovered .connector-line {
  border-top-color: rgb(var(--brand-text) / 0.8);
}

.altimeter {
  position: fixed;
  top: 50%;
  left: calc(50% + 18px);
  z-index: 1;
  gap: 0.5rem;
  transform: translateY(calc(-100% - 10px));
  font-family: "Geist Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms ease;
}
.altimeter.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .layer,
  .tile,
  .connector-line,
  .connector-dot,
  .altimeter {
    transition: none;
  }
}
</style>
