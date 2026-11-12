import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "@/router.js";
import { reveal } from "@/directives/reveal.js";
import fr from "@/data/locales/fr.js";
import en from "@/data/locales/en.js";
import { journey } from "@/data/journey.js";
import { projects } from "@/data/projects.js";
import Journey from "@/views/Journey.vue";
import CvPage from "@/pages/CvPage.vue";

const locales = { fr, en };

function makeRouter() {
  return createRouter({ history: createMemoryHistory(), routes });
}

async function mountAt(component, path) {
  const router = makeRouter();
  router.push(path);
  await router.isReady();
  return mount(component, { global: { plugins: [router], directives: { reveal } } });
}

function findKeys(value, key, path = "") {
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([k, v]) => [
    ...(k === key ? [`${path}.${k}`] : []),
    ...findKeys(v, key, `${path}.${k}`),
  ]);
}

const sectionByTitle = (wrapper, title) =>
  wrapper.findAll("section").find((s) => s.find("h2").text() === title);

let wrappers = [];
async function mountTracked(component, path) {
  const w = await mountAt(component, path);
  wrappers.push(w);
  return w;
}
afterEach(() => {
  wrappers.forEach((w) => w.unmount());
  wrappers = [];
  vi.restoreAllMocks();
});

describe("journey and project data consistency", () => {
  it.each(Object.keys(locales))("%s has texts for every journey id and no extras", (code) => {
    const keys = Object.keys(locales[code].journey.items).sort();
    expect(keys).toEqual(journey.map((j) => j.id).sort());
  });

  it("journey ids are unique and kinds are valid", () => {
    expect(new Set(journey.map((j) => j.id)).size).toBe(journey.length);
    journey.forEach((j) => expect(["work", "education"]).toContain(j.kind));
  });

  it.each(Object.keys(locales))("%s has texts for every project id", (code) => {
    const items = locales[code].projects.items;
    for (const project of projects) {
      expect(items[project.id], `project ${project.id}`).toBeDefined();
      expect(items[project.id].description).toBeTruthy();
    }
    expect(Object.keys(items)).toHaveLength(projects.length);
  });
});

describe("home Journey section", () => {
  it("renders only entries flagged home (no bac)", async () => {
    const w = await mountTracked(Journey, "/");
    const rows = w.findAll("li.journey-row");
    expect(rows).toHaveLength(journey.filter((j) => j.home).length);
    expect(w.text()).not.toContain(fr.journey.items.bac.title);
    expect(w.text()).toContain(fr.journey.items["presence-verte"].title);
    expect(w.text()).toContain(fr.journey.items["banque-palatine"].title);
  });

  it("shows English titles under /en", async () => {
    const w = await mountTracked(Journey, "/en");
    expect(w.text()).toContain(en.journey.items["presence-verte"].title);
    expect(w.text()).toContain(en.journey.items["banque-palatine"].title);
    expect(w.text()).not.toContain(en.journey.items.bac.title);
    expect(w.text()).not.toContain(fr.journey.items["presence-verte"].title);
  });
});

describe("CV page in French", () => {
  it("shows French section titles", async () => {
    const w = await mountTracked(CvPage, "/cv");
    const titles = w.findAll("h2").map((h) => h.text());
    const s = fr.cv.sections;
    expect(titles).toEqual([s.profile, s.experience, s.education, s.skills, s.projects, s.more]);
    expect(w.text()).toContain(fr.cv.profile);
  });

  it("lists all six journey entries, including the bac", async () => {
    const w = await mountTracked(CvPage, "/cv");
    expect(journey).toHaveLength(6);
    for (const j of journey) {
      expect(w.text()).toContain(fr.journey.items[j.id].title);
    }
    expect(w.text()).toContain(fr.journey.items.bac.title);
  });

  it("groups work under Experience and education under Education, in order", async () => {
    const w = await mountTracked(CvPage, "/cv");
    for (const [sectionKey, kind] of [
      ["experience", "work"],
      ["education", "education"],
    ]) {
      const section = sectionByTitle(w, fr.cv.sections[sectionKey]);
      const titles = section.findAll("li.cv-entry h3").map((h) => h.text());
      const expected = journey
        .filter((j) => j.kind === kind)
        .map((j) => fr.journey.items[j.id].title);
      expect(titles).toHaveLength(expected.length);
      expected.forEach((title, i) => expect(titles[i]).toContain(title));
    }
  });

  it("renders the skills rows", async () => {
    const w = await mountTracked(CvPage, "/cv");
    const section = sectionByTitle(w, fr.cv.sections.skills);
    expect(section.findAll("dt").map((d) => d.text())).toEqual(fr.cv.skills.map((r) => r.label));
    expect(section.findAll("dd").map((d) => d.text())).toEqual(fr.cv.skills.map((r) => r.text));
  });

  it("renders the languages and more rows", async () => {
    const w = await mountTracked(CvPage, "/cv");
    const section = sectionByTitle(w, fr.cv.sections.more);
    expect(section.findAll("dt")).toHaveLength(fr.cv.more.length);
  });

  it("links every project to its URL in a new tab with noopener", async () => {
    const w = await mountTracked(CvPage, "/cv");
    const section = sectionByTitle(w, fr.cv.sections.projects);
    const links = section.findAll("a");
    expect(links).toHaveLength(projects.length);
    for (const project of projects) {
      const link = links.find((a) => a.attributes("href") === project.link);
      expect(link, project.title).toBeDefined();
      expect(link.text()).toContain(project.title);
      expect(link.attributes("target")).toBe("_blank");
      expect(link.attributes("rel")).toContain("noopener");
    }
  });
});

describe("CV page in English", () => {
  it("shows English section titles and profile only", async () => {
    const w = await mountTracked(CvPage, "/en/cv");
    expect(w.findAll("h2").map((h) => h.text())).toEqual(Object.values(en.cv.sections));
    expect(w.text()).toContain(en.cv.profile);
    expect(w.text()).not.toContain(fr.cv.profile);
    expect(w.text()).toContain(en.cv.print);
    expect(w.text()).not.toContain(fr.cv.print);
  });
});

describe("CV print button", () => {
  it("calls window.print once on click", async () => {
    const print = vi.fn();
    vi.stubGlobal("print", print);
    try {
      const w = await mountTracked(CvPage, "/cv");
      const button = w.find("button");
      expect(button.text()).toBe(fr.cv.print);
      await button.trigger("click");
      expect(print).toHaveBeenCalledTimes(1);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe("CV privacy and print header", () => {
  it.each(["/cv", "/en/cv"])("%s contains no phone number", async (path) => {
    const w = await mountTracked(CvPage, path);
    const text = w.text();
    expect(text).not.toMatch(/0\d([ .]?\d{2}){4}/);
    expect(text).not.toContain("+33");
  });

  it.each(["/cv", "/en/cv"])("%s has a print-only header with identity", async (path) => {
    const w = await mountTracked(CvPage, path);
    const header = w.find("header");
    expect(header.exists()).toBe(true);
    expect(header.classes()).toContain("hidden");
    expect(header.classes()).toContain("print:block");
    expect(header.text()).toContain("Erwan Marega");
    expect(header.text()).toContain("maregaerwan@gmail.com");
  });
});

describe("Shelf removal", () => {
  it.each(["/shelf", "/en/shelf"])("%s redirects to /", async (path) => {
    const router = makeRouter();
    router.push(path);
    await router.isReady();
    expect(router.currentRoute.value.fullPath).toBe("/");
    expect(router.currentRoute.value.name).toBe("home");
  });

  it.each(Object.keys(locales))("%s locale has no shelf key", (code) => {
    expect(findKeys(locales[code], "shelf")).toEqual([]);
  });
});

describe("downloadable CV files", () => {
  // Generated by `npm run cv:pdf`; the sidebar links to them by locale.
  it.each(["fr", "en"])("public/cv-erwan-marega-%s.pdf exists and is a PDF", (locale) => {
    const file = resolve(process.cwd(), "public", `cv-erwan-marega-${locale}.pdf`);
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file).subarray(0, 5).toString()).toBe("%PDF-");
  });
});
