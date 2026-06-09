<template>
  <div ref="el" class="min-h-screen bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
    <header ref="headerEl" class="mb-16 text-center">
      <h1
        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 animate-fade-in tracking-tight"
      >
        Compétences
      </h1>
      <p
        class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in-delay font-light"
      >
        Technologies et outils que je maîtrise au quotidien.
      </p>
    </header>

    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article
          v-for="(competence, index) in competences"
          :key="competence.title"
          class="group skill-card"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            class="bg-white rounded-2xl p-8 h-full shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-1 card-animate"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                :class="competence.iconBg"
              >
                <component :is="competence.icon" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">
                  {{ competence.title }}
                </h2>
                <p class="text-sm text-gray-500">{{ competence.subtitle }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="tech in competence.technologies"
                :key="tech.name"
                class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100/80 transition-all duration-300"
              >
                <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <img
                    :src="tech.icon"
                    :alt="tech.name"
                    class="w-6 h-6 object-contain"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700">{{ tech.name }}</span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-100">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="detail in competence.details"
                  :key="detail"
                  class="px-3 py-1 text-xs font-medium rounded-full"
                  :class="competence.tagClass"
                >
                  {{ detail }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

import htmlIcon from "@/assets/front-end/html5.svg";
import cssIcon from "@/assets/front-end/css-old.svg";
import jsIcon from "@/assets/front-end/javascript.svg";
import vueIcon from "@/assets/front-end/vue.svg";
import reactIcon from "@/assets/front-end/react-wordmark-light.svg";
import tailwindIcon from "@/assets/front-end/tailwindcss.svg";
import tsIcon from "@/assets/front-end/typescript.svg";
import dockerIcon from "@/assets/back-end/docker.svg";
import mysqlIcon from "@/assets/back-end/mysql.svg";
import nodeIcon from "@/assets/back-end/nodejs.svg";
import phpIcon from "@/assets/back-end/php.svg";
import symfonyIcon from "@/assets/back-end/symfony.png";
import gitIcon from "@/assets/gestion-de-projet/git.svg";
import githubIcon from "@/assets/gestion-de-projet/github-light.svg";
import gitlabIcon from "@/assets/gestion-de-projet/gitlab.svg";
import agileIcon from "@/assets/gestion-de-projet/agile.png";
import kanbanIcon from "@/assets/gestion-de-projet/kanban.png";

const CodeIcon = {
  render() {
    return h(
      "svg",
      { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        }),
      ]
    );
  },
};

const ServerIcon = {
  render() {
    return h(
      "svg",
      { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
        }),
      ]
    );
  },
};

const ToolIcon = {
  render() {
    return h(
      "svg",
      { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        }),
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        }),
      ]
    );
  },
};

const el = ref(null);
const headerEl = ref(null);

const competences = ref([
  {
    title: "Front-End",
    subtitle: "Interfaces modernes",
    icon: CodeIcon,
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    tagClass: "bg-indigo-50 text-indigo-600",
    technologies: [
      { name: "Vue.js", icon: vueIcon },
      { name: "React", icon: reactIcon },
      { name: "TypeScript", icon: tsIcon },
      { name: "Tailwind CSS", icon: tailwindIcon },
    ],
    details: ["Responsive", "SPA", "SSR", "Animations"],
  },
  {
    title: "Back-End",
    subtitle: "Serveurs & APIs",
    icon: ServerIcon,
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    tagClass: "bg-emerald-50 text-emerald-600",
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
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    tagClass: "bg-amber-50 text-amber-600",
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

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.8 });

  const articles = el.value.querySelectorAll(".skill-card");
  gsap.set(articles, { opacity: 0, y: 50 });
  tl.to(articles, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, "-=0.4");
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-delay {
  opacity: 0;
  animation: fade-in 0.8s ease-out 0.15s forwards;
}

.card-animate {
  animation: fade-up 0.6s ease-out forwards;
  animation-delay: inherit;
  opacity: 0;
}
</style>
