<template>
  <div ref="el">
    <section
      aria-labelledby="projects-title"
      class="relative px-4 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-32"
    >
      <div>
        <header ref="headerEl" class="lane-grid items-end">
          <div class="lane-left pb-6 border-b border-line/15 lg:row-start-1">
            <p
              class="text-xs font-mono uppercase tracking-[0.3em] text-brand-text mb-2"
            >
              // projets
            </p>
            <AsciiDecodeText
              tag="h2"
              id="projects-title"
              data-tower-anchor="projects"
              text="Projets sélectionnés"
              idle-glitch
              class="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]"
            />
            <p class="mt-4 text-sm sm:text-base text-ink-soft max-w-xl">
              Une sélection de projets web, du SaaS aux outils pour développeurs.
            </p>
          </div>
          <span
            class="lane-right max-lg:mt-4 max-lg:pb-0 max-lg:border-0 max-lg:text-left pb-6 border-b border-line/15 text-right font-mono text-2xl sm:text-4xl text-ink-muted leading-none lg:row-start-1"
          >
            {{ String(projects.length).padStart(2, "0") }}
            <span class="sr-only">projets</span>
          </span>
        </header>

        <ol class="mt-16 lg:mt-24 space-y-24 lg:space-y-36">
          <li v-for="(project, index) in projects" :key="project.id">
            <article
              :ref="(c) => (blockEls[index] = c)"
              class="group lane-grid items-center"
            >
              <div
                class="lg:row-start-1"
                :class="index % 2 === 1 ? 'lane-right' : 'lane-left'"
              >
                <a
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabindex="-1"
                  aria-hidden="true"
                  class="block overflow-hidden rounded-xl border border-line/15 bg-surface shadow-2xl shadow-black/50 transition-colors duration-500 group-hover:border-brand/40 group-focus-within:border-brand/40"
                >
                  <div
                    class="flex h-9 items-center gap-3 border-b border-line/15 px-3"
                  >
                    <span class="flex gap-1.5">
                      <span class="h-2.5 w-2.5 rounded-full bg-ink-muted/40"></span>
                      <span class="h-2.5 w-2.5 rounded-full bg-ink-muted/40"></span>
                      <span class="h-2.5 w-2.5 rounded-full bg-ink-muted/40"></span>
                    </span>
                    <span
                      class="mx-auto max-w-[60%] truncate rounded-md bg-page/60 px-3 py-0.5 font-mono text-[11px] text-ink-muted"
                    >
                      {{ hostname(project.link) }}
                    </span>
                    <span class="w-10 shrink-0 max-sm:hidden"></span>
                  </div>
                  <div class="relative overflow-hidden">
                    <img
                      :src="project.image"
                      :alt="`Capture d'écran du projet ${project.title}`"
                      loading="lazy"
                      class="aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                </a>
              </div>

              <div
                class="case-text lg:row-start-1"
                :class="index % 2 === 1 ? 'lane-left' : 'lane-right'"
              >
                <p class="font-mono text-xs uppercase tracking-[0.3em]">
                  <span class="text-brand-text">{{
                    String(index + 1).padStart(2, "0")
                  }}</span>
                  <span class="text-ink-muted"> — {{ project.category }}</span>
                </p>
                <AsciiDecodeText
                  tag="h3"
                  :text="project.title"
                  class="mt-3 text-3xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight"
                />
                <p class="mt-4 max-w-md text-base text-ink-soft leading-relaxed">
                  {{ project.description }}
                </p>

                <dl
                  class="mt-8 grid grid-cols-[5rem_1fr] items-center gap-y-3 border-t border-line/15 pt-6"
                >
                  <dt class="text-xs font-mono uppercase tracking-widest text-ink-muted">
                    Stack
                  </dt>
                  <dd class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in project.tags"
                      :key="tag"
                      class="rounded-full border border-line/20 px-3 py-1 text-xs font-mono text-ink-soft"
                    >
                      {{ tag }}
                    </span>
                  </dd>
                  <dt class="text-xs font-mono uppercase tracking-widest text-ink-muted">
                    Site
                  </dt>
                  <dd class="font-mono text-sm text-ink-soft break-all">
                    {{ hostname(project.link) }}
                  </dd>
                </dl>

                <a
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta group/cta mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand/50 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-page focus-visible:border-brand focus-visible:bg-brand focus-visible:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Voir le projet
                  <font-awesome-icon
                    :icon="['fas', 'arrow-up-right-from-square']"
                    class="h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/cta:translate-x-0.5 motion-safe:group-hover/cta:-translate-y-0.5 motion-safe:group-focus-visible/cta:translate-x-0.5 motion-safe:group-focus-visible/cta:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span class="sr-only">(nouvel onglet)</span>
                </a>
              </div>
            </article>
          </li>
        </ol>

        <p class="lane-grid mt-20 lg:mt-28 text-sm text-ink-soft">
          <span class="lane-left">
          Plus de projets sur
          <a
            href="https://github.com/erwanmarega"
            target="_blank"
            rel="noopener noreferrer"
            class="group/gh ml-1 inline-flex min-h-[44px] items-center gap-2 font-medium text-ink underline decoration-brand/50 underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand focus-visible:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <font-awesome-icon :icon="['fab', 'github']" class="h-4 w-4" aria-hidden="true" />
            GitHub
            <span class="sr-only">(nouvel onglet)</span>
          </a>
          </span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import spotifyImage from "../assets/images/projects/spotify.webp";
import adiImage from "../assets/images/projects/adi.webp";
import Hovly from "../assets/images/projects/hovly.webp";
import GitAgent from "../assets/images/projects/git-agent.webp";
import Postulo from "../assets/images/projects/postulo.webp";
import AsciiDecodeText from "../components/AsciiDecodeText.vue";

library.add(faArrowUpRightFromSquare, faGithub);
gsap.registerPlugin(ScrollTrigger);

const el = ref(null);
const headerEl = ref(null);
const blockEls = [];

const projects = ref([
  {
    id: 0,
    title: "Calendrier Spotify",
    description:
      "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify.",
    image: spotifyImage,
    link: "https://spotcalendar.fr",
    tags: ["Spotify API", "Vue.js", "Music"],
    category: "Web App",
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
  },
  {
    id: 2,
    title: "Hovly",
    description: "Crée ton tableau de bord immobilier en moins d'une minute.",
    image: Hovly,
    link: "https://hovly-production.up.railway.app/",
    tags: ["IA", "Vue.js", "UX", "PDF"],
    category: "SaaS",
  },
  {
    id: 3,
    title: "Refonte ADI",
    description:
      "Refonte complète du site de la société ADI, spécialisée dans l'agencement immobilier.",
    image: adiImage,
    link: "https://agencementimmo.vercel.app/",
    tags: ["Vue.js", "Tailwind", "Responsive"],
    category: "Refonte",
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
  },
]);

const hostname = (link) => new URL(link).hostname.replace(/^www\./, "");

let ctx = null;

onMounted(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) return;

  ctx = gsap.context(() => {
    gsap.from(headerEl.value, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: headerEl.value, start: "top 85%", once: true },
    });

    blockEls.forEach((block) => {
      const textItems = block.querySelectorAll(".case-text > *");

      gsap.set(textItems, { opacity: 0, y: 24 });

      ScrollTrigger.create({
        trigger: block,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(textItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          });
        },
      });
    });
  }, el.value);
});

onUnmounted(() => {
  ctx?.revert();
  ctx = null;
});
</script>
