// jsdom lacks a few browser APIs used by GSAP / animations; stub them for render tests.
if (typeof window !== "undefined") {
  window.matchMedia ??= (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });

  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  window.IntersectionObserver ??= NoopObserver;
  window.ResizeObserver ??= NoopObserver;
  HTMLCanvasElement.prototype.getContext = () => null;
}
