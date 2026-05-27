<template>
  <div ref="el" class="h-full bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-10 gap-8 overflow-hidden">

    <header ref="headerEl" class="text-center">
      <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none animate-fade-in">
        Parcours
      </h1>
      <p class="mt-2 text-sm text-gray-400 italic animate-fade-in-delay">
        Mon parcours académique et mes formations.
      </p>
    </header>

    <div class="relative">

      <div class="hidden lg:block absolute top-4 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-500 rounded-full" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in educationList"
          :key="index"
          class="flex flex-col items-center gap-4 edu-card"
          :class="['item-' + index]"
        >
          <div
            class="w-8 h-8 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10"
            :class="item.dotBg"
          />

          <div
            class="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            :class="item.borderTop"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-3 py-1 rounded-full" :class="item.badgeClass">
                {{ item.years }}
              </span>
              <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="item.iconBg">
                <component :is="item.icon" class="w-5 h-5 text-white" />
              </div>
            </div>

            <div>
              <h2 class="text-base font-bold text-gray-900 leading-tight">{{ item.title }}</h2>
              <p class="text-xs text-gray-400 font-medium mt-0.5">{{ item.institution }}</p>
            </div>

            <p class="text-xs text-gray-500 leading-relaxed">{{ item.description }}</p>

            <div class="flex flex-wrap gap-1.5 pt-1 border-t border-gray-100">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs font-medium rounded-full border"
                :class="item.tagClass"
              >
                {{ tag }}
              </span>
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

const el = ref(null);
const headerEl = ref(null);

const GraduationIcon = {
  render: () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "1.8" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 14l9-5-9-5-9 5 9 5z" }),
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" }),
  ]),
};

const CodeIcon = {
  render: () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "1.8" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }),
  ]),
};

const RocketIcon = {
  render: () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "stroke-width": "1.8" }, [
    h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" }),
  ]),
};

const educationList = ref([
  {
    title: "Baccalauréat STI2D",
    institution: "Lycée Pierre de Coubertin",
    years: "2020 – 2022",
    description: "Formation technologique axée sur l'innovation, l'ingénierie et le développement durable. Première approche de la programmation.",
    icon: GraduationIcon,
    dotBg: "bg-amber-400",
    borderTop: "border-t-2 border-t-amber-400",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    badgeClass: "bg-amber-50 text-amber-700",
    tagClass: "bg-amber-50 text-amber-700 border-amber-200",
    tags: ["Innovation", "Ingénierie", "Numérique"],
  },
  {
    title: "BUT MMI",
    institution: "Université Gustave Eiffel",
    years: "2022 – 2025",
    description: "Formation polyvalente en multimédia, communication et développement web. Compétences en design, UX/UI et technologies front-end/back-end.",
    icon: CodeIcon,
    dotBg: "bg-indigo-500",
    borderTop: "border-t-2 border-t-indigo-500",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    badgeClass: "bg-indigo-50 text-indigo-700",
    tagClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    tags: ["Web", "UX/UI", "Multimédia"],
  },
  {
    title: "Mastère Dev Manager Full Stack",
    institution: "Efrei",
    years: "2025 – 2027",
    description: "Formation de haut niveau pour maîtriser les technologies back-end et front-end. Focus sur le management technique et l'architecture.",
    icon: RocketIcon,
    dotBg: "bg-emerald-500",
    borderTop: "border-t-2 border-t-emerald-500",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    badgeClass: "bg-emerald-50 text-emerald-700",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tags: ["Full Stack", "Management", "Architecture"],
  },
]);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.8 });

  const cards = el.value.querySelectorAll(".edu-card");
  gsap.set(cards, { opacity: 0, y: 60 });
  tl.to(cards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, "-=0.4");
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
.animate-fade-in-delay { opacity: 0; animation: fade-in 0.7s ease-out 0.15s forwards; }

.item-0 { animation: fade-in 0.5s ease-out 0.1s both; }
.item-1 { animation: fade-in 0.5s ease-out 0.25s both; }
.item-2 { animation: fade-in 0.5s ease-out 0.4s both; }
</style>
