<template>
  <section aria-labelledby="skills-title">
    <h2 id="skills-title" v-reveal class="section-label">Stack</h2>

    <dl class="mt-6">
      <div
        v-reveal
        v-for="group in groups"
        :key="group.title"
        class="grid gap-x-6 gap-y-2 border-t border-line/10 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
      >
        <dt class="text-[15px] text-ink-muted">{{ group.title }}</dt>
        <dd>
          <ul class="flex flex-wrap gap-x-5 gap-y-2.5">
            <li
              v-for="tech in group.technologies"
              :key="tech.name"
              class="tech flex items-center gap-2 text-[15px] text-ink"
            >
              <img :src="tech.icon" alt="" width="18" height="18" class="tech-icon h-[18px] w-[18px] object-contain" />
              {{ tech.name }}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
import vueIcon from "@/assets/icons/frontend/vue.svg";
import reactIcon from "@/assets/icons/frontend/react.svg";
import tsIcon from "@/assets/icons/frontend/typescript.svg";
import tailwindIcon from "@/assets/icons/frontend/tailwind.svg";
import nodeIcon from "@/assets/icons/backend/nodejs.svg";
import symfonyIcon from "@/assets/icons/backend/symfony.png";
import mysqlIcon from "@/assets/icons/backend/mysql.svg";
import supabaseIcon from "@/assets/icons/backend/supabase.svg";
import dockerIcon from "@/assets/icons/backend/docker.svg";
import powerbiIcon from "@/assets/icons/data/powerbi.svg";
import excelIcon from "@/assets/icons/data/excel.svg";
import gitIcon from "@/assets/icons/tools/git.svg";
import githubIcon from "@/assets/icons/tools/github.svg";
import gitlabIcon from "@/assets/icons/tools/gitlab.svg";
import railwayIcon from "@/assets/icons/tools/railway.svg";
import claudeIcon from "@/assets/icons/ai/claude.svg";
import codexIcon from "@/assets/icons/ai/codex.svg";
import cursorIcon from "@/assets/icons/ai/cursor.svg";

const groups = [
  {
    title: "Front-End",
    technologies: [
      { name: "Vue.js", icon: vueIcon },
      { name: "React", icon: reactIcon },
      { name: "TypeScript", icon: tsIcon },
      { name: "Tailwind", icon: tailwindIcon },
    ],
  },
  {
    title: "Back-End & Data",
    technologies: [
      { name: "Node.js", icon: nodeIcon },
      { name: "Symfony", icon: symfonyIcon },
      { name: "MySQL", icon: mysqlIcon },
      { name: "Supabase", icon: supabaseIcon },
      { name: "Docker", icon: dockerIcon },
      { name: "Power BI", icon: powerbiIcon },
      { name: "Excel", icon: excelIcon },
    ],
  },
  {
    title: "Outils & IA",
    technologies: [
      { name: "Git", icon: gitIcon },
      { name: "GitHub", icon: githubIcon },
      { name: "GitLab", icon: gitlabIcon },
      { name: "Railway", icon: railwayIcon },
      { name: "Claude", icon: claudeIcon },
      { name: "Codex", icon: codexIcon },
      { name: "Cursor", icon: cursorIcon },
    ],
  },
];
</script>

<style scoped>
/* Logos sit in monochrome next to the text and reveal their brand colors on hover. */
.tech-icon {
  filter: grayscale(1) contrast(1.1);
  opacity: 0.75;
  transition:
    filter 0.25s ease,
    opacity 0.25s ease;
}
.tech:hover .tech-icon {
  filter: none;
  opacity: 1;
}
</style>
