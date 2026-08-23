<template>
  <div
    ref="el"
    class="w-full min-h-screen bg-white pt-28 sm:pt-40 pb-20 px-4 sm:px-8 lg:px-14"
  >
    <div class="max-w-6xl mx-auto">
      <header ref="headerEl" class="text-center mb-16">
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none"
        >
          Compétences
        </h1>
        <p
          class="mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Technologies et outils que je maîtrise au quotidien pour concevoir,
          développer et déployer des applications web.
        </p>

        <div
          ref="statsEl"
          class="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10"
        >
          <div class="text-center">
            <div
              ref="statTech"
              class="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              0
            </div>
            <div class="text-sm text-gray-500 mt-1">Technologies</div>
          </div>
          <div class="text-center">
            <div
              ref="statDomains"
              class="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              0
            </div>
            <div class="text-sm text-gray-500 mt-1">Domaines</div>
          </div>
          <div class="text-center">
            <div
              ref="statYears"
              class="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              0
            </div>
            <div class="text-sm text-gray-500 mt-1">Années d'expérience</div>
          </div>
        </div>
      </header>

      <div
        ref="gridEl"
        class="skills-grid grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <article
          v-for="(item, index) in competences"
          :key="item.title"
          class="group skill-card"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            class="relative w-full rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            :class="item.borderTop"
          >
            <!-- Bannière -->
            <div class="relative h-36 overflow-hidden">
              <img
                :src="item.bgImage"
                alt=""
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div class="absolute inset-0" :class="item.overlay" />
              <div
                class="absolute top-3 left-3 right-3 flex items-center justify-between"
              >
                <span
                  class="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm bg-white/90 shadow-sm"
                  :class="item.badgeText"
                >
                  {{ item.technologies.length }} technos
                </span>
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  :class="item.iconBg"
                >
                  <component :is="item.icon" class="w-5 h-5 text-white" />
                </div>
              </div>
              <div class="absolute bottom-3 left-3 right-3">
                <h2
                  class="text-xl font-bold text-white leading-tight drop-shadow"
                >
                  {{ item.title }}
                </h2>
                <p class="text-xs text-white/90 font-medium">
                  {{ item.subtitle }}
                </p>
              </div>
            </div>

            <!-- Contenu -->
            <div class="bg-white p-5 flex flex-col gap-4 flex-1">
              <!-- Barre de niveau -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-gray-600">Niveau</span>
                  <span class="font-bold" :class="item.badgeText"
                    >{{ item.level }}%</span
                  >
                </div>
                <div
                  class="h-2 w-full rounded-full bg-gray-100 overflow-hidden"
                >
                  <div
                    class="skill-level h-full rounded-full transition-all duration-1000 ease-out"
                    :class="item.levelBg"
                    :data-level="item.level"
                    :style="{ width: '0%' }"
                  />
                </div>
              </div>

              <!-- Technologies -->
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="tech in item.technologies"
                  :key="tech.name"
                  class="tech-chip group/chip flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 cursor-default"
                  :class="item.chipHover"
                >
                  <div
                    class="w-7 h-7 flex items-center justify-center flex-shrink-0"
                  >
                    <img
                      :src="tech.icon"
                      :alt="tech.name"
                      class="w-5 h-5 object-contain transition-transform duration-300 group-hover/chip:scale-125 group-hover/chip:-rotate-6"
                    />
                  </div>
                  <span
                    class="text-xs font-semibold text-gray-700 truncate transition-colors duration-300"
                    :class="item.chipText"
                    >{{ tech.name }}</span
                  >
                </div>
              </div>

              <!-- Tags -->
              <div
                class="flex flex-wrap gap-1.5 pt-2 mt-auto border-t border-gray-100"
              >
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
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h, computed } from "vue";
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

const u = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const CodeIcon = {
  render: () =>
    h(
      "svg",
      {
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        "stroke-width": "1.8",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        }),
      ]
    ),
};

const ServerIcon = {
  render: () =>
    h(
      "svg",
      {
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        "stroke-width": "1.8",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
        }),
      ]
    ),
};

const ToolIcon = {
  render: () =>
    h(
      "svg",
      {
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        "stroke-width": "1.8",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        }),
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        }),
      ]
    ),
};

const el = ref(null);
const headerEl = ref(null);
const statsEl = ref(null);
const gridEl = ref(null);

const statTech = ref(null);
const statDomains = ref(null);
const statYears = ref(null);

const competences = ref([
  {
    title: "Front-End",
    subtitle: "Interfaces modernes",
    level: 85,
    icon: CodeIcon,
    bgImage: u("1581276879432-15e50529f34b"),
    overlay:
      "bg-gradient-to-t from-indigo-900/80 via-indigo-700/40 to-indigo-500/20",
    dotBg: "bg-indigo-500",
    borderTop: "border-t-2 border-t-indigo-500",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    badgeText: "text-indigo-700",
    levelBg: "bg-gradient-to-r from-indigo-500 to-purple-500",
    tagClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    chipHover:
      "hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-200/50",
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
    level: 75,
    icon: ServerIcon,
    bgImage: u("1558494949-ef010cbdcc31"),
    overlay:
      "bg-gradient-to-t from-emerald-900/80 via-emerald-700/40 to-emerald-500/20",
    dotBg: "bg-emerald-500",
    borderTop: "border-t-2 border-t-emerald-500",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    badgeText: "text-emerald-700",
    levelBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    chipHover:
      "hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-200/50",
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
    level: 80,
    icon: ToolIcon,
    bgImage: u("1556075798-4825dfaaf498"),
    overlay:
      "bg-gradient-to-t from-amber-900/80 via-amber-700/40 to-amber-500/20",
    dotBg: "bg-amber-400",
    borderTop: "border-t-2 border-t-amber-400",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    badgeText: "text-amber-700",
    levelBg: "bg-gradient-to-r from-amber-400 to-orange-500",
    tagClass: "bg-amber-50 text-amber-700 border-amber-200",
    chipHover:
      "hover:bg-amber-50 hover:border-amber-200 hover:shadow-md hover:shadow-amber-200/50",
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

const uniqueTechnologies = computed(() => {
  const techs = new Set();
  competences.value.forEach((c) => c.tags.forEach((t) => techs.add(t)));
  return techs.size;
});

const animateStats = () => {
  const targets = [
    { el: statTech.value, value: uniqueTechnologies.value },
    { el: statDomains.value, value: competences.value.length },
    { el: statYears.value, value: 3 },
  ];

  targets.forEach(({ el, value }) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.5,
        ease: "power2.out",
        snap: { innerText: 1 },
      }
    );
  });
};

const animateLevels = () => {
  const bars = el.value?.querySelectorAll(".skill-level") ?? [];
  bars.forEach((bar) => {
    const level = bar.dataset.level;
    gsap.fromTo(bar, { width: "0%" }, { width: `${level}%`, duration: 1.2, ease: "power3.out" });
  });
};

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  const cards = el.value.querySelectorAll(".skill-card");

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  gsap.set(statsEl.value, { opacity: 0, y: 20 });
  gsap.set(cards, { opacity: 0, y: 50 });

  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.7 })
    .to(statsEl.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
    .add(() => animateStats(), "-=0.4")
    .to(
      cards,
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
      "-=0.6"
    )
    .add(() => animateLevels(), "-=0.4");

  // Effet tilt 3D au survol des cartes
  cards.forEach((article) => {
    const card = article.querySelector("div");
    if (!card) return;

    article.addEventListener("mousemove", (e) => {
      const rect = article.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    article.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skills-grid {
  perspective: 1000px;
}

.skill-card > div {
  transform-style: preserve-3d;
}

.tech-chip {
  transition: transform 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
}

.tech-chip:hover {
  transform: translateY(-3px) scale(1.03);
}
</style>
