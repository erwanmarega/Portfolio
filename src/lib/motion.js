import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// SiteLoader dispatches this once it starts fading out (or immediately when it is skipped).
const READY_EVENT = "site:ready";
let siteReady = false;

export function markSiteReady() {
  if (siteReady) return;
  siteReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

// Runs `cb` once the loader is gone. Returns a cleanup function.
export function onSiteReady(cb) {
  if (siteReady) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(READY_EVENT, handler);
}

// Types `text` into `el.textContent` char by char on a GSAP timeline position.
// Returns a tween; the final text is always the full string.
export function typeText(el, text, { duration, ease = "none" } = {}) {
  const state = { n: 0 };
  el.textContent = "";
  return gsap.to(state, {
    n: text.length,
    duration: duration ?? Math.max(0.25, text.length * 0.035),
    ease,
    onUpdate: () => {
      el.textContent = text.slice(0, Math.round(state.n));
    },
    onComplete: () => {
      el.textContent = text;
    },
  });
}
