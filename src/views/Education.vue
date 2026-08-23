<template>
  <div
    ref="el"
    class="no-scrollbar w-full h-screen bg-white pt-20 sm:pt-24 pb-6 px-4 sm:px-8 lg:px-14 overflow-hidden flex flex-col"
  >
    <div class="max-w-5xl mx-auto w-full flex flex-col h-full">
      <header ref="headerEl" class="text-center mb-4 sm:mb-6 shrink-0">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-none"
        >
          Parcours
        </h1>
        <p
          class="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Mon parcours académique et mes formations, du lycée au mastère.
        </p>
      </header>

      <div ref="timelineEl" class="relative flex-1 min-h-0">
        <!-- Ligne verticale centrale -->
        <div
          class="hidden md:block absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-gray-100 timeline-line"
        />
        <div
          class="hidden md:block absolute left-1/2 top-2 w-0.5 h-0 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-indigo-500 to-emerald-500 timeline-progress"
        />

        <!-- Ligne verticale mobile -->
        <div
          class="md:hidden absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100 timeline-line-mobile"
        />
        <div
          class="md:hidden absolute left-6 top-2 w-0.5 h-0 bg-gradient-to-b from-amber-400 via-indigo-500 to-emerald-500 timeline-progress-mobile"
        />

        <div class="space-y-4 md:space-y-0 h-full flex flex-col md:block justify-center">
          <div
            v-for="(item, index) in educationList"
            :key="index"
            class="relative md:grid md:grid-cols-2 md:gap-6 edu-row"
            :class="index !== educationList.length - 1 ? 'md:pb-4' : ''"
          >
            <!-- Point sur la timeline -->
            <div
              class="absolute left-6 md:left-1/2 top-4 md:top-6 z-10 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md edu-dot"
              :class="item.dotBg"
            />

            <!-- Carte -->
            <div
              class="edu-card pl-14 md:pl-0"
              :class="index % 2 === 0 ? 'md:col-start-1 md:col-end-2 md:pr-10' : 'md:col-start-2 md:col-end-3 md:pl-10'"
            >
              <div
                class="group relative rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
                :class="item.borderTop"
              >
                <div class="flex flex-col sm:flex-row">
                  <!-- Bannière image -->
                  <div class="relative w-full sm:w-32 md:w-36 h-24 sm:h-auto shrink-0 overflow-hidden">
                    <img
                      :src="item.bgImage"
                      alt=""
                      class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div class="absolute inset-0" :class="item.overlay" />
                    <div
                      class="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center shadow-md"
                      :class="item.iconBg"
                    >
                      <component :is="item.icon" class="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <!-- Contenu -->
                  <div class="p-3 sm:p-4 flex flex-col gap-1.5 flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div class="min-w-0">
                        <h2
                          class="text-sm sm:text-base font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors"
                        >
                          {{ item.title }}
                        </h2>
                        <p class="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">
                          {{ item.institution }}
                        </p>
                      </div>
                      <span
                        class="shrink-0 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm bg-white border shadow-sm"
                        :class="item.badgeText + ' ' + item.tagClass.replace('bg-', 'border-').replace('text-', '')"
                      >
                        {{ item.years }}
                      </span>
                    </div>

                    <p class="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {{ item.description }}
                    </p>

                    <div class="flex flex-wrap gap-1 mt-auto pt-1 border-t border-gray-100">
                      <span
                        v-for="tag in item.tags"
                        :key="tag"
                        class="px-1.5 py-0.5 text-[10px] font-medium rounded-full border"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import gsap from "gsap";
import { useEnterAnimation } from "../composables/useEnterAnimation.js";

const u = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const el = ref(null);
const headerEl = ref(null);
const timelineEl = ref(null);

const GraduationIcon = {
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
          d: "M12 14l9-5-9-5-9 5 9 5z",
        }),
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
        }),
      ]
    ),
};

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

const RocketIcon = {
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
          d: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
        }),
      ]
    ),
};

const educationList = ref([
  {
    title: "Baccalauréat STI2D",
    institution: "Lycée Pierre de Coubertin",
    years: "2020 – 2022",
    description:
      "Formation technologique axée sur l'innovation, l'ingénierie et le développement durable.",
    icon: GraduationIcon,
    bgImage: u("1509062522246-3755977927d7"),
    overlay:
      "bg-gradient-to-t from-amber-900/70 via-amber-700/30 to-transparent",
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
    description:
      "Formation en multimédia, communication et développement web. Design, UX/UI et technologies front/back-end.",
    icon: CodeIcon,
    bgImage: u("1497633762265-9d179a990aa6"),
    overlay:
      "bg-gradient-to-t from-indigo-900/70 via-indigo-700/30 to-transparent",
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
    description:
      "Formation de haut niveau pour maîtriser les technologies back-end et front-end. Management et architecture.",
    icon: RocketIcon,
    bgImage: u("1524178232363-1fb2b075b655"),
    overlay:
      "bg-gradient-to-t from-emerald-900/70 via-emerald-700/30 to-transparent",
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
  const progress = el.value.querySelector(".timeline-progress");
  const progressMobile = el.value.querySelector(".timeline-progress-mobile");
  const rows = el.value.querySelectorAll(".edu-row");

  gsap.set(headerEl.value, { opacity: 0, y: -20 });
  gsap.set(dots, { scale: 0, opacity: 0 });
  gsap.set(cards, { opacity: 0, y: 30 });

  tl.to(headerEl.value, { opacity: 1, y: 0, duration: 0.6 });

  if (progress) {
    tl.to(
      progress,
      { height: "100%", duration: 1, ease: "none" },
      "-=0.3"
    );
  }
  if (progressMobile) {
    tl.to(
      progressMobile,
      { height: "100%", duration: 1, ease: "none" },
      "-=1"
    );
  }

  rows.forEach((row, i) => {
    const dot = row.querySelector(".edu-dot");
    const card = row.querySelector(".edu-card");

    tl.to(
      dot,
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
      `-=${i === 0 ? 0.7 : 0.45}`
    );

    const xOffset = window.innerWidth >= 768 ? (i % 2 === 0 ? -30 : 30) : 0;
    gsap.set(card, { x: xOffset });
    tl.to(
      card,
      { opacity: 1, y: 0, x: 0, duration: 0.5, ease: "power3.out" },
      "<"
    );
  });
});
</script>

<style scoped>
.timeline-line,
.timeline-line-mobile {
  transform-origin: top center;
}

.timeline-progress,
.timeline-progress-mobile {
  transform-origin: top center;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
