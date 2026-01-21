<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
    <header class="mb-16 text-center">
      <h1
        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 animate-fade-in tracking-tight"
      >
        Parcours
      </h1>
      <p
        class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in-delay font-light"
      >
        Mon parcours académique et mes formations.
      </p>
    </header>

    <div class="max-w-3xl mx-auto">
      <div class="relative">
        <div
          class="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200"
        ></div>

        <div class="space-y-12">
          <article
            v-for="(item, index) in educationList"
            :key="index"
            class="relative pl-12 sm:pl-20 group"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <div
              class="absolute left-0 sm:left-4 top-1 w-8 h-8 rounded-full border-4 border-gray-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 card-animate"
              :class="item.dotColor"
            >
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>

            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 card-animate"
              :class="item.badgeClass"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ item.years }}
            </div>

            <div
              class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-1 card-animate"
            >
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                    {{ item.title }}
                  </h2>
                  <div class="flex items-center gap-2 mt-2 text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span class="text-sm font-medium">{{ item.institution }}</span>
                  </div>
                </div>
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  :class="item.iconBg"
                >
                  <component :is="item.icon" class="w-6 h-6 text-white" />
                </div>
              </div>

              <p class="text-gray-500 leading-relaxed">
                {{ item.description }}
              </p>

              <!-- Tags -->
              <div class="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="px-3 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";

const GraduationIcon = {
  render() {
    return h(
      "svg",
      { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 14l9-5-9-5-9 5 9 5z",
        }),
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
        }),
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
        }),
      ]
    );
  },
};

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

const RocketIcon = {
  render() {
    return h(
      "svg",
      { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
        }),
      ]
    );
  },
};

const educationList = ref([
  {
    title: "Baccalauréat STI2D",
    institution: "Lycée Pierre de Coubertin",
    years: "2020 - 2022",
    description:
      "Formation technologique axée sur l'innovation, l'ingénierie et le développement durable. Première approche de la programmation et des systèmes numériques.",
    icon: GraduationIcon,
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    dotColor: "bg-gradient-to-br from-amber-500 to-orange-600",
    badgeClass: "bg-amber-50 text-amber-700",
    tags: ["Innovation", "Ingénierie", "Développement durable"],
  },
  {
    title: "BUT MMI",
    institution: "Université Gustave Eiffel",
    years: "2022 - 2025",
    description:
      "Formation polyvalente en multimédia, communication et développement web. Acquisition de compétences en design, UX/UI et technologies front-end/back-end.",
    icon: CodeIcon,
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    dotColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
    badgeClass: "bg-indigo-50 text-indigo-700",
    tags: ["Web", "Multimédia", "UX/UI", "Communication"],
  },
  {
    title: "Mastère Dev Manager Full Stack",
    institution: "Efrei",
    years: "2025 - 2027",
    description:
      "Formation de haut niveau pour maîtriser les technologies back-end et front-end. Focus sur le management technique et l'architecture logicielle.",
    icon: RocketIcon,
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    dotColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    badgeClass: "bg-emerald-50 text-emerald-700",
    tags: ["Full Stack", "Management", "Architecture"],
  },
]);
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
