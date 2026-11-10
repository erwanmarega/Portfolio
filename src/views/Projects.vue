<template>
  <section aria-labelledby="projects-title">
    <h2 id="projects-title" v-reveal class="section-label">Projets</h2>

    <ul class="mt-6">
      <li
        v-reveal
        v-for="project in projects"
        :key="project.id"
        class="border-t border-line/10 first:border-t-0"
      >
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group grid gap-x-6 gap-y-4 rounded-lg py-6 outline-none first:pt-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start"
        >
          <div
            class="overflow-hidden rounded-lg border border-line/10 bg-surface-strong"
          >
            <img
              :src="project.image"
              :alt="`Capture d'écran du projet ${project.title}`"
              loading="lazy"
              class="aspect-[16/10] w-full object-cover object-top transition-[transform,filter] duration-500 motion-safe:group-hover:scale-[1.03] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-focus-visible:grayscale-0"
            />
          </div>

          <div class="min-w-0">
            <div class="flex items-baseline justify-between gap-4">
              <h3
                class="flex items-baseline gap-2 font-medium text-ink transition-colors group-hover:text-brand-text"
              >
                {{ project.title }}
                <svg
                  viewBox="0 0 16 16"
                  class="h-3 w-3 shrink-0 self-center"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
                </svg>
              </h3>
              <p class="shrink-0 font-mono text-xs text-ink-muted">
                {{ project.category }}
              </p>
            </div>
            <p class="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
              {{ project.description }}
            </p>
            <p class="mt-3 font-mono text-xs text-ink-muted">
              {{ project.tags.join(" · ") }}
            </p>
            <span class="sr-only">(nouvel onglet)</span>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import spotifyImage from "../assets/images/projects/spotify.webp";
import adiImage from "../assets/images/projects/adi.webp";
import hovlyImage from "../assets/images/projects/hovly.webp";
import gitAgentImage from "../assets/images/projects/git-agent.webp";
import postuloImage from "../assets/images/projects/postulo.webp";

const projects = [
  {
    id: 0,
    title: "SpotCalendar",
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
    image: gitAgentImage,
    link: "https://git-agent-steel.vercel.app/",
    tags: ["IA", "CLI", "Node.js"],
    category: "Outil",
  },
  {
    id: 2,
    title: "Hovly",
    description: "Crée ton tableau de bord immobilier en moins d'une minute.",
    image: hovlyImage,
    link: "https://hovly-production.up.railway.app/",
    tags: ["IA", "Vue.js", "UX", "PDF"],
    category: "SaaS",
  },
  {
    id: 3,
    title: "ADI",
    description:
      "Refonte complète du site de la société ADI, spécialisée dans l'agencement immobilier.",
    image: adiImage,
    link: "https://adi-soci-t.vercel.app/",
    tags: ["Vue.js", "Tailwind", "Responsive"],
    category: "Refonte",
  },
  {
    id: 4,
    title: "Postulo",
    description:
      "Connecte vos étudiants à votre tableau de bord. Pour les CFA et écoles en recherche d'alternance.",
    image: postuloImage,
    link: "https://postulo.fr",
    tags: ["SaaS", "Vue.js", "Dashboard"],
    category: "SaaS",
  },
];
</script>
