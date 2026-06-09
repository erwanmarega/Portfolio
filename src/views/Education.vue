<template>
  <div ref="el" class="w-full min-h-screen bg-white pt-28 sm:pt-40 pb-12 px-4 sm:px-8 lg:px-14">

    <header ref="headerEl" class="text-center mb-12">
      <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none animate-fade-in">
        Parcours
      </h1>
      <p class="mt-2 text-sm text-gray-400 italic animate-fade-in-delay">
        Mon parcours académique et mes formations.
      </p>
    </header>

    <div class="relative px-4 sm:px-8 lg:px-14">

      <div class="hidden lg:block absolute top-4 left-[16.6%] w-[33.3%] h-0.5 origin-left bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full edu-line edu-line-1" />
      <div class="hidden lg:block absolute top-4 left-1/2 w-[33.3%] h-0.5 origin-left bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full edu-line edu-line-2" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in educationList"
          :key="index"
          class="flex flex-col items-center gap-4"
        >
          <div
            class="w-8 h-8 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10 edu-dot"
            :class="item.dotBg"
          />

          <div
            class="relative w-full rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg edu-card"
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
                  {{ item.years }}
                </span>
                <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md" :class="item.iconBg">
                  <component :is="item.icon" class="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div class="bg-white p-5 flex flex-col gap-3 flex-1">
              <div>
                <h2 class="text-base font-bold text-gray-900 leading-tight">{{ item.title }}</h2>
                <p class="text-xs text-gray-400 font-medium mt-0.5">{{ item.institution }}</p>
              </div>

              <p class="text-xs text-gray-500 leading-relaxed">{{ item.description }}</p>

              <div class="flex flex-wrap gap-1.5 pt-1 mt-auto border-t border-gray-100">
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
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";
import classroomImg from "../assets/education/classroom.jpg";
import booksImg from "../assets/education/books.jpg";
import codeImg from "../assets/education/code.jpg";

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
    bgImage: classroomImg,
    overlay: "bg-gradient-to-t from-amber-900/70 via-amber-700/30 to-transparent",
    dotBg: "bg-amber-400",
    borderTop: "border-t-2 border-t-amber-400",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    badgeText: "text-amber-700",
    tagClass: "bg-amber-50 text-amber-700 border-amber-200",
    tags: ["Innovation", "Ingénierie", "Numérique"],
  },
  {
    title: "BUT MMI",
    institution: "Université Gustave Eiffel",
    years: "2022 – 2025",
    description: "Formation en multimédia, communication et développement web. Compétences en design, UX/UI et technologies front-end/back-end.",
    icon: CodeIcon,
    bgImage: booksImg,
    overlay: "bg-gradient-to-t from-indigo-900/70 via-indigo-700/30 to-transparent",
    dotBg: "bg-indigo-500",
    borderTop: "border-t-2 border-t-indigo-500",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    badgeText: "text-indigo-700",
    tagClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    tags: ["Web", "UX/UI", "Multimédia"],
  },
  {
    title: "Mastère Dev Manager Full Stack",
    institution: "Efrei",
    years: "2025 – 2027",
    description: "Formation de haut niveau pour maîtriser les technologies back-end et front-end. Focus sur le management technique et l'architecture.",
    icon: RocketIcon,
    bgImage: codeImg,
    overlay: "bg-gradient-to-t from-emerald-900/70 via-emerald-700/30 to-transparent",
    dotBg: "bg-emerald-500",
    borderTop: "border-t-2 border-t-emerald-500",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    badgeText: "text-emerald-700",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tags: ["Full Stack", "Management", "Architecture"],
  },
]);

useEnterAnimation(el, () => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  const dots = el.value.querySelectorAll(".edu-dot");
  const cards = el.value.querySelectorAll(".edu-card");
  const line1 = el.value.querySelector(".edu-line-1");
  const line2 = el.value.querySelector(".edu-line-2");

  gsap.set(headerEl.value, { opacity: 0, y: -30 });
  gsap.set(dots, { scale: 0, opacity: 0 });
  gsap.set(cards, { opacity: 0, y: 40 });
  gsap.set([line1, line2], { scaleX: 0 });

  // reveal one step: dot pops in + its card rises
  const reveal = (i) => {
    tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" })
      .to(cards[i], { opacity: 1, y: 0, duration: 0.5 }, "<");
  };

  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.7 });

  reveal(0);                                                    // bulle 1
  tl.to(line1, { scaleX: 1, duration: 0.4, ease: "none" });     // trace vers bulle 2
  reveal(1);                                                    // bulle 2
  tl.to(line2, { scaleX: 1, duration: 0.4, ease: "none" });     // trace vers bulle 3
  reveal(2);                                                    // bulle 3
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
.animate-fade-in-delay { opacity: 0; animation: fade-in 0.7s ease-out 0.15s forwards; }
</style>
