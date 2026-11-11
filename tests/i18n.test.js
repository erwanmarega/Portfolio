import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import appRouter, { routes } from "@/router.js";
import { reveal } from "@/directives/reveal.js";
import fr from "@/data/locales/fr.js";
import en from "@/data/locales/en.js";
import { buildLocaleRoute, localeFromRoute, messages } from "@/composables/useLocale.js";
import { journey } from "@/data/journey.js";
import Home from "@/views/Home.vue";
import Journey from "@/views/Journey.vue";
import Skills from "@/views/Skills.vue";
import SiteSidebar from "@/components/SiteSidebar.vue";

function makeRouter() {
  return createRouter({ history: createMemoryHistory(), routes });
}

async function mountAt(component, path) {
  const router = makeRouter();
  router.push(path);
  await router.isReady();
  const wrapper = mount(component, { global: { plugins: [router], directives: { reveal } } });
  return { wrapper, router };
}

// Returns the list of differences between two message trees.
function diffStructure(a, b, path = "") {
  const issues = [];
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return [`${path}: array vs non-array`];
    if (a.length !== b.length) issues.push(`${path}: length ${a.length} vs ${b.length}`);
    a.forEach((item, i) => {
      if (i < b.length) issues.push(...diffStructure(item, b[i], `${path}[${i}]`));
    });
    return issues;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(key in a)) issues.push(`${path}.${key}: missing in fr`);
      else if (!(key in b)) issues.push(`${path}.${key}: missing in en`);
      else issues.push(...diffStructure(a[key], b[key], `${path}.${key}`));
    }
    return issues;
  }
  if (typeof a !== typeof b) issues.push(`${path}: type ${typeof a} vs ${typeof b}`);
  return issues;
}

function emptyStrings(value, path = "") {
  if (typeof value === "string") return value.trim() === "" ? [path] : [];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => emptyStrings(v, `${path}.${k}`));
  }
  return [];
}

describe("locale files", () => {
  it("fr and en share the same key structure and array lengths", () => {
    expect(diffStructure(fr, en)).toEqual([]);
  });

  it("contain no empty string values", () => {
    expect(emptyStrings(fr)).toEqual([]);
    expect(emptyStrings(en)).toEqual([]);
  });
});

describe("locale routing", () => {
  async function resolve(path) {
    const router = makeRouter();
    router.push(path);
    await router.isReady();
    return router.currentRoute.value;
  }

  it.each([
    ["/", "home", "fr"],
    ["/en", "home", "en"],
    ["/now", "now", "fr"],
    ["/cv", "cv", "fr"],
    ["/en/now", "now", "en"],
    ["/en/cv", "cv", "en"],
  ])("%s resolves to %s in %s", async (path, name, locale) => {
    const route = await resolve(path);
    expect(route.name).toBe(name);
    expect(localeFromRoute(route)).toBe(locale);
  });

  it.each(["/de", "/en/unknown", "/now/extra"])("%s redirects to /", async (path) => {
    const route = await resolve(path);
    expect(route.fullPath).toBe("/");
    expect(route.name).toBe("home");
  });

  it("builds French paths without a double slash", () => {
    const router = makeRouter();
    expect(router.resolve(buildLocaleRoute("fr", "home")).path).toBe("/");
    expect(router.resolve(buildLocaleRoute("fr", "now")).path).toBe("/now");
    expect(router.resolve(buildLocaleRoute("fr", "cv")).path).toBe("/cv");
  });

  it("builds English paths under /en", () => {
    const router = makeRouter();
    expect(router.resolve(buildLocaleRoute("en", "home")).path).toBe("/en");
    expect(router.resolve(buildLocaleRoute("en", "now")).path).toBe("/en/now");
    expect(router.resolve(buildLocaleRoute("en", "cv")).path).toBe("/en/cv");
  });
});

describe("localized rendering", () => {
  it("Home shows French at / and English at /en", async () => {
    const a = await mountAt(Home, "/");
    expect(a.wrapper.text()).toContain(fr.home.p1);
    expect(a.wrapper.text()).not.toContain(en.home.p1);
    a.wrapper.unmount();

    const b = await mountAt(Home, "/en");
    expect(b.wrapper.text()).toContain(en.home.p1);
    expect(b.wrapper.text()).not.toContain(fr.home.p1);
    b.wrapper.unmount();
  });

  it("Journey shows the localized title and items", async () => {
    const a = await mountAt(Journey, "/");
    expect(a.wrapper.find("#journey-title").text()).toBe(fr.journey.title);
    expect(a.wrapper.text()).toContain(fr.journey.items.cegedim.title);
    a.wrapper.unmount();

    const b = await mountAt(Journey, "/en");
    expect(b.wrapper.find("#journey-title").text()).toBe(en.journey.title);
    expect(b.wrapper.text()).toContain(en.journey.items.cegedim.title);
    expect(b.wrapper.findAll("li.journey-row")).toHaveLength(
      journey.filter((item) => item.home).length,
    );
    b.wrapper.unmount();
  });

  it("Skills shows the localized title", async () => {
    const a = await mountAt(Skills, "/");
    const frTitle = a.wrapper.find("#skills-title").text();
    a.wrapper.unmount();
    const b = await mountAt(Skills, "/en");
    expect(b.wrapper.find("#skills-title").text()).toBe(messages.en.skills.title);
    expect(frTitle).toBe(messages.fr.skills.title);
    b.wrapper.unmount();
  });
});

describe("SiteSidebar language switch", () => {
  const hrefs = (wrapper) => wrapper.findAll("a").map((a) => a.attributes("href"));
  const switchLink = (wrapper, code) => wrapper.find(`a[hreflang="${code}"]`);

  it("keeps internal links in English and switches to French at /en/now", async () => {
    const { wrapper } = await mountAt(SiteSidebar, "/en/now");
    const internal = hrefs(wrapper).filter((h) => h.startsWith("/") && !h.endsWith(".pdf"));
    expect(internal).toContain("/en");
    expect(internal).toContain("/en#projects");
    expect(internal).toContain("/en/now");
    // The CV is not a menu page: the sidebar links to the PDF of the current language.
    expect(internal).not.toContain("/en/cv");
    expect(hrefs(wrapper)).toContain("/cv-erwan-marega-en.pdf");
    // Everything except the switch link (to French) stays under /en.
    expect(internal.filter((h) => h !== "/now").every((h) => h.startsWith("/en"))).toBe(true);
    expect(switchLink(wrapper, "fr").attributes("href")).toBe("/now");
    expect(switchLink(wrapper, "en").exists()).toBe(false);
    wrapper.unmount();
  });

  it("switches to English from the French home", async () => {
    const { wrapper } = await mountAt(SiteSidebar, "/");
    const internal = hrefs(wrapper).filter((h) => h.startsWith("/") && !h.endsWith(".pdf"));
    expect(internal).toContain("/now");
    expect(internal).toContain("/#projects");
    expect(switchLink(wrapper, "en").attributes("href")).toBe("/en");
    wrapper.unmount();
  });

  it("keeps the hash when switching language", async () => {
    const { wrapper } = await mountAt(SiteSidebar, "/#projects");
    expect(switchLink(wrapper, "en").attributes("href")).toBe("/en#projects");
    wrapper.unmount();
  });

  it("keeps the hash when switching back to French", async () => {
    const { wrapper } = await mountAt(SiteSidebar, "/en#skills");
    expect(switchLink(wrapper, "fr").attributes("href")).toBe("/#skills");
    wrapper.unmount();
  });
});

describe("head management", () => {
  const alternates = () => [...document.head.querySelectorAll('link[rel="alternate"]')];
  const alt = (lang) => document.head.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);

  it("updates lang, title, description and alternates for English", async () => {
    await appRouter.push("/en");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(en.meta.titles.home);
    expect(document.head.querySelector('meta[name="description"]').content).toBe(
      en.meta.description,
    );
    expect(alt("fr").href).toBe("https://www.ewmdev.com/");
    expect(alt("en").href).toBe("https://www.ewmdev.com/en");
    expect(alt("x-default").href).toBe("https://www.ewmdev.com/");
  });

  it("uses page-specific alternates on /en/now", async () => {
    await appRouter.push("/en/now");
    expect(document.title).toBe(en.meta.titles.now);
    expect(alt("fr").href).toBe("https://www.ewmdev.com/now");
    expect(alt("en").href).toBe("https://www.ewmdev.com/en/now");
  });

  it("restores French when navigating back to /", async () => {
    await appRouter.push("/en");
    await appRouter.push("/");
    expect(document.documentElement.lang).toBe("fr");
    expect(document.title).toBe(fr.meta.titles.home);
    expect(document.head.querySelector('meta[name="description"]').content).toBe(
      fr.meta.description,
    );
  });

  it("does not duplicate head tags across navigations", async () => {
    for (const path of ["/en", "/", "/en/cv", "/cv", "/en", "/now"]) {
      await appRouter.push(path);
    }
    expect(alternates()).toHaveLength(3);
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  });
});

describe("vercel.json", () => {
  const config = JSON.parse(readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"));
  const rewrites = config.rewrites;

  it.each(["/now", "/cv", "/en", "/en/now", "/en/cv"])("rewrites %s to /index.html", (source) => {
    expect(rewrites).toContainEqual({ source, destination: "/index.html" });
  });

  it("has no catch-all rewrite besides the API proxy", () => {
    const wildcards = rewrites.filter((r) => /[(*:]/.test(r.source)).map((r) => r.source);
    expect(wildcards).toEqual(["/api/(.*)"]);
  });
});
