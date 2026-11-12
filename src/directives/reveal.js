// v-reveal: fades an element up the first time it enters the viewport.
// Optional value = delay in ms (e.g. v-reveal="120"). Styles live in main.css
// (.reveal / .is-in) and only apply when the user has not asked for reduced motion.
let observer = null;

const getObserver = () => {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return observer;
};

export const reveal = {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (binding.value) el.style.setProperty("--reveal-delay", `${binding.value}ms`);
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
