import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Skills from "@/views/Skills.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "@/router.js";
import { reveal } from "@/directives/reveal.js";

describe("Skills section", () => {
  it("renders the title and the technology groups", async () => {
    const router = createRouter({ history: createMemoryHistory(), routes });
    router.push("/");
    await router.isReady();
    const wrapper = mount(Skills, { global: { plugins: [router], directives: { reveal } } });

    expect(wrapper.find("#skills-title").text()).toBe("Stack");
    expect(wrapper.findAll("dt").length).toBeGreaterThan(0);
    expect(wrapper.findAll("li.tech").length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain("Vue.js");
    wrapper.unmount();
  });
});

describe("Projects section", () => {
  it("shows the featured projects first, then the others under their category", async () => {
    const { default: Projects } = await import("@/views/Projects.vue");
    const { PROJECT_GROUPS, projects } = await import("@/data/projects.js");
    const { default: fr } = await import("@/data/locales/fr.js");
    const router = createRouter({ history: createMemoryHistory(), routes });
    router.push("/");
    await router.isReady();
    const wrapper = mount(Projects, { global: { plugins: [router], directives: { reveal } } });

    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    const usedGroups = PROJECT_GROUPS.filter((id) => others.some((p) => p.group === id));

    expect(featured.length).toBeGreaterThan(0);
    expect(wrapper.findAll("h3").map((h) => h.text())).toEqual([
      fr.projects.featured,
      ...usedGroups.map((id) => fr.projects.groups[id]),
      fr.projects.contributions.title,
    ]);
    expect(
      wrapper.findAll("h4").map((h) => h.text().replace(fr.projects.newTab, "").trim()),
    ).toEqual([...featured, ...others].map((p) => p.title));

    const articles = wrapper.findAll("article");
    expect(articles).toHaveLength(featured.length);
    featured.forEach((project, i) => {
      const study = fr.projects.items[project.id].study;
      expect(articles[i].findAll("dt").map((dt) => dt.text())).toEqual([
        fr.projects.study.problem,
        fr.projects.study.role,
        fr.projects.study.result,
      ]);
      expect(articles[i].text()).toContain(study.problem);
      expect(articles[i].text()).toContain(study.role);
      expect(articles[i].text()).toContain(study.result);
    });
    expect(projects.every((p) => PROJECT_GROUPS.includes(p.group))).toBe(true);
    wrapper.unmount();
  });
});
