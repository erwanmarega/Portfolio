import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

// Ids and route names only; labels come from the locale messages (nav.sections / nav.pages).
export const SECTION_LINKS = [
  { id: "home" },
  { id: "projects" },
  { id: "journey" },
  { id: "skills" },
  { id: "contact" },
];

// The cv route exists but is not in the menu: it is the template the
// downloadable PDFs are generated from (scripts/generate-cv-pdf.mjs).
export const PAGE_LINKS = [{ name: "now" }];

// Tracks which section currently sits around the middle of the viewport.
// Only the home route has sections; elsewhere the active id is null.
export function useActiveSection() {
  const route = useRoute();
  const activeId = ref(SECTION_LINKS[0].id);
  let observer = null;

  let atBottom = false;

  function disconnect() {
    observer?.disconnect();
    observer = null;
    window.removeEventListener("scroll", onScroll);
  }

  function setActive(id) {
    activeId.value = id;
    playSectionTick(id);
  }

  // The last section is often too short to reach the middle of the viewport:
  // at the very bottom of the page it is the active one.
  function onScroll() {
    // Top of the page (hero above the first section): the first section is active,
    // even after an instant jump that crossed no tracking line.
    if (window.scrollY <= 2 && activeId.value !== SECTION_LINKS[0].id) {
      return setActive(SECTION_LINKS[0].id);
    }
    const root = document.documentElement;
    const bottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2;
    if (bottom === atBottom) return;
    atBottom = bottom;
    if (bottom) return setActive(SECTION_LINKS.at(-1).id);
    // Leaving the bottom: back to the section under the tracking line.
    const line = window.innerHeight * 0.42;
    const current = SECTION_LINKS.find(({ id }) => {
      const rect = document.getElementById(id)?.getBoundingClientRect();
      return rect && rect.top <= line && rect.bottom >= line;
    });
    if (current) setActive(current.id);
  }

  function sync() {
    disconnect();
    if (route.name !== "home") {
      activeId.value = null;
      return;
    }
    activeId.value ??= SECTION_LINKS[0].id;
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || atBottom) continue;
          setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    atBottom = false;
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  onMounted(() => nextTick(sync));
  // Name: on first load the route resolves after mount (undefined -> "home")
  // while the path stays "/". Locale: / <-> /en keeps the name but needs a re-sync.
  watch(() => [route.name, route.params.locale], sync, { flush: "post" });
  onUnmounted(disconnect);

  return activeId;
}

let audio = null;
let unlocked = false;
let quietUntil = 0;
let lastSectionId = SECTION_LINKS[0].id;

// Browsers only allow sound after a real interaction; scrolling alone is not one.
// The audio context is created and resumed inside that interaction: Safari keeps
// a context suspended when it is first touched from a scroll callback.
const UNLOCK_EVENTS = ["pointerdown", "click", "keydown", "touchend"];

function getAudio() {
  audio ??= new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === "suspended") audio.resume();
  return audio;
}

function unlock() {
  try {
    unlocked = true;
    // Keep listening until the context really runs (the first gesture may not be enough).
    if (getAudio().state === "running") {
      UNLOCK_EVENTS.forEach((type) => window.removeEventListener(type, unlock));
    }
  } catch {
    // No Web Audio: stay silent.
  }
}

if (typeof window !== "undefined") {
  UNLOCK_EVENTS.forEach((type) => window.addEventListener(type, unlock, { passive: true }));
}

// One short synthesized note (no audio file): pitch glides from `from` to `to`.
function blip(from, to, peak, type) {
  try {
    const audio = getAudio();
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(to, now + 0.07);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    osc.connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // Audio is a nicety; ignore browsers that block or lack Web Audio.
  }
}

// Short, quiet tick for menu clicks. Mutes the scroll notes while the page
// smooth-scrolls to the clicked section.
export function playTick() {
  quietUntil = performance.now() + 1200;
  blip(880, 520, 0.05, "triangle");
}

// One soft note per section (rising scale, top to bottom), played when scrolling
// brings a new section into view. Several components track the active section,
// so the same id is only played once.
const SECTION_NOTES = [392, 440, 523.25, 587.33, 659.25];

function playSectionTick(id) {
  if (id === lastSectionId) return;
  lastSectionId = id;
  if (!unlocked || performance.now() < quietUntil) return;
  const note = SECTION_NOTES[SECTION_LINKS.findIndex((link) => link.id === id)];
  if (note) blip(note, note * 0.98, 0.03, "sine");
}
