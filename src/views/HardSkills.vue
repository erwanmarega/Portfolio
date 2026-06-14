<template>
  <div ref="el" class="w-full min-h-screen bg-white pt-28 sm:pt-40 pb-12 px-4 sm:px-8 lg:px-14">

    <header ref="headerEl" class="text-center mb-12">
      <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none animate-fade-in">
        Compétences
      </h1>
      <p class="mt-2 text-sm text-gray-400 italic animate-fade-in-delay">
        Technologies et outils que je maîtrise au quotidien.
      </p>
    </header>

    <div class="relative px-4 sm:px-8 lg:px-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in competences"
          :key="index"
          class="flex flex-col items-center gap-4"
        >
          <div
            class="w-8 h-8 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10 skill-dot"
            :class="item.dotBg"
          />

          <div
            class="relative w-full rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg skill-card"
            :class="item.borderTop"
          >
            <div class="relative h-28 overflow-hidden">
              <img
                :src="item.bgImage"
                alt=""
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div class="absolute inset-0" :class="item.overlay" />
              <div class="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span class="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm bg-white/85 shadow-sm" :class="item.badgeText">
                  {{ item.technologies.length }} technos
                </span>
                <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md" :class="item.iconBg">
                  <component :is="item.icon" class="w-5 h-5 text-white" />
                </div>
              </div>
              <div class="absolute bottom-3 left-3 right-3">
                <h2 class="text-lg font-bold text-white leading-tight drop-shadow">{{ item.title }}</h2>
                <p class="text-xs text-white/80 font-medium">{{ item.subtitle }}</p>
              </div>
            </div>

            <div class="bg-white p-5 flex flex-col gap-3 flex-1">
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="tech in item.technologies"
                  :key="tech.name"
                  class="tech-chip group/chip flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100 cursor-default"
                  :class="item.chipHover"
                >
                  <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img
                      :src="tech.icon"
                      :alt="tech.name"
                      class="w-5 h-5 object-contain transition-transform duration-300 group-hover/chip:scale-125 group-hover/chip:-rotate-6"
                    />
                  </div>
                  <span class="text-xs font-medium text-gray-700 truncate transition-colors duration-300" :class="item.chipText">{{ tech.name }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-1.5 pt-1 mt-auto border-t border-gray-100">
                <span
                  v-for="detail in item.details"
                  :key="detail"
                  class="px-2 py-0.5 text-xs font-medium rounded-full border"
                  :class="item.tagClass"
                >
                  {{ detail }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

import vueIcon from "@/assets/front-end/vue.svg";
import reactIcon from "@/assets/front-end/react-wordmark-light.svg";
import tailwindIcon from "@/assets/front-end/tailwindcss.svg";
import tsIcon from "@/assets/front-end/typescript.svg";
import dockerIcon from "@/assets/back-end/docker.svg";
import mysqlIcon from "@/assets/back-end/mysql.svg";
import nodeIcon from "@/assets/back-end/nodejs.svg";
import symfonyIcon from "@/assets/back-end/symfony.png";
import gitIcon from "@/assets/gestion-de-projet/git.svg";
import githubIcon from "@/assets/gestion-de-projet/github-light.svg";
import gitlabIcon from "@/assets/gestion-de-projet/gitlab.svg";
import agileIcon from "@/assets/gestion-de-projet/agile.png";

const u = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const CodeIcon = {
  render: () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "1.8" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }),
  ]),
};

const ServerIcon = {
  render: () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "1.8" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" }),
  ]),
};

const ToolIcon = {
  render: () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "1.8" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
  ]),
};

const el = ref(null);
const headerEl = ref(null);

const competences = ref([
  {
    title: "Front-End",
    subtitle: "Interfaces modernes",
    icon: CodeIcon,
    bgImage: u("1581276879432-15e50529f34b"),
    overlay: "bg-gradient-to-t from-indigo-900/80 via-indigo-700/40 to-indigo-500/20",
    dotBg: "bg-indigo-500",
    borderTop: "border-t-2 border-t-indigo-500",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    badgeText: "text-indigo-700",
    tagClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    chipHover: "hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-200/50",
    chipText: "group-hover/chip:text-indigo-700",
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
    icon: ServerIcon,
    bgImage: u("1558494949-ef010cbdcc31"),
    overlay: "bg-gradient-to-t from-emerald-900/80 via-emerald-700/40 to-emerald-500/20",
    dotBg: "bg-emerald-500",
    borderTop: "border-t-2 border-t-emerald-500",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    badgeText: "text-emerald-700",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    chipHover: "hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-200/50",
    chipText: "group-hover/chip:text-emerald-700",
    technologies: [
      { name: "Node.js", icon: nodeIcon },
      { name: "Symfony", icon: symfonyIcon },
      { name: "MySQL", icon: mysqlIcon },
      { name: "Docker", icon: dockerIcon },
    ],
    details: ["REST API", "GraphQL", "SQL", "CI/CD"],
  },
  {
    title: "Outils",
    subtitle: "Workflow & Gestion",
    icon: ToolIcon,
    bgImage: u("1556075798-4825dfaaf498"),
    overlay: "bg-gradient-to-t from-amber-900/80 via-amber-700/40 to-amber-500/20",
    dotBg: "bg-amber-400",
    borderTop: "border-t-2 border-t-amber-400",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    badgeText: "text-amber-700",
    tagClass: "bg-amber-50 text-amber-700 border-amber-200",
    chipHover: "hover:bg-amber-50 hover:border-amber-200 hover:shadow-md hover:shadow-amber-200/50",
    chipText: "group-hover/chip:text-amber-700",
    technologies: [
      { name: "Git", icon: gitIcon },
      { name: "GitHub", icon: githubIcon },
      { name: "GitLab", icon: gitlabIcon },
      { name: "Agile", icon: agileIcon },
    ],
    details: ["Scrum", "Kanban", "Code Review", "Testing"],
  },
]);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  const dots = el.value.querySelectorAll(".skill-dot");
  const cards = el.value.querySelectorAll(".skill-card");

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  gsap.set(dots, { scale: 0, opacity: 0 });
  gsap.set(cards, { opacity: 0, y: 40 });

  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.7 });

  const reveal = (i) => {
    tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" })
      .to(cards[i], { opacity: 1, y: 0, duration: 0.5 }, "<");
  };

  reveal(0);
  reveal(1);
  reveal(2);
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
.animate-fade-in-delay { opacity: 0; animation: fade-in 0.7s ease-out 0.15s forwards; }

.tech-chip {
  transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.tech-chip:hover {
  transform: translateY(-3px) scale(1.03);
}
</style>
