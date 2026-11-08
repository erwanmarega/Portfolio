<template>
  <div ref="root" class="blueprint-frame" aria-label="Cadre de navigation">
    <div class="frame-box">
      <span
        v-for="corner in corners"
        :key="corner"
        :class="corner"
        class="corner-mark absolute z-30 h-2.5 w-2.5 border border-brand-text"
        aria-hidden="true"
      />

      <div
        class="absolute inset-y-0 left-1/2 z-0 hidden w-px -translate-x-1/2 bg-line/10 lg:block"
        :style="{ top: 'var(--bar-h)', bottom: 'var(--foot-h)' }"
        aria-hidden="true"
      />

      <header
        class="pointer-events-auto absolute inset-x-0 top-0 z-20 flex items-stretch border-b border-line/15 bg-page"
        :style="{ height: 'var(--bar-h)' }"
      >
        <span
          class="hair hair-top pointer-events-none absolute inset-x-0 -bottom-px h-px origin-center bg-line/15 opacity-0"
          aria-hidden="true"
        />
        <span
          ref="progress"
          class="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-px origin-left bg-brand-text"
          style="transform: scaleX(0)"
          aria-hidden="true"
        />
        <a
          href="#home"
          class="flex min-w-0 items-center gap-2 border-r border-line/15 px-4 font-mono text-sm outline-none transition-colors hover:bg-line/5 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-brand-text sm:px-7"
        >
          <span class="text-brand-text">~/</span>
          <span class="truncate font-sans font-bold text-paper">erwan-marega</span>
        </a>

        <nav aria-label="Navigation principale" class="hidden items-center lg:flex">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :aria-current="activeId === link.id ? 'true' : undefined"
            class="nav-link group px-5 py-2 font-mono text-[13px] outline-none transition-colors hover:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-text motion-reduce:transition-none xl:px-6"
            :class="activeId === link.id ? 'text-paper' : 'text-ink-muted'"
          >
            <span
              class="transition-colors group-hover:text-brand-text motion-reduce:transition-none"
              :class="activeId === link.id ? 'text-brand-text' : ''"
              >/</span
            >{{ link.label }}
          </a>
        </nav>

        <div class="ml-auto flex items-stretch">
          <a
            href="https://github.com/erwanmarega"
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-11 items-center justify-center border-l border-line/15 text-ink-soft outline-none transition-colors hover:bg-line/5 hover:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-brand-text sm:w-[62px]"
            aria-label="GitHub"
          >
            <font-awesome-icon :icon="['fab', 'github']" class="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/erwanmarega"
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-11 items-center justify-center border-l border-line/15 text-ink-soft outline-none transition-colors hover:bg-line/5 hover:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-brand-text sm:w-[62px]"
            aria-label="LinkedIn"
          >
            <font-awesome-icon :icon="['fab', 'linkedin-in']" class="h-4 w-4" />
          </a>
          <a
            href="#contact"
            class="flex items-center bg-ink px-4 text-xs font-semibold text-page outline-none transition-colors hover:bg-ink-soft focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-page sm:px-7 sm:text-sm"
          >
            Me contacter
          </a>
        </div>
      </header>

      <nav
        aria-label="Sections"
        class="rail rail-left"
        :style="{ top: 'var(--bar-h)', bottom: 'var(--foot-h)' }"
      >
        <div
          class="flex min-h-0 flex-1 flex-col items-center gap-[clamp(2px,1.2vh,14px)] pt-[clamp(8px,3vh,32px)]"
        >
          <a
            v-for="(item, i) in railLinks"
            :key="item.id"
            :href="`#${item.id}`"
            :aria-label="item.label"
            :aria-current="activeId === item.id ? 'true' : undefined"
            class="rail-num pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center border font-mono text-[11px] tracking-wider outline-none transition-colors duration-300 hover:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-brand-text motion-reduce:transition-none"
            :class="
              activeId === item.id
                ? 'border-brand-text text-brand-text'
                : 'border-transparent text-ink-muted'
            "
          >
            {{ String(i + 1).padStart(2, "0") }}
          </a>
        </div>
        <span
          class="shrink-0 pb-5 pt-3 rotate-180 font-mono text-[10px] tracking-[0.2em] text-ink-muted [writing-mode:vertical-rl]"
          aria-hidden="true"
        >
          SCROLL →
        </span>
      </nav>

      <div
        class="rail rail-right"
        :style="{ top: 'var(--bar-h)', bottom: 'var(--foot-h)' }"
        role="img"
        aria-label="Altitude sur la tour Eiffel"
      >
        <div class="ruler">
          <template v-for="m in ticks" :key="m">
            <span
              class="tick absolute left-0 h-px origin-left bg-line/30"
              :class="m % 50 === 0 ? 'w-3' : 'w-1.5'"
              :style="{ top: `${100 - (m / 330) * 100}%` }"
            />
            <span
              v-if="m % 50 === 0"
              class="tick-label absolute left-4 -translate-y-1/2 font-mono text-[9px] leading-none text-ink-muted/70"
              :style="{ top: `${100 - (m / 330) * 100}%` }"
              >{{ m }}</span
            >
          </template>
          <div ref="marker" class="marker" :style="{ top: '0%' }">
            <span class="h-px w-5 bg-brand-text" />
            <span ref="markerLabel" class="marker-label">330 m</span>
          </div>
        </div>
      </div>

      <footer
        class="pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-line/15 bg-page px-4 font-mono text-[11px] text-ink-muted lg:px-7"
        :style="{ height: 'var(--foot-h)' }"
      >
        <span
          class="hair hair-bottom pointer-events-none absolute inset-x-0 -top-px h-px origin-center bg-line/15 opacity-0"
          aria-hidden="true"
        />
        <span>48.8584° N / 2.2945° E</span>
        <span class="hidden md:inline">Three.js · particules · scroll-driven</span>
        <span>© 2026 Erwan Marega</span>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { gsap, prefersReducedMotion, onSiteReady } from "@/lib/motion.js";
import { CALLOUTS, METERS_PER_UNIT } from "@/lib/eiffel/callouts.js";
import { computeStops, normalizeStops, levelAt } from "@/lib/eiffel/stops.js";

library.add(faGithub, faLinkedinIn);

const MAX_ALTITUDE = 330;

const corners = [
  "-left-[5.5px] -top-[5.5px]",
  "-right-[5.5px] -top-[5.5px]",
  "-bottom-[5.5px] -left-[5.5px]",
  "-bottom-[5.5px] -right-[5.5px]",
];

const navLinks = [
  { id: "projects", href: "#projects", label: "projets" },
  { id: "journey", href: "#journey", label: "parcours" },
  { id: "skills", href: "#skills", label: "stack" },

  { id: "contact", href: "#contact", label: "contact" },
];

const railLinks = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "journey", label: "Parcours" },
  { id: "skills", label: "Compétences" },
  { id: "tech-watch", label: "Veille" },
  { id: "projects", label: "Projets" },
  { id: "contact", label: "Contact" },
];

const ticks = Array.from({ length: MAX_ALTITUDE / 10 + 1 }, (_, i) => i * 10);

const activeId = ref(CALLOUTS[0].id);
const root = ref(null);
const progress = ref(null);
const marker = ref(null);
const markerLabel = ref(null);

let rawStops = [];
let levelStops = [];
let maxScroll = 1;
let frame = 0;
let observer = null;
let lastMeters = -1;
let ctx = null;
let offReady = () => {};

function setupIntro() {
  const q = (sel) => root.value.querySelectorAll(sel);
  const header = root.value.querySelector("header");
  const footer = root.value.querySelector("footer");
  const hairs = q(".hair");
  const ticks = q(".tick");

  ctx = gsap.context(() => {
    // Hairlines are drawn by spans during the intro; hide the real borders meanwhile.
    gsap.set(header, { borderBottomColor: "transparent" });
    gsap.set(footer, { borderTopColor: "transparent" });
    gsap.set(hairs, { opacity: 1 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set(hairs, { opacity: 0, clearProps: "transform" });
        gsap.set([header, footer], { clearProps: "borderBottomColor,borderTopColor" });
      },
    });

    tl.from(
      q(".corner-mark"),
      {
        x: (i, t) => {
          const r = t.getBoundingClientRect();
          return i % 2 === 0 ? -r.left : window.innerWidth - r.right;
        },
        y: (i, t) => {
          const r = t.getBoundingClientRect();
          return i < 2 ? -r.top : window.innerHeight - r.bottom;
        },
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        clearProps: "transform,opacity",
      },
      0,
    )
      .from(hairs, { scaleX: 0, duration: 0.9, ease: "power2.inOut" }, 0.1)
      .from(
        q(".rail-num"),
        { opacity: 0, x: -10, duration: 0.45, stagger: 0.05, clearProps: "transform,opacity" },
        0.3,
      )
      .from(
        ticks,
        {
          scaleX: 0,
          duration: 0.4,
          stagger: { each: 0.012, from: "end" },
          clearProps: "transform",
        },
        0.3,
      )
      .from(
        [...q(".tick-label"), marker.value],
        { opacity: 0, duration: 0.5, clearProps: "opacity" },
        0.7,
      )
      .from(
        q(".nav-link"),
        { opacity: 0, y: -6, duration: 0.45, stagger: 0.07, clearProps: "transform,opacity" },
        0.45,
      );

    offReady = onSiteReady(() => tl.play());
  }, root.value);
}

function measure() {
  rawStops = computeStops();
  levelStops = normalizeStops(rawStops);
  maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

function update() {
  frame = 0;
  const y = window.scrollY;
  let best = null;
  let bestDist = Infinity;
  for (const s of rawStops) {
    const d = Math.abs(s.p * maxScroll - y);
    if (d < bestDist) {
      bestDist = d;
      best = s.id;
    }
  }
  if (best && best !== activeId.value) activeId.value = best;

  const p = Math.min(1, Math.max(0, y / maxScroll));
  if (progress.value) progress.value.style.transform = `scaleX(${p})`;

  if (!marker.value) return;
  const meters = Math.min(MAX_ALTITUDE, Math.max(0, levelAt(levelStops, p) * METERS_PER_UNIT));
  marker.value.style.top = `${100 - (meters / MAX_ALTITUDE) * 100}%`;
  const rounded = Math.round(meters);
  if (rounded !== lastMeters) {
    lastMeters = rounded;
    markerLabel.value.textContent = `${rounded} m`;
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

function onLayout() {
  measure();
  schedule();
}

onMounted(() => {
  measure();
  update();
  if (!prefersReducedMotion()) setupIntro();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onLayout);
  observer = new ResizeObserver(onLayout);
  observer.observe(document.body);
});

onUnmounted(() => {
  offReady();
  ctx?.revert();
  ctx = null;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", onLayout);
  observer?.disconnect();
  if (frame) cancelAnimationFrame(frame);
});
</script>

<style scoped>
.blueprint-frame {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}

.frame-box {
  position: absolute;
  inset: var(--frame-inset);
  border: 1px solid color-mix(in srgb, rgb(var(--line)) 15%, rgb(var(--page)));
  box-shadow: 0 0 0 100vmax rgb(var(--page));
}

.rail {
  position: absolute;
  z-index: 10;
  display: none;
  width: var(--rail-w);
  flex-direction: column;
  align-items: center;
}

.rail-left {
  left: 0;
  border-right: 1px solid rgb(var(--line) / 0.15);
}

.rail-right {
  right: 0;
  border-left: 1px solid rgb(var(--line) / 0.15);
}

@media (min-width: 1024px) {
  .rail {
    display: flex;
  }
}

.ruler {
  position: absolute;
  inset: 24px 0;
}

.marker {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
}

.marker-label {
  position: absolute;
  right: 3px;
  padding: 1px 3px;
  background: rgb(var(--page));
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  line-height: 1;
  color: rgb(var(--brand-text));
  white-space: nowrap;
}
</style>
