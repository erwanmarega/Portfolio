<template>
  <div ref="el">
    <section aria-labelledby="projects-title" class="relative py-24 lg:py-32">
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
            ({{ String(visibleProjects.length).padStart(2, "0") }})
          </sup>
        </h2>
        <p class="max-w-[360px] text-sm leading-relaxed text-paper/50 sm:text-right">
          Du SaaS aux outils pour développeurs, jusqu'à la chaîne qui les met en production. Clique
          sur un nom pour ouvrir le projet.
        </p>
      </header>

      <div
        role="group"
        aria-label="Filtrer les projets par type"
        class="mt-10 flex flex-wrap gap-2"
      >
        <button
          v-for="f in FILTERS"
          :key="f.id"
          type="button"
          :aria-pressed="filter === f.id"
          class="inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 font-mono text-xs uppercase tracking-widest transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          :class="
            filter === f.id
              ? 'border-brand bg-brand text-page'
              : 'border-line/25 text-paper/70 hover:border-brand hover:text-paper'
          "
          @click="filter = f.id"
        >
          {{ f.label }}
          <span class="opacity-60">{{ String(countFor(f.id)).padStart(2, "0") }}</span>
        </button>
      </div>

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
          v-for="(project, index) in visibleProjects"
          :key="project.id"
          class="project-row relative border-b border-line/15"
        >
          <span
            class="row-line pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-line/15 opacity-0"
            aria-hidden="true"
          ></span>
          <div
            class="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-x-2 py-5 lg:grid-cols-[56px_minmax(0,1fr)_220px_64px] lg:gap-x-0 lg:py-6"
          >
            <span
              class="row-num font-mono text-xs transition-colors duration-300"
              :class="openId === project.id ? 'text-brand-text' : 'text-paper/50'"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <div class="min-w-0">
              <button
                :id="`project-title-${project.id}`"
                type="button"
                :aria-expanded="openId === project.id"
                :aria-controls="`project-panel-${project.id}`"
                class="project-title block max-w-full text-left font-sans font-extrabold leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                :class="openId === project.id ? 'is-open' : 'is-closed'"
                @click="openId = project.id"
              >
                {{ project.title }}
              </button>
              <p
                class="row-cat mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-paper/50 lg:hidden"
              >
                {{ project.category }} · {{ project.altitude }} m
                <span class="kind-badge" :class="`kind-${kindOf(project)}`">
                  {{ KIND_LABELS[kindOf(project)] }}
                </span>
              </p>
            </div>

            <div class="row-cat hidden font-mono text-xs uppercase lg:block">
              <p class="flex items-center gap-2 tracking-widest text-paper/80">
                {{ project.category }}
                <span class="kind-badge" :class="`kind-${kindOf(project)}`">
                  {{ KIND_LABELS[kindOf(project)] }}
                </span>
              </p>
              <p class="mt-2 normal-case text-paper/50">{{ project.altitude }} m</p>
            </div>

            <div class="row-cta flex justify-end">
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Ouvrir ${project.title} (nouvel onglet)`"
                class="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:h-[52px] lg:w-[52px]"
                :class="
                  openId === project.id
                    ? 'border-ink bg-ink text-page'
                    : 'border-line/25 text-paper'
                "
              >
                <svg
                  viewBox="0 0 16 16"
                  class="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
                </svg>
              </a>
            </div>
          </div>

          <div
            :id="`project-panel-${project.id}`"
            role="region"
            :aria-labelledby="`project-title-${project.id}`"
            :inert="openId !== project.id"
            class="project-panel grid lg:pl-[56px]"
            :class="{ 'is-open': openId === project.id }"
            @transitionend="onPanelEnd"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                class="grid gap-10 pb-12 pt-2 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:gap-16 lg:pb-14"
              >
                <div
                  class="shot-tilt relative pb-3.5 pr-3.5"
                  @pointermove="onTiltMove"
                  @pointerleave="onTiltLeave"
                >
                  <div
                    class="shot-offset absolute inset-0 left-3.5 top-3.5 rounded-xl border border-brand/60"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="shot-frame relative overflow-hidden rounded-xl border border-line/15 bg-surface shadow-2xl shadow-black/50"
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
                      class="shot-img aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div class="min-w-0">
                  <p class="panel-reveal max-w-[460px] text-xl leading-snug text-paper sm:text-2xl">
                    {{ project.description }}
                  </p>

                  <dl
                    class="panel-reveal mt-8 grid max-w-[460px] grid-cols-[4.5rem_1fr] items-center gap-y-3 border-t border-line/15 pt-6"
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
                    <template v-if="project.pipeline">
                      <dt
                        class="self-start pt-1 font-mono text-[11px] uppercase tracking-widest text-paper/50"
                      >
                        Pipeline
                      </dt>
                      <dd>
                        <ol class="flex flex-wrap items-center gap-2 font-mono text-xs">
                          <li
                            v-for="(step, i) in project.pipeline"
                            :key="step"
                            class="flex items-center gap-2"
                          >
                            <span v-if="i" class="text-brand-text" aria-hidden="true">→</span>
                            <span
                              class="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-paper/80"
                            >
                              {{ step }}
                            </span>
                          </li>
                        </ol>
                      </dd>
                    </template>
                    <template v-if="project.repo">
                      <dt class="font-mono text-[11px] uppercase tracking-widest text-paper/50">
                        Code
                      </dt>
                      <dd class="min-w-0 break-all font-mono text-sm">
                        <a
                          :href="project.repo"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-paper/80 underline decoration-line/30 underline-offset-4 transition-colors hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                          {{ repoLabel(project.repo) }}
                          <span class="sr-only">(nouvel onglet)</span>
                        </a>
                      </dd>
                    </template>
                  </dl>

                  <a
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="panel-reveal mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-page transition-colors duration-300 hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Voir le projet
                    <svg
                      viewBox="0 0 16 16"
                      class="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
                    </svg>
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
          <span class="ml-1 text-brand-text">{{ displayAltitude }} M</span>
        </span>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/motion.js";
import spotifyImage from "../assets/images/projects/spotify.webp";
import adiImage from "../assets/images/projects/adi.webp";
import Hovly from "../assets/images/projects/hovly.webp";
import GitAgent from "../assets/images/projects/git-agent.webp";
import Postulo from "../assets/images/projects/postulo.webp";

const el = ref(null);
const headerEl = ref(null);
const listEl = ref(null);
// Each project lists the disciplines it covers: "dev", "devops", or both.
const KIND_LABELS = { dev: "Dev", devops: "DevOps", both: "Dev + DevOps" };
const FILTERS = [
  { id: "all", label: "Tous" },
  { id: "dev", label: "Dev" },
  { id: "devops", label: "DevOps" },
];

// L'altitude suit l'ordre d'affichage : on monte la tour projet après projet.
const projects = ref([
  {
    id: 2,
    title: "Hovly",
    description: "Crée ton tableau de bord immobilier en moins d'une minute.",
    image: Hovly,
    link: "https://hovly-production.up.railway.app/",
    tags: ["IA", "Vue.js", "UX", "PDF"],
    category: "SaaS",
    kinds: ["dev", "devops"],
    // Chaîne GitLab CI/CD : chaque commit sur main passe par ces étapes.
    pipeline: ["Lint · Types · Tests", "Images Docker", "Scan sécurité", "Deploy Railway"],
    repo: "https://gitlab.com/erwanmarega/hovly",
    altitude: 57,
  },
  {
    id: 0,
    title: "SpotCalendar",
    description:
      "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify.",
    image: spotifyImage,
    link: "https://spotcalendar.fr",
    tags: ["Spotify API", "Vue.js", "Music"],
    category: "Web App",
    kinds: ["dev"],
    altitude: 115,
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
    kinds: ["dev"],
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
    kinds: ["dev"],
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
    kinds: ["dev"],
    altitude: 320,
  },
]);

const hostname = (link) => new URL(link).hostname.replace(/^www\./, "");
const repoLabel = (link) => hostname(link) + new URL(link).pathname;

const kindOf = (project) => (project.kinds.length > 1 ? "both" : project.kinds[0]);

const filter = ref("all");
const matches = (project, id) => id === "all" || project.kinds.includes(id);
const countFor = (id) => projects.value.filter((p) => matches(p, id)).length;
const visibleProjects = computed(() => projects.value.filter((p) => matches(p, filter.value)));

const openId = ref(projects.value[0].id);

// The open project must stay visible: when a filter hides it, open the first match.
watch(visibleProjects, (list) => {
  if (!list.some((p) => p.id === openId.value)) openId.value = list[0]?.id ?? null;
});

const onPanelEnd = (event) => {
  if (event.target === event.currentTarget && event.propertyName === "grid-template-rows") {
    ScrollTrigger.refresh();
  }
};

const displayAltitude = ref(projects.value[0].altitude);

let ctx = null;
let tiltEnabled = false;
const altitudeState = { v: projects.value[0].altitude };
const tiltTo = new Map();

watch(openId, async (id) => {
  const project = projects.value.find((p) => p.id === id);
  if (!project) return;
  const target = project.altitude;
  if (!ctx) {
    displayAltitude.value = target;
    return;
  }

  ctx.add(() => {
    gsap.to(altitudeState, {
      v: target,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        displayAltitude.value = Math.round(altitudeState.v);
      },
      onComplete: () => {
        displayAltitude.value = target;
      },
    });
  });

  await nextTick();
  const panel = el.value?.querySelector(`#project-panel-${project.id}`);
  if (!panel) return;

  ctx.add(() => {
    const q = (sel) => panel.querySelectorAll(sel);
    gsap
      .timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
      .fromTo(
        q(".shot-frame"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, clearProps: "clipPath" },
        0.1,
      )
      .from(q(".shot-img"), { scale: 1.08, duration: 1.1, clearProps: "transform" }, 0.1)
      .from(q(".shot-offset"), { x: -14, y: -14, duration: 0.7, clearProps: "transform" }, 0.5)
      .from(
        q(".panel-reveal"),
        { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, clearProps: "transform,opacity" },
        0.3,
      );
  });
});

const TILT_MAX = 3.5;

const getTilt = (node) => {
  let t = tiltTo.get(node);
  if (!t) {
    gsap.set(node, { transformPerspective: 900 });
    const opts = { duration: 0.5, ease: "power3.out" };
    t = { x: gsap.quickTo(node, "rotationX", opts), y: gsap.quickTo(node, "rotationY", opts) };
    tiltTo.set(node, t);
  }
  return t;
};

const onTiltMove = (event) => {
  if (!tiltEnabled) return;
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;
  const t = getTilt(node);
  t.y(px * 2 * TILT_MAX);
  t.x(-py * 2 * TILT_MAX);
};

const onTiltLeave = (event) => {
  const t = tiltTo.get(event.currentTarget);
  if (!t) return;
  t.x(0);
  t.y(0);
};

// Dim the tower while the section fills the middle of the screen, so the text stays readable.
let dimObserver = null;
const setTowerDim = (on) => document.documentElement.classList.toggle("tower-dim", on);

onMounted(() => {
  dimObserver = new IntersectionObserver(([entry]) => setTowerDim(entry.isIntersecting), {
    rootMargin: "-35% 0px -35% 0px",
  });
  if (el.value) dimObserver.observe(el.value);
});

onUnmounted(() => {
  dimObserver?.disconnect();
  setTowerDim(false);
});

onMounted(() => {
  if (prefersReducedMotion()) return;
  tiltEnabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  ctx = gsap.context(() => {
    const rows = listEl.value.querySelectorAll(".project-row");
    const titles = listEl.value.querySelectorAll(".project-title");
    const q = (sel) => listEl.value.querySelectorAll(sel);

    gsap.set(headerEl.value, { opacity: 0, y: 24 });
    gsap.set(titles, { opacity: 0 });
    gsap.set([q(".row-num"), q(".row-cat"), q(".row-cta")], { opacity: 0 });

    ScrollTrigger.create({
      trigger: headerEl.value,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(headerEl.value, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }),
    });

    ScrollTrigger.create({
      trigger: listEl.value,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const lines = q(".row-line");
        // Hairlines are drawn by spans; hide the real borders while they animate.
        gsap.set(rows, { borderBottomColor: "transparent" });
        gsap.set(lines, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(lines, { opacity: 0, clearProps: "transform" });
            gsap.set(rows, { clearProps: "borderBottomColor" });
          },
        });
        const splits = [];

        rows.forEach((row, i) => {
          const at = i * 0.12;
          const title = row.querySelector(".project-title");
          const split = SplitText.create(title, { type: "chars", mask: "chars" });
          splits.push(split);
          gsap.set(title, { opacity: 1 });

          tl.from(
            row.querySelector(".row-line"),
            { scaleX: 0, duration: 0.9, ease: "power2.inOut" },
            at,
          )
            .from(split.chars, { yPercent: 110, duration: 0.8, stagger: 0.03 }, at + 0.1)
            .fromTo(
              row.querySelector(".row-num"),
              { opacity: 0, x: -16 },
              { opacity: 1, x: 0, duration: 0.5, clearProps: "transform,opacity" },
              at + 0.1,
            )
            .fromTo(
              row.querySelectorAll(".row-cat"),
              { opacity: 0, x: 24 },
              { opacity: 1, x: 0, duration: 0.6, clearProps: "transform,opacity" },
              at + 0.25,
            )
            .fromTo(
              row.querySelector(".row-cta"),
              { opacity: 0 },
              { opacity: 1, duration: 0.5, clearProps: "opacity" },
              at + 0.35,
            );
        });

        // Restore the plain text node so the outlined/filled transition and a11y are untouched.
        tl.add(() => {
          splits.forEach((split) => split.revert());
          gsap.set(titles, { clearProps: "opacity" });
        });
      },
    });
  }, el.value);
});

onUnmounted(() => {
  tiltTo.clear();
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

.kind-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  font-size: 10px;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.kind-dev {
  border-color: rgb(var(--line) / 0.25);
  color: rgb(var(--paper) / 0.6);
}

.kind-devops {
  border-color: rgb(var(--brand));
  color: rgb(var(--brand-text));
}

.kind-both {
  border-color: rgb(var(--brand) / 0.6);
  background-color: rgb(var(--brand) / 0.12);
  color: rgb(var(--brand-text));
}

@media (prefers-reduced-motion: reduce) {
  .project-title,
  .project-panel {
    transition: none;
  }
}
</style>
