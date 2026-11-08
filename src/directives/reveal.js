// v-reveal: adds `is-revealed` once the element enters the viewport.
// Styling lives in CSS ([data-reveal] / .is-revealed); pass a delay in ms as value:
//   <div v-reveal="120">
// With prefers-reduced-motion the element is revealed immediately.

let observer = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0 },
  );
  return observer;
}

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const vReveal = {
  mounted(el, binding) {
    el.setAttribute("data-reveal", "");
    if (binding.value) el.style.setProperty("--reveal-delay", `${binding.value}ms`);
    if (reduced() || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-revealed");
      return;
    }
    getObserver().observe(el);
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.style.setProperty("--reveal-delay", `${binding.value || 0}ms`);
    }
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
