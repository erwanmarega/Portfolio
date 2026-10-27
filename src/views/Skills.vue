<template>
  <section
    ref="el"
    aria-labelledby="skills-title"
    class="w-full min-h-screen bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 gap-5 sm:gap-6"
  >
    <header ref="headerEl" class="relative flex items-end justify-between gap-4 pb-5">
      <span
        class="skills-rule absolute left-0 right-0 bottom-0 h-px bg-gray-200 origin-left"
        aria-hidden="true"
      />
      <div>
        <p class="text-xs font-mono uppercase tracking-[0.3em] text-indigo-500 mb-2">
          // stack technique
        </p>
        <h1
          id="skills-title"
          class="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none"
        >
          Compétences
        </h1>
      </div>
      <p class="hidden sm:block text-sm text-gray-400 italic max-w-xs text-right">
        Les technologies et outils que j'utilise pour concevoir et développer des
        applications web.
      </p>
    </header>

    <ol class="flex flex-col">
      <li
        v-for="item in competences"
        :key="item.title"
        class="skill-row group flex flex-col sm:flex-row gap-4 sm:gap-8 py-5 border-b border-gray-100 last:border-b-0"
      >
        <div class="sm:w-56 shrink-0">
          <h2
            class="text-lg sm:text-xl font-bold text-gray-900 leading-snug transition-colors duration-300"
          >
            {{ item.title }}
          </h2>
          <p
            class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-indigo-500"
          >
            {{ item.subtitle }}
          </p>
        </div>

        <div
          class="flex-1 min-w-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
        >
          <ul class="flex flex-wrap gap-x-8 gap-y-3" aria-label="Technologies">
            <li
              v-for="tech in item.technologies"
              :key="tech.name"
              class="skill-tech flex items-center gap-2.5"
            >
              <img :src="tech.icon" alt="" class="w-6 h-6 object-contain" />
              <span class="text-sm sm:text-base font-medium text-gray-800">
                {{ tech.name }}
              </span>
            </li>
          </ul>
          <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Pratiques">
            <li
              v-for="detail in item.details"
              :key="detail"
              class="skill-tag text-[11px] font-medium text-gray-500 border border-gray-200 rounded-full px-2 py-0.5 transition-colors duration-300 group-hover:border-gray-300 group-hover:text-gray-700"
            >
              {{ detail }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

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

const animate = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !el.value) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    headerEl.value.querySelectorAll(":scope > div, :scope > p"),
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, clearProps: "opacity,transform" }
  )
    .fromTo(
      headerEl.value.querySelector(".skills-rule"),
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

useEnterAnimation(el, animate);
</script>
