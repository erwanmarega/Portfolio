<template>
  <main
    ref="el"
    class="relative flex min-h-[calc(100svh-var(--bar-h)-var(--foot-h)-2*var(--frame-inset))] flex-col justify-center font-sans"
  >
    <section
      class="lane-grid relative z-10 w-full items-center gap-y-10 py-10 lg:gap-y-0 lg:py-16"
    >
      <div ref="textBlock" class="lane-left min-w-0 lg:pr-6">
        <p
          data-hero="item"
          class="mb-5 font-mono text-xs text-ink-soft"
        >
          <span class="text-brand-text">$</span> whoami
        </p>

        <h1
          data-tower-anchor="home"
          data-hero="item"
          class="mb-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-paper sm:text-5xl lg:text-[clamp(1.75rem,3.4vw,4.5rem)]"
        >
          Développeur web
          <span class="whitespace-nowrap"
            >fullstack<span class="cursor" aria-hidden="true"
          /></span>
        </h1>

        <p
          data-hero="item"
          class="mb-8 max-w-md text-base leading-relaxed text-paper/75 lg:text-[15px] xl:text-lg"
        >
          Je conçois des applications web modernes et performantes. Passionné
          par Vue.js, Node.js et l'expérience utilisateur.
        </p>

        <div data-hero="item" class="flex flex-wrap items-stretch">
          <a
            href="#projects"
            class="inline-flex items-center gap-3 bg-paper px-5 py-3.5 text-sm font-semibold text-page outline-none transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text sm:px-6"
          >
            Voir mes projets
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="h-3.5 w-3.5" />
          </a>
          <a
            href="#contact"
            class="inline-flex items-center border border-line/25 px-5 py-3.5 text-sm font-semibold text-paper outline-none transition-colors hover:bg-line/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text sm:px-6"
          >
            Me contacter
          </a>
        </div>
      </div>

      <div
        class="lane-right flex min-w-0 flex-col lg:items-end lg:pl-6"
      >
        <div class="w-full lg:max-w-[26rem]">
          <div data-hero="item" class="border border-line/15 bg-surface/70">
            <div
              class="flex items-center gap-1.5 border-b border-line/15 px-4 py-3"
            >
              <span class="h-2 w-2 rounded-full bg-ink-muted/30" />
              <span class="h-2 w-2 rounded-full bg-ink-muted/30" />
              <span class="h-2 w-2 rounded-full bg-ink-muted/30" />
              <span class="ml-3 font-mono text-[11px] text-ink-muted"
                >profil.ts</span
              >
            </div>
            <pre
              class="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.75] text-ink-muted"
            ><code><span class="text-paper">const</span> <span class="font-semibold text-paper">erwan</span> = {
  <span class="text-paper">role</span>: <span class="text-ink">'fullstack'</span>,
  <span class="text-paper">ville</span>: <span class="text-ink">'Paris'</span>,
  <span class="text-paper">cursus</span>: <span class="text-ink">'Efrei — M2'</span>,
  <span class="text-paper">stack</span>: [<span class="text-ink">'Vue.js'</span>, <span class="text-ink">'Node.js'</span>],
}</code></pre>
          </div>

          <div
            ref="statsEl"
            data-hero="item"
            class="mt-5 grid grid-cols-3 divide-x divide-line/15 border border-line/15"
          >
            <div v-for="stat in statItems" :key="stat.key" class="px-4 py-4">
              <div class="text-2xl font-bold leading-none text-paper">
                {{ String(stats[stat.key]).padStart(2, "0") }}
              </div>
              <div class="mt-2 font-mono text-[11px] text-ink-muted">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight);

const statItems = [
  { key: "projects", label: "projets" },
  { key: "tech", label: "technos" },
  { key: "years", label: "années" },
];

const el = ref(null);
const textBlock = ref(null);
const statsEl = ref(null);

const stats = reactive({ projects: 0, tech: 0, years: 0 });
let ctx = null;

const animateStats = () => {
  const targets = { projects: 5, tech: 12, years: 3 };
  Object.entries(targets).forEach(([key, value]) => {
    const counter = { v: 0 };
    gsap.to(counter, {
      v: value,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        stats[key] = Math.round(counter.v);
      },
    });
  });
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Object.assign(stats, { projects: 5, tech: 12, years: 3 });
    return;
  }
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from('[data-hero="item"]', {
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.1,
    }).add(animateStats, "-=0.6");
  }, el.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
.cursor {
  display: inline-block;
  width: 0.5em;
  height: 0.12em;
  margin-left: 0.06em;
  background: rgb(var(--brand-text));
  vertical-align: baseline;
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  0%,
  60% {
    opacity: 1;
  }
  61%,
  100% {
    opacity: 0.15;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}
</style>
