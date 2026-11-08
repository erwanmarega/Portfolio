<template>
  <main
    ref="el"
    class="relative flex min-h-[calc(100svh-var(--bar-h)-var(--foot-h)-2*var(--frame-inset))] flex-col justify-center font-sans"
  >
    <section class="lane-grid relative z-10 w-full items-center gap-y-10 py-10 lg:gap-y-0 lg:py-16">
      <div ref="textBlock" class="lane-left min-w-0 lg:pr-6">
        <p data-hero="prompt" class="mb-5 font-mono text-xs text-ink-soft">
          <span class="text-brand-text">$</span> <span ref="whoamiEl">whoami</span>
        </p>

        <h1
          data-tower-anchor="home"
          class="mb-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-paper sm:text-5xl lg:text-[clamp(1.75rem,3.4vw,4.5rem)]"
        >
          <span ref="titleA">Développeur web</span>{{ " " }}
          <span class="whitespace-nowrap"
            ><span ref="titleB">fullstack</span><span class="cursor" aria-hidden="true"
          /></span>
        </h1>

        <p
          data-hero="para"
          class="mb-8 max-w-md text-base leading-relaxed text-paper/75 lg:text-[15px] xl:text-lg"
        >
          Je conçois des applications web modernes et performantes. Passionné par Vue.js, Node.js et
          l'expérience utilisateur.
        </p>

        <div data-hero="buttons" class="flex flex-wrap items-stretch">
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

      <div class="lane-right flex min-w-0 flex-col lg:items-end lg:pl-6">
        <div class="w-full lg:max-w-[26rem]">
          <div data-hero="card" class="border border-line/15 bg-surface/70">
            <div class="flex items-center gap-1.5 border-b border-line/15 px-4 py-3">
              <span class="h-2 w-2 rounded-full bg-ink-muted/30" />
              <span class="h-2 w-2 rounded-full bg-ink-muted/30" />
              <span class="h-2 w-2 rounded-full bg-ink-muted/30" />
              <span class="ml-3 font-mono text-[11px] text-ink-muted">profil.ts</span>
            </div>
            <pre
              class="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.75] text-ink-muted"
            ><code><span class="code-line"><span class="text-paper">const</span> <span class="font-semibold text-paper">erwan</span> = {<span class="caret" aria-hidden="true"></span></span
><span class="code-line">  <span class="text-paper">role</span>: <span class="text-ink">'fullstack'</span>,<span class="caret" aria-hidden="true"></span></span
><span class="code-line">  <span class="text-paper">ville</span>: <span class="text-ink">'Paris'</span>,<span class="caret" aria-hidden="true"></span></span
><span class="code-line">  <span class="text-paper">cursus</span>: <span class="text-ink">'Efrei — M2'</span>,<span class="caret" aria-hidden="true"></span></span
><span class="code-line">  <span class="text-paper">stack</span>: [<span class="text-ink">'Vue.js'</span>, <span class="text-ink">'Node.js'</span>],<span class="caret" aria-hidden="true"></span></span
><span class="code-line">}<span class="caret" aria-hidden="true"></span></span></code></pre>
          </div>

          <div
            ref="statsEl"
            data-hero="stats"
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
import { gsap, SplitText, prefersReducedMotion, onSiteReady, typeText } from "../lib/motion.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight);

const statItems = [
  { key: "projects", label: "projets" },
  { key: "tech", label: "technos" },
  { key: "years", label: "années" },
];
const statTargets = { projects: 5, tech: 12, years: 3 };

const el = ref(null);
const textBlock = ref(null);
const statsEl = ref(null);
const whoamiEl = ref(null);
const titleA = ref(null);
const titleB = ref(null);

const stats = reactive({ projects: 0, tech: 0, years: 0 });
let ctx = null;
let offReady = null;

onMounted(() => {
  if (prefersReducedMotion()) {
    Object.assign(stats, statTargets);
    return;
  }

  ctx = gsap.context(() => {
    const q = (sel) => el.value.querySelector(sel);
    const splits = [];
    const whoami = whoamiEl.value;

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

    // $ whoami: typed in brand color
    if (whoami) {
      whoami.classList.add("text-brand-text");
      tl.fromTo(q('[data-hero="prompt"]'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
      tl.add(typeText(whoami, "whoami", { duration: 0.45 }), 0.1);
      tl.call(() => whoami.classList.remove("text-brand-text"), null, ">0.15");
    }

    // H1: masked word slide-up (cursor span is left untouched)
    const words = [];
    [titleA.value, titleB.value].forEach((node) => {
      if (!node) return;
      const split = SplitText.create(node, { type: "words", mask: "words" });
      splits.push(split);
      words.push(...split.words);
    });
    if (words.length) {
      tl.from(words, { yPercent: 115, duration: 0.9, stagger: 0.12 }, 0.35);
    }

    tl.from(q('[data-hero="para"]'), { opacity: 0, y: 20, duration: 0.7 }, 0.9);
    tl.from(q('[data-hero="buttons"]'), { opacity: 0, y: 20, duration: 0.7 }, 1.05);

    // profil.ts card: frame reveals from the header bar, then code is printed line by line
    const card = q('[data-hero="card"]');
    tl.fromTo(
      card,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power2.inOut", clearProps: "clipPath" },
      0.6,
    );
    const lines = gsap.utils.toArray(card.querySelectorAll(".code-line"));
    const carets = gsap.utils.toArray(card.querySelectorAll(".caret"));
    let t = 1.15;
    lines.forEach((line, i) => {
      tl.fromTo(
        line,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.32, ease: "steps(12)", clearProps: "clipPath" },
        t,
      );
      const caret = carets[i];
      if (caret) {
        tl.set(caret, { opacity: 1 }, t);
        tl.set(caret, { opacity: 0, display: "none" }, t + 0.4);
      }
      t += 0.28;
    });

    // Stats: cells reveal from the bottom while the counters run
    const cells = gsap.utils.toArray(statsEl.value.children);
    tl.from(statsEl.value, { opacity: 0, duration: 0.4, clearProps: "opacity" }, 1.5);
    tl.fromTo(
      cells,
      { clipPath: "inset(100% 0 0 0)", y: 10 },
      {
        clipPath: "inset(0% 0 0 0)",
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        clearProps: "clipPath,transform",
      },
      1.5,
    );
    Object.entries(statTargets).forEach(([key, value], i) => {
      const counter = { v: 0 };
      tl.to(
        counter,
        {
          v: value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            stats[key] = Math.round(counter.v);
          },
        },
        1.5 + i * 0.12,
      );
    });

    tl.call(() => splits.forEach((s) => s.revert()));

    offReady = onSiteReady(() => tl.play());

    return () => {
      splits.forEach((s) => s.revert());
      if (whoami) {
        whoami.textContent = "whoami";
        whoami.classList.remove("text-brand-text");
      }
      Object.assign(stats, statTargets);
    };
  }, el.value);
});

onUnmounted(() => {
  offReady?.();
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

.code-line {
  display: block;
}

.caret {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  margin-left: 0.15em;
  vertical-align: text-bottom;
  background: rgb(var(--brand-text));
  opacity: 0;
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
