<template>
  <section
    ref="el"
    aria-labelledby="skills-title"
    class="w-full min-h-screen flex flex-col justify-center py-12 gap-5 sm:gap-6"
  >
    <header
      ref="headerEl"
      class="lane-grid gap-y-3 border-b border-line/15 pb-5 lg:border-b-0"
    >
      <div class="lane-left relative lg:pb-5">
        <span
          class="skills-rule absolute left-0 right-0 bottom-0 hidden lg:block h-px bg-line/15 origin-left"
          aria-hidden="true"
        />
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-brand-text mb-2">
          // stack technique
        </p>
        <AsciiDecodeText
          tag="h1"
          id="skills-title"
          data-tower-anchor="skills"
          text="Compétences"
          idle-glitch
          :start="titlesReady"
          class="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]"
        />
      </div>
      <div class="lane-right relative hidden sm:flex items-end justify-end gap-4 lg:pb-5">
        <span
          class="skills-rule absolute left-0 right-0 bottom-0 hidden lg:block h-px bg-line/15 origin-right"
          aria-hidden="true"
        />
        <p class="text-sm text-ink-soft italic max-w-xs lg:text-right pb-1">
          Les technologies et outils que j'utilise pour concevoir et développer des
          applications web.
        </p>
        <div class="w-28 h-28 lg:w-32 lg:h-32 shrink-0 -mb-3" aria-hidden="true">
          <AsciiEffect effect="cube" :options="{ scale: 1 }" />
        </div>
      </div>
    </header>

    <div class="lane-grid gap-y-0">
      <ol
        v-for="(column, ci) in columns"
        :key="ci"
        :class="[ci === 0 ? 'lane-left' : 'lane-right', 'flex flex-col']"
      >
        <li
          v-for="item in column"
          :key="item.title"
          class="skill-row group flex flex-col gap-4 py-5 border-b border-line/15 last:border-b-0"
        >
          <div>
            <AsciiDecodeText
              tag="h2"
              :text="item.title"
              :start="titlesReady"
              :delay="0.3 + item.index * 0.12"
              :duration="1.2"
              class="text-lg sm:text-xl font-bold text-ink leading-snug transition-colors duration-300"
            />
            <p
              class="text-sm text-ink-muted transition-colors duration-300 group-hover:text-brand-text"
            >
              {{ item.subtitle }}
            </p>
          </div>

          <div
            class="min-w-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
          >
            <ul class="flex flex-wrap gap-x-6 gap-y-3" aria-label="Technologies">
              <li
                v-for="tech in item.technologies"
                :key="tech.name"
                class="skill-tech flex items-center gap-2.5"
              >
                <img :src="tech.icon" alt="" class="w-6 h-6 object-contain" />
                <span class="text-sm sm:text-base font-medium text-ink">
                  {{ tech.name }}
                </span>
              </li>
            </ul>
            <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Pratiques">
              <li
                v-for="detail in item.details"
                :key="detail"
                class="skill-tag text-[11px] font-medium text-ink-soft border border-line/25 rounded-full px-2 py-0.5 transition-colors duration-300 group-hover:border-line/40 group-hover:text-ink"
              >
                {{ detail }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";
import AsciiEffect from "@/components/AsciiEffect.vue";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import AsciiDecodeText from "../components/AsciiDecodeText.vue";

import vueIcon from "@/assets/icons/frontend/vue.svg";
import reactIcon from "@/assets/icons/frontend/react.svg";
import tailwindIcon from "@/assets/icons/frontend/tailwind.svg";
import tsIcon from "@/assets/icons/frontend/typescript.svg";
import dockerIcon from "@/assets/icons/backend/docker.svg";
import mysqlIcon from "@/assets/icons/backend/mysql.svg";
import nodeIcon from "@/assets/icons/backend/nodejs.svg";
import symfonyIcon from "@/assets/icons/backend/symfony.png";
import gitIcon from "@/assets/icons/tools/git.svg";
import githubIcon from "@/assets/icons/tools/github.svg";
import gitlabIcon from "@/assets/icons/tools/gitlab.svg";
import supabaseIcon from "@/assets/icons/backend/supabase.svg";
import railwayIcon from "@/assets/icons/tools/railway.svg";
import powerbiIcon from "@/assets/icons/data/powerbi.svg";
import excelIcon from "@/assets/icons/data/excel.svg";
import claudeIcon from "@/assets/icons/ai/claude.svg";
import codexIcon from "@/assets/icons/ai/codex.svg";
import cursorIcon from "@/assets/icons/ai/cursor.svg";

const el = ref(null);
const headerEl = ref(null);

const competences = [
  {
    title: "Front-End",
    subtitle: "Interfaces modernes",
    technologies: [
      { name: "Vue.js", icon: vueIcon },
      { name: "React", icon: reactIcon },
      { name: "TypeScript", icon: tsIcon },
      { name: "Tailwind", icon: tailwindIcon },
    ],
    details: ["Responsive", "SPA", "SSR", "Animations"],
  },
  {
    title: "Back-End",
    subtitle: "Serveurs & APIs",
    technologies: [
      { name: "Node.js", icon: nodeIcon },
      { name: "Symfony", icon: symfonyIcon },
      { name: "MySQL", icon: mysqlIcon },
      { name: "Supabase", icon: supabaseIcon },
      { name: "Docker", icon: dockerIcon },
    ],
    details: ["REST API", "GraphQL", "SQL", "CI/CD"],
  },
  {
    title: "Data",
    subtitle: "Analyse & BI",
    technologies: [
      { name: "Power BI", icon: powerbiIcon },
      { name: "Excel", icon: excelIcon },
      { name: "MySQL", icon: mysqlIcon },
    ],
    details: ["Dashboards", "Data viz", "ETL"],
  },
  {
    title: "IA",
    subtitle: "Développement assisté",
    technologies: [
      { name: "Claude", icon: claudeIcon },
      { name: "Codex", icon: codexIcon },
      { name: "Cursor", icon: cursorIcon },
    ],
    details: ["Agents", "Prompt engineering", "Code review IA"],
  },
  {
    title: "Outils",
    subtitle: "Workflow & Gestion",
    technologies: [
      { name: "Git", icon: gitIcon },
      { name: "GitHub", icon: githubIcon },
      { name: "GitLab", icon: gitlabIcon },
      { name: "Railway", icon: railwayIcon },
    ],
    details: ["Déploiement", "Code Review", "Testing"],
  },
];

const half = Math.ceil(competences.length / 2);
const indexed = competences.map((item, index) => ({ ...item, index }));
const columns = [indexed.slice(0, half), indexed.slice(half)];

const animate = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !el.value) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    headerEl.value.querySelectorAll(":scope > div"),
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: "opacity,transform" }
  )
    .fromTo(
      headerEl.value.querySelectorAll(".skills-rule"),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut", clearProps: "transform" },
      0
    )
    .fromTo(
      el.value.querySelectorAll(".skill-row"),
      { opacity: 0, x: -12 },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.1,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    )
    .fromTo(
      el.value.querySelectorAll(".skill-tech"),
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    )
    .fromTo(
      el.value.querySelectorAll(".skill-tag"),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.02,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
};

const titlesReady = ref(false);

useEnterAnimation(el, () => {
  titlesReady.value = true;
  animate();
});
</script>
