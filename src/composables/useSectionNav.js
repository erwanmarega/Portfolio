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

  function disconnect() {
    observer?.disconnect();
    observer = null;
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
          if (!entry.isIntersecting) continue;
          activeId.value = entry.target.id;
          playSectionTick(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  onMounted(() => nextTick(sync));
  // Path (not name): switching / <-> /en keeps the route name but should re-sync.
  watch(() => route.path, sync, { flush: "post" });
  onUnmounted(disconnect);

  return activeId;
}

let audio = null;
let unlocked = false;
let quietUntil = 0;
let lastSectionId = SECTION_LINKS[0].id;

// Browsers only allow sound after a real interaction; scrolling alone is not one.
if (typeof window !== "undefined") {
  const unlock = () => (unlocked = true);
  ["pointerdown", "keydown", "touchend"].forEach((type) =>
    window.addEventListener(type, unlock, { once: true, passive: true }),
  );
}

// One short synthesized note (no audio file): pitch glides from `from` to `to`.
function blip(from, to, peak, type) {
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === "suspended") audio.resume();
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
