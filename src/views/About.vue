<template>
  <section aria-labelledby="about-title" class="w-full min-h-screen pt-28 sm:pt-36 pb-16">
    <div class="lane-grid gap-y-14">
      <!-- Identity -->
      <div class="lane-left lg:pr-8">
        <p
          v-reveal
          class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
        >
          <span class="h-px w-8 bg-brand-text" aria-hidden="true" />
          04 — À propos
        </p>

        <div class="mt-6 flex items-center gap-5">
          <div v-reveal="60" class="avatar shrink-0">
            <img
              :src="ImgErwan"
              alt="Portrait d'Erwan Marega"
              class="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-full object-cover"
            />
          </div>
          <h1
            id="about-title"
            v-reveal="100"
            data-tower-anchor="about"
            class="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.04em] leading-[0.95] text-paper"
          >
            Erwan<br />Marega<span class="text-brand">.</span>
          </h1>
        </div>

        <p v-reveal="160" class="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
          Je code des apps web. J'aime apprendre et m'intéresser à tous les sujets.
        </p>

        <dl v-reveal="220" class="mt-8 border-t border-paper/10">
          <div class="fact">
            <dt>Poste</dt>
            <dd>Ingénieur Développement, en alternance</dd>
          </div>
          <div class="fact">
            <dt>Formation</dt>
            <dd>Mastère Dev Manager Full Stack — Efrei</dd>
          </div>
          <div class="fact">
            <dt>Période</dt>
            <dd class="flex items-center gap-3 font-mono text-[12px]">
              <span>sept. 2025</span>
              <span
                class="relative h-[3px] flex-1 max-w-[140px] rounded-full bg-paper/10 overflow-hidden"
                role="progressbar"
                :aria-valuenow="Math.round(progress * 100)"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Avancement de l'alternance"
              >
                <span
                  class="period-bar absolute inset-y-0 left-0 rounded-full bg-ink"
                  :style="{ width: `${progress * 100}%` }"
                />
              </span>
              <span>juil. 2027</span>
            </dd>
          </div>
          <div class="fact">
            <dt>Base</dt>
            <dd>
              Paris
              <span class="font-mono text-[11px] text-ink-muted">— 48.85° N · 2.35° E</span>
            </dd>
          </div>
        </dl>

        <p v-reveal="280" class="mt-8 max-w-md text-sm leading-relaxed text-paper/70">
          Développeur web en formation, passionné par la création de sites et la gestion de projets
          digitaux. J'avance entre l'école et l'entreprise : la théorie le matin, la mise en
          production l'après-midi.
        </p>

        <div v-reveal="340" class="mt-8 flex flex-wrap items-center gap-6">
          <a
            :href="CV_Marega"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-page transition-colors hover:bg-paper"
          >
            <font-awesome-icon :icon="['fas', 'download']" class="text-xs" />
            Télécharger mon CV
          </a>
          <a
            href="#journey"
            class="text-sm font-semibold text-paper underline decoration-ink underline-offset-[6px] transition-colors hover:text-ink"
          >
            Parcours complet
          </a>
        </div>
      </div>

      <!-- Travel log -->
      <div class="lane-right lg:pl-8">
        <header
          v-reveal
          class="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-3"
        >
          <h2 class="text-base font-semibold text-paper">Carnet de voyage</h2>
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-text">
            Distances depuis la tour
          </p>
        </header>

        <ul class="mt-4 grid grid-cols-2 gap-x-3 gap-y-5">
          <li
            v-for="(place, i) in places"
            :key="place.name"
            v-reveal="80 + i * 60"
            :class="place.wide ? 'col-span-2' : 'col-span-2 sm:col-span-1'"
          >
            <figure class="group">
              <div
                class="overflow-hidden rounded-md border border-paper/10 bg-surface"
                :class="place.wide ? 'aspect-[16/7]' : 'aspect-[4/3]'"
              >
                <img
                  :src="place.img"
                  :alt="place.alt"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption
                class="mt-2 flex font-mono text-[10px] tracking-[0.06em]"
                :class="place.wide ? 'items-baseline justify-between gap-3' : 'flex-col gap-0.5'"
              >
                <span class="text-paper">{{ pad(i + 1) }} · {{ place.name }}</span>
                <span class="text-ink-muted">{{ place.coords }} — {{ place.distance }}</span>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { vReveal } from "@/directives/reveal.js";
import ImgErwan from "../assets/images/profile.webp";
import ImgBoat from "../assets/images/about/boat.webp";
import ImgCity from "../assets/images/about/city.webp";
import ImgBeach from "../assets/images/about/beach.webp";
import ImgRome from "../assets/images/about/rome.webp";
import CV_Marega from "../assets/docs/cv-erwan-marega.pdf";

library.add(faDownload);

const pad = (n) => String(n).padStart(2, "0");

const places = [
  {
    name: "Londres",
    img: ImgCity,
    alt: "Tours de bureaux au bord de l'eau à Londres",
    coords: "51.50° N · 0.02° W",
    distance: "344 km",
    wide: true,
  },
  {
    name: "Barcelone",
    img: ImgBeach,
    alt: "Plage et palmiers à Barcelone",
    coords: "41.38° N · 2.19° E",
    distance: "831 km",
  },
  {
    name: "Rome",
    img: ImgRome,
    alt: "Façade sculptée à Rome",
    coords: "41.90° N · 12.48° E",
    distance: "1 106 km",
  },
  {
    // TODO: renseigner le lieu, les coordonnées et la distance.
    name: "[Lieu]",
    img: ImgBoat,
    alt: "Port et bateaux",
    coords: "[coordonnées]",
    distance: "[distance]",
    wide: true,
  },
];

// Work-study progress, sept. 2025 -> juil. 2027.
const START = new Date(2025, 8, 1).getTime();
const END = new Date(2027, 6, 31).getTime();
const progress = Math.min(1, Math.max(0, (Date.now() - START) / (END - START)));
</script>

<style scoped>
.avatar {
  border-radius: 9999px;
  padding: 3px;
  border: 1px solid rgb(var(--brand-text) / 0.6);
}

.fact {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgb(var(--paper) / 0.1);
}
.fact dt {
  font-family: "Geist Mono", ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgb(var(--ink-muted));
}
.fact dd {
  font-size: 0.875rem;
  color: rgb(var(--paper));
}

.period-bar {
  transform-origin: left;
  transition: transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 400ms;
}
[data-reveal]:not(.is-revealed) .period-bar {
  transform: scaleX(0);
}
@media (prefers-reduced-motion: reduce) {
  .period-bar {
    transition: none;
  }
}
</style>
