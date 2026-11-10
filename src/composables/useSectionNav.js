import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const SECTION_LINKS = [
  { label: "À propos", id: "home" },
  { label: "Projets", id: "projects" },
  { label: "Parcours", id: "journey" },
  { label: "Stack", id: "skills" },
  { label: "Contact", id: "contact" },
];

export const PAGE_LINKS = [
  { label: "En ce moment", name: "now" },
  { label: "Étagère", name: "shelf" },
];

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
          if (entry.isIntersecting) activeId.value = entry.target.id;
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
  watch(() => route.name, sync, { flush: "post" });
  onUnmounted(disconnect);

  return activeId;
}

let audio = null;

// Short, quiet synthesized tick for menu clicks (no audio file).
export function playTick() {
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === "suspended") audio.resume();
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.07);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    osc.connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // Audio is a nicety; ignore browsers that block or lack Web Audio.
  }
}
