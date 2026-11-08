<template>
  <div ref="el" class="h-full flex flex-col justify-center py-10 gap-8 overflow-hidden">
    <header
      ref="headerEl"
      class="lane-grid gap-y-3 border-b border-line/15 pb-5 lg:border-b-0 lg:pb-0"
    >
      <div class="lane-left lg:border-b lg:border-line/15 lg:pb-5">
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-brand-text mb-2 watch-label">
          // sources
        </p>
        <AsciiDecodeText
          tag="h1"
          data-tower-anchor="tech-watch"
          text="Veille Technologique"
          idle-glitch
          :start="titleReady"
          class="text-4xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]"
        />
      </div>
      <div
        class="lane-right hidden sm:flex items-end justify-end lg:border-b lg:border-line/15 lg:pb-5"
      >
        <p class="text-sm text-ink-muted italic max-w-xs lg:text-right watch-intro">
          Les sources que je consulte pour rester à jour.
        </p>
      </div>
    </header>

    <div class="lane-grid gap-y-0">
      <div
        v-for="(list, ci) in columns"
        :key="ci"
        :class="[ci === 0 ? 'lane-left' : 'lane-right', 'flex flex-col']"
      >
        <a
          v-for="(item, i) in list"
          :key="item.title"
          :href="item.link"
          target="_blank"
          class="watch-row group relative flex items-center gap-4 py-5 px-3 sm:px-4 no-underline overflow-hidden"
          :style="{ '--accent': item.accent }"
        >
          <span
            :class="[
              ci === 0 ? 'origin-left' : 'origin-right',
              'watch-line absolute left-0 right-0 bottom-0 h-px bg-line/15',
            ]"
            aria-hidden="true"
          />
          <span
            class="watch-fill absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <span
            :data-num="String(ci * half + i + 1).padStart(2, '0')"
            class="watch-num relative z-10 font-mono text-sm w-8 shrink-0 text-ink-muted group-hover:text-[color:var(--accent)] transition-colors duration-300"
          >
            {{ String(ci * half + i + 1).padStart(2, "0") }}
          </span>

          <div class="relative z-10 flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3
                class="text-xl sm:text-2xl font-bold text-ink-soft group-hover:text-ink transition-colors duration-300 group-hover:translate-x-1 transform-gpu"
              >
                {{ item.title }}
              </h3>
              <span
                class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-line/15 text-ink-muted group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)] transition-colors duration-300"
              >
                {{ item.category }}
              </span>
            </div>
            <p
              class="text-sm text-ink-soft mt-0 max-h-0 opacity-0 group-hover:max-h-20 group-hover:mt-2 group-hover:opacity-100 transition-all duration-500 overflow-hidden"
            >
              {{ item.description }}
            </p>
          </div>

          <svg
            class="relative z-10 w-5 h-5 shrink-0 text-ink-muted group-hover:text-[color:var(--accent)] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 17L17 7M17 7H8M17 7V16"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { gsap, prefersReducedMotion, typeText } from "@/lib/motion.js";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import AsciiDecodeText from "../components/AsciiDecodeText.vue";

const el = ref(null);
const headerEl = ref(null);
const titleReady = ref(false);

const techList = ref([
  {
    title: "Medium",
    description: "Articles de développeurs et experts tech sur des sujets de fond.",
    link: "https://medium.com/tag/programming",
    category: "Blog",
    accent: "#12b886",
  },
  {
    title: "Daily.dev",
    description: "Réseau de développeurs — agrégateur de news tech personnalisé.",
    link: "https://daily.dev/fr-fr",
    category: "Communauté",
    accent: "#6366f1",
  },
  {
    title: "GitHub Trending",
    description: "Dépôts et développeurs en tendance chaque jour sur GitHub.",
    link: "https://github.com/trending/developers",
    category: "Open Source",
    accent: "#374151",
  },
  {
    title: "Dev.to",
    description: "Communauté ouverte de développeurs partageant articles et retours d'expérience.",
    link: "https://dev.to/",
    category: "Communauté",
    accent: "#f59e0b",
  },
  {
    title: "Hashnode",
    description: "Plateforme de blogs pour développeurs avec une audience tech engagée.",
    link: "https://hashnode.com/",
    category: "Blog",
    accent: "#06b6d4",
  },
  {
    title: "Node.js Blog",
    description: "Actualités officielles, releases et mises à jour de l'écosystème Node.js.",
    link: "https://nodejs.org/fr/blog/",
    category: "Officiel",
    accent: "#22c55e",
  },
]);

const half = Math.ceil(techList.value.length / 2);
const columns = [techList.value.slice(0, half), techList.value.slice(half)];

const scrambleNumber = (node, final, duration) => {
  const state = { p: 0 };
  node.textContent = "00";
  return gsap.to(state, {
    p: 1,
    duration,
    ease: "none",
    onUpdate: () => {
      node.textContent = final
        .split("")
        .map((ch, k) =>
          state.p >= (k + 1) / (final.length + 1) + 0.15
            ? ch
            : String(Math.floor(Math.random() * 10)),
        )
        .join("");
    },
    onComplete: () => {
      node.textContent = final;
    },
  });
};

let ctx = null;

useEnterAnimation(el, () => {
  titleReady.value = true;
  if (prefersReducedMotion() || !el.value) return;

  ctx = gsap.context(() => {
    const q = (sel) => el.value.querySelectorAll(sel);
    const label = headerEl.value.querySelector(".watch-label");
    const labelText = label.textContent.trim();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.add(typeText(label, labelText), 0).fromTo(
      headerEl.value.querySelector(".watch-intro"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, clearProps: "opacity,transform" },
      0.2,
    );

    const rows = q(".watch-row");
    rows.forEach((row, k) => {
      const right = row.parentElement.classList.contains("lane-right");
      const at = 0.35 + k * 0.1;
      const fill = row.querySelector(".watch-fill");
      const num = row.querySelector(".watch-num");

      tl.fromTo(
        row,
        { opacity: 0, x: right ? 40 : -40 },
        { opacity: 1, x: 0, duration: 0.7, clearProps: "opacity,transform" },
        at,
      )
        .fromTo(
          row.querySelector(".watch-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut", clearProps: "transform" },
          at,
        )
        .add(scrambleNumber(num, num.dataset.num, 0.7), at)
        .fromTo(
          fill,
          { opacity: 0, transition: "none" },
          {
            keyframes: [
              { opacity: 0.9, duration: 0.3, ease: "power2.out" },
              { opacity: 0, duration: 0.6, ease: "power2.in" },
            ],
            clearProps: "opacity,transition",
          },
          at + 0.35,
        );
    });
  }, el.value);
});

onUnmounted(() => ctx?.revert());
</script>

<style scoped>
.watch-fill {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 10%, transparent) 0%,
    transparent 75%
  );
}
</style>
