import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import { localeFromRoute, messages, LOCALES } from "./composables/useLocale.js";

const SITE_URL = "https://www.ewmdev.com";

export const routes = [
  {
    path: "/:locale(en)?",
    name: "home",
    component: HomePage,
  },
  {
    path: "/:locale(en)?/now",
    name: "now",
    component: () => import("./pages/NowPage.vue"),
  },
  {
    path: "/:locale(en)?/cv",
    name: "cv",
    component: () => import("./pages/CvPage.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return { el: to.hash, top: 72, behavior: reduce ? "auto" : "smooth" };
    }
    // Back to the top of the same page (e.g. /#projects -> /): scroll, do not jump.
    if (to.path === from.path) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return { top: 0, behavior: reduce ? "auto" : "smooth" };
    }
    return { top: 0 };
  },
});

function pagePath(locale, name) {
  const base = locale === "en" ? "/en" : "";
  const suffix = name === "home" ? "" : `/${name}`;
  return `${base}${suffix}` || "/";
}

// Creates the tag once, then only updates it.
function ensureHeadTag(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function updateHead(to) {
  const locale = localeFromRoute(to);
  const { meta } = messages[locale];
  const title = meta.titles[to.name];
  if (title) document.title = title;
  document.documentElement.lang = locale;

  // The cv page is only the print template behind the downloadable PDFs.
  const robots = ensureHeadTag('meta[name="robots"]', () => {
    const el = document.createElement("meta");
    el.name = "robots";
    return el;
  });
  robots.content = to.name === "cv" ? "noindex" : "index, follow";

  const description = ensureHeadTag('meta[name="description"]', () => {
    const el = document.createElement("meta");
    el.name = "description";
    return el;
  });
  description.content = meta.description;

  const hrefs = {
    fr: `${SITE_URL}${pagePath("fr", to.name)}`,
    en: `${SITE_URL}${pagePath("en", to.name)}`,
  };
  hrefs["x-default"] = hrefs.fr;
  for (const hreflang of [...LOCALES, "x-default"]) {
    const link = ensureHeadTag(`link[rel="alternate"][hreflang="${hreflang}"]`, () => {
      const el = document.createElement("link");
      el.rel = "alternate";
      el.hreflang = hreflang;
      return el;
    });
    link.href = hrefs[hreflang];
  }
}

router.afterEach((to) => {
  if (to.name) updateHead(to);
});

export default router;
