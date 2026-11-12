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
  it("groups every project under its category heading, in group order", async () => {
    const { default: Projects } = await import("@/views/Projects.vue");
    const { PROJECT_GROUPS, projects } = await import("@/data/projects.js");
    const { default: fr } = await import("@/data/locales/fr.js");
    const router = createRouter({ history: createMemoryHistory(), routes });
    router.push("/");
    await router.isReady();
    const wrapper = mount(Projects, { global: { plugins: [router], directives: { reveal } } });

    // The contributions block adds its own trailing h3: only compare the group headings.
    const headings = wrapper
      .findAll("h3")
      .map((h) => h.text())
      .slice(0, PROJECT_GROUPS.length);
    expect(headings).toEqual(PROJECT_GROUPS.map((id) => fr.projects.groups[id]));
    expect(wrapper.findAll("h3").map((h) => h.text())).toEqual([
      ...PROJECT_GROUPS.map((id) => fr.projects.groups[id]),
      fr.projects.contributions.title,
    ]);
    expect(wrapper.findAll("h4").map((h) => h.text())).toEqual(projects.map((p) => p.title));
    expect(projects.every((p) => PROJECT_GROUPS.includes(p.group))).toBe(true);
    wrapper.unmount();
  });
});
