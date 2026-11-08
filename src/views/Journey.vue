<template>
  <section
    ref="el"
    aria-labelledby="journey-title"
    class="no-scrollbar min-h-screen flex flex-col justify-center py-8 gap-5 sm:gap-6"
  >
    <header ref="headerEl" class="lane-grid gap-y-3 border-b border-line/15 pb-5 lg:border-b-0">
      <div class="lane-left relative lg:pb-5">
        <span
          class="journey-rule absolute left-0 right-0 bottom-0 hidden lg:block h-px bg-line/15 origin-left"
          aria-hidden="true"
        />
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-brand-text mb-2">
          // expérience & formation
        </p>
        <AsciiDecodeText
          id="journey-title"
          tag="h1"
          data-tower-anchor="journey"
          text="Parcours"
          idle-glitch
          :start="titleReady"
          class="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]"
        />
      </div>
      <div class="lane-right relative flex items-end justify-end lg:pb-5">
        <span
          class="journey-rule absolute left-0 right-0 bottom-0 hidden lg:block h-px bg-line/15 origin-right"
          aria-hidden="true"
        />
        <p class="hidden sm:block text-sm text-ink-muted italic max-w-xs sm:ml-auto lg:text-right">
          Mon expérience et mes formations, du lycée au mastère.
        </p>
      </div>
    </header>

    <div class="lane-grid">
      <div
        v-for="(column, ci) in columns"
        :key="ci"
        :class="[ci === 0 ? 'lane-left' : 'lane-right', 'journey-col flex flex-col gap-4 sm:gap-5']"
      >
        <div v-for="group in column" :key="group.label" class="journey-group">
          <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted mb-1">
            {{ group.label }}
          </h2>

          <ol class="flex flex-col">
            <li
              v-for="item in group.items"
              :key="item.title"
              class="journey-row group relative flex flex-col gap-1 py-3 border-b border-line/15 last:border-b-0"
            >
              <span
                class="journey-years font-mono text-sm text-ink-muted transition-colors duration-300 group-hover:text-brand-text"
              >
                {{ item.years }}
              </span>

              <div
                class="min-w-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
              >
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 class="text-base sm:text-lg font-bold text-ink leading-snug">
                    {{ item.title }}
                  </h3>
                  <span
                    v-if="item.ongoing"
                    class="journey-badge inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5"
                  >
                    <span class="relative flex w-1.5 h-1.5" aria-hidden="true">
                      <span
                        class="absolute inset-0 rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"
                      />
                      <span class="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                    En cours
                  </span>
                </div>
                <p class="text-sm font-medium text-ink-soft">
                  {{ item.institution }}
                </p>
                <p class="mt-1 text-sm text-ink-soft leading-relaxed">
                  {{ item.description }}
                </p>
                <ul class="mt-1.5 flex flex-wrap gap-1.5" aria-label="Compétences">
                  <li
                    v-for="tag in item.tags"
                    :key="tag"
                    class="journey-tag text-[11px] font-medium text-ink-soft border border-line/25 rounded-full px-2 py-0.5 transition-colors duration-300 group-hover:border-line/40 group-hover:text-ink"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import AsciiDecodeText from "../components/AsciiDecodeText.vue";
import { gsap, prefersReducedMotion } from "../lib/motion.js";

const el = ref(null);
const headerEl = ref(null);

const groups = [
  {
    label: "Expérience",
    items: [
      {
        title: "Ingénieur Développement — Alternance",
        institution: "Cegedim Business Services",
        years: "2025 – 2027",
        ongoing: true,
        description: "Développement d'interfaces web front-end, principalement en Vue.js.",
        tags: ["Vue.js", "Front-end"],
      },
    ],
  },
  {
    label: "Formation",
    items: [
      {
        title: "Mastère Dev Manager Full Stack",
        institution: "Efrei",
        years: "2025 – 2027",
        description:
          "Formation de haut niveau pour maîtriser les technologies back-end et front-end. Management et architecture.",
        tags: ["Full Stack", "Management", "Architecture"],
      },
      {
        title: "BUT MMI",
        institution: "Université Gustave Eiffel",
        years: "2022 – 2025",
        description:
          "Formation en multimédia, communication et développement web. Design, UX/UI et technologies front/back-end.",
        tags: ["Web", "UX/UI", "Multimédia"],
      },
      {
        title: "Baccalauréat STI2D",
        institution: "Lycée Pierre de Coubertin",
        years: "2020 – 2022",
        description:
          "Formation technologique axée sur l'innovation, l'ingénierie et le développement durable.",
        tags: ["Innovation", "Ingénierie", "Numérique"],
      },
    ],
  },
];

const [experience, formation] = groups;
const columns = [
  [experience, { label: formation.label, items: formation.items.slice(0, 1) }],
  [{ label: `${formation.label} (suite)`, items: formation.items.slice(1) }],
];

const entered = ref(false);
const titleReady = computed(() => entered.value);

let ctx = null;
onUnmounted(() => ctx?.revert());

// Replaces digits only: random numbers settle left to right on the real value.
const scrambleYears = (span) => {
  const finalText = span.textContent;
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration: 0.6,
    ease: "none",
    onUpdate: () => {
      const settled = Math.floor(state.p * finalText.length);
      span.textContent = [...finalText]
        .map((ch, i) =>
          /\d/.test(ch) && i >= settled ? String(Math.floor(Math.random() * 10)) : ch,
        )
        .join("");
    },
    onComplete: () => {
      span.textContent = finalText;
    },
  });
};

const buildTimeline = () => {
  if (prefersReducedMotion() || !el.value) return null;

  const root = el.value;
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo(
    headerEl.value.querySelectorAll(":scope > div"),
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: "opacity,transform" },
  ).fromTo(
    headerEl.value.querySelectorAll(".journey-rule"),
    { scaleX: 0 },
    { scaleX: 1, duration: 0.8, ease: "power3.inOut", clearProps: "transform" },
    0,
  );

  root.querySelectorAll(".journey-col").forEach((col, ci) => {
    const fromLeft = ci === 0;
    let at = 0.35 + ci * 0.12;

    col.querySelectorAll(".journey-group").forEach((group) => {
      const label = group.querySelector(":scope > h2");
      tl.fromTo(
        label,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.45, clearProps: "opacity,transform" },
        at,
      );
      at += 0.12;

      group.querySelectorAll(".journey-row").forEach((row) => {
        // Wipe: left column reveals left -> right, right column right -> left.
        tl.fromTo(
          row,
          { clipPath: fromLeft ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "power3.inOut",
            clearProps: "clipPath",
          },
          at,
        );

        // Pink hairline drawn under the row, then fades to the regular border.
        const line = document.createElement("span");
        line.setAttribute("aria-hidden", "true");
        line.className = `absolute left-0 right-0 bottom-0 h-px bg-brand-text pointer-events-none ${
          fromLeft ? "origin-left" : "origin-right"
        }`;
        row.appendChild(line);
        tl.fromTo(
          line,
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
          at + 0.15,
        ).to(line, { opacity: 0, duration: 0.5, onComplete: () => line.remove() }, ">");

        const years = row.querySelector(".journey-years");
        if (years) tl.add(scrambleYears(years), at + 0.1);

        const badge = row.querySelector(".journey-badge");
        if (badge) {
          tl.fromTo(
            badge,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(2.5)",
              clearProps: "opacity,transform",
            },
            at + 0.55,
          );
        }

        const tags = row.querySelectorAll(".journey-tag");
        if (tags.length) {
          tl.fromTo(
            tags,
            { opacity: 0, y: 10, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "back.out(2.2)",
              stagger: 0.05,
              clearProps: "opacity,transform",
            },
            at + 0.4,
          );
        }

        at += 0.22;
      });
    });
  });

  return tl;
};

useEnterAnimation(el, () => {
  entered.value = true;
  if (!el.value) return;
  ctx = ctx || gsap.context(() => {}, el.value);
  ctx.add(buildTimeline);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
