<template>
  <div ref="el">
    <section
      aria-labelledby="projects-title"
      class="relative py-24 lg:py-32"
    >
      <header
        ref="headerEl"
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <h2
          id="projects-title"
          data-tower-anchor="projects"
          class="text-3xl font-bold tracking-tight text-paper"
        >
          Projets
          <sup class="ml-2 align-super font-mono text-xs font-normal text-brand-text">
            ({{ String(projects.length).padStart(2, "0") }})
          </sup>
        </h2>
        <p class="max-w-[360px] text-sm leading-relaxed text-paper/50 sm:text-right">
          Du SaaS aux outils pour développeurs. Clique sur un nom pour ouvrir le projet.
        </p>
      </header>

      <div
        class="mt-14 hidden grid-cols-[56px_1fr_220px_64px] border-b border-line/15 pb-4 font-mono text-[11px] uppercase tracking-widest text-paper/50 lg:grid"
        aria-hidden="true"
      >
        <span>N°</span>
        <span>Projet</span>
        <span>Catégorie</span>
        <span></span>
      </div>

      <ol ref="listEl" class="mt-10 border-t border-line/15 lg:mt-0 lg:border-t-0">
        <li
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-row border-b border-line/15"
        >
          <div
            class="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-x-2 py-5 lg:grid-cols-[56px_minmax(0,1fr)_220px_64px] lg:gap-x-0 lg:py-6"
          >
            <span
              class="font-mono text-xs transition-colors duration-300"
              :class="openIndex === index ? 'text-brand-text' : 'text-paper/50'"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <div class="min-w-0">
              <button
                type="button"
                :id="`project-title-${project.id}`"
                :aria-expanded="openIndex === index"
                :aria-controls="`project-panel-${project.id}`"
                class="project-title block max-w-full text-left font-sans font-extrabold leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                :class="openIndex === index ? 'is-open' : 'is-closed'"
                @click="openIndex = index"
              >
                {{ project.title }}
              </button>
              <p
                class="mt-2 font-mono text-[11px] uppercase tracking-widest text-paper/50 lg:hidden"
              >
                {{ project.category }} · {{ project.altitude }} m
              </p>
            </div>

            <div class="hidden font-mono text-xs uppercase lg:block">
              <p class="tracking-widest text-paper/80">{{ project.category }}</p>
              <p class="mt-2 normal-case text-paper/50">{{ project.altitude }} m</p>
            </div>

            <div class="flex justify-end">
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Ouvrir ${project.title} (nouvel onglet)`"
                class="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:h-[52px] lg:w-[52px]"
                :class="
                  openIndex === index
                    ? 'border-ink bg-ink text-page'
                    : 'border-line/25 text-paper'
                "
              >
                <svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" /></svg>
              </a>
            </div>
          </div>

          <div
            :id="`project-panel-${project.id}`"
            role="region"
            :aria-labelledby="`project-title-${project.id}`"
            :inert="openIndex !== index"
            class="project-panel grid lg:pl-[56px]"
            :class="{ 'is-open': openIndex === index }"
            @transitionend="onPanelEnd"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                class="grid gap-10 pb-12 pt-2 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:gap-16 lg:pb-14"
              >
                <div class="relative pb-3.5 pr-3.5">
                  <div
                    class="absolute inset-0 left-3.5 top-3.5 rounded-xl border border-brand/60"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="relative overflow-hidden rounded-xl border border-line/15 bg-surface shadow-2xl shadow-black/50"
                  >
                    <div class="flex h-9 items-center gap-3 border-b border-line/15 bg-page px-3">
                      <span class="flex gap-1.5">
                        <span class="h-2.5 w-2.5 rounded-full bg-paper/20"></span>
                        <span class="h-2.5 w-2.5 rounded-full bg-paper/20"></span>
                        <span class="h-2.5 w-2.5 rounded-full bg-paper/20"></span>
                      </span>
                      <span class="min-w-0 truncate font-mono text-[11px] text-paper/50">
                        {{ hostname(project.link) }}
                      </span>
                    </div>
                    <img
                      :src="project.image"
                      :alt="`Capture d'écran du projet ${project.title}`"
                      loading="lazy"
                      class="aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div class="min-w-0">
                  <p class="max-w-[460px] text-xl leading-snug text-paper sm:text-2xl">
                    {{ project.description }}
                  </p>

                  <dl
                    class="mt-8 grid max-w-[460px] grid-cols-[4.5rem_1fr] items-center gap-y-3 border-t border-line/15 pt-6"
                  >
                    <dt class="font-mono text-[11px] uppercase tracking-widest text-paper/50">
                      Stack
                    </dt>
                    <dd class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in project.tags"
                        :key="tag"
                        class="rounded-full border border-line/20 px-3 py-1 font-mono text-xs text-paper/80"
                      >
                        {{ tag }}
                      </span>
                    </dd>
                    <dt class="font-mono text-[11px] uppercase tracking-widest text-paper/50">
                      Site
                    </dt>
                    <dd class="min-w-0 break-all font-mono text-sm text-paper/80">
                      {{ hostname(project.link) }}
                    </dd>
                  </dl>

                  <a
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-page transition-colors duration-300 hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Voir le projet
                    <svg viewBox="0 0 16 16" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" /></svg>
                    <span class="sr-only">(nouvel onglet)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>

      <footer
        class="flex items-center justify-between gap-4 pt-6 font-mono text-[11px] uppercase tracking-widest text-paper/50"
      >
        <span>Index — {{ String(projects.length).padStart(2, "0") }} projets</span>
        <span>
          Altitude actuelle :
          <span class="ml-1 text-brand-text">{{ projects[openIndex].altitude }} M</span>
        </span>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import spotifyImage from "../assets/images/projects/spotify.webp";
import adiImage from "../assets/images/projects/adi.webp";
import Hovly from "../assets/images/projects/hovly.webp";
import GitAgent from "../assets/images/projects/git-agent.webp";
import Postulo from "../assets/images/projects/postulo.webp";

gsap.registerPlugin(ScrollTrigger);

const el = ref(null);
const headerEl = ref(null);
const listEl = ref(null);
const openIndex = ref(0);

const projects = ref([
  {
    id: 0,
    title: "SpotCalendar",
    description:
      "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify.",
    image: spotifyImage,
    link: "https://spotcalendar.fr",
    tags: ["Spotify API", "Vue.js", "Music"],
    category: "Web App",
    altitude: 57,
  },
  {
    id: 1,
    title: "Git Agent",
    description:
      "Assistant CLI qui génère messages de commit, noms de branches, et s'intègre à Jira et GitHub.",
    image: GitAgent,
    link: "https://git-agent-steel.vercel.app/",
    tags: ["IA", "CLI", "Node.js"],
    category: "Outil",
    altitude: 115,
  },
  {
    id: 2,
    title: "Hovly",
    description: "Crée ton tableau de bord immobilier en moins d'une minute.",
    image: Hovly,
    link: "https://hovly-production.up.railway.app/",
    tags: ["IA", "Vue.js", "UX", "PDF"],
    category: "SaaS",
    altitude: 180,
  },
  {
    id: 3,
    title: "ADI",
    description:
      "Refonte complète du site de la société ADI, spécialisée dans l'agencement immobilier.",
    image: adiImage,
    link: "https://agencementimmo.vercel.app/",
    tags: ["Vue.js", "Tailwind", "Responsive"],
    category: "Refonte",
    altitude: 276,
  },
  {
    id: 4,
    title: "Postulo",
    description:
      "Connecte vos étudiants à votre tableau de bord. Pour les CFA et écoles en recherche d'alternance.",
    image: Postulo,
    link: "https://postulo.fr",
    tags: ["SaaS", "Vue.js", "Dashboard"],
    category: "SaaS",
    altitude: 320,
  },
]);

const hostname = (link) => new URL(link).hostname.replace(/^www\./, "");

const onPanelEnd = (event) => {
  if (event.target === event.currentTarget && event.propertyName === "grid-template-rows") {
    ScrollTrigger.refresh();
  }
};

let ctx = null;

onMounted(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  ctx = gsap.context(() => {
    const rows = listEl.value.querySelectorAll(".project-row");
    gsap.set([headerEl.value, rows], { opacity: 0, y: 24 });

    ScrollTrigger.create({
      trigger: headerEl.value,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(headerEl.value, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
    });

    ScrollTrigger.create({
      trigger: listEl.value,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(rows, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
        }),
    });
  }, el.value);
});

onUnmounted(() => {
  ctx?.revert();
  ctx = null;
});
</script>

<style scoped>
.project-title {
  font-size: clamp(1.75rem, 8.5vw, 4rem);
  letter-spacing: -0.04em;
  transition:
    color 0.4s ease,
    -webkit-text-stroke-color 0.4s ease;
}

@media (min-width: 1024px) {
  .project-title {
    font-size: clamp(3rem, 8vw, 7.5rem);
  }
}

.project-title.is-open {
  color: rgb(var(--paper));
  -webkit-text-stroke: 0 transparent;
}

.project-title.is-closed {
  color: transparent;
  -webkit-text-stroke: 1px rgb(var(--paper) / 0.35);
}

.project-title.is-closed:hover,
.project-title.is-closed:focus-visible {
  color: rgb(var(--brand-text) / 0.08);
  -webkit-text-stroke-color: rgb(var(--brand-text));
}

.project-panel {
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s ease;
}

.project-panel.is-open {
  grid-template-rows: 1fr;
}

@media (prefers-reduced-motion: reduce) {
  .project-title,
  .project-panel {
    transition: none;
  }
}
</style>
