import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Skills from "@/views/Skills.vue";
import { reveal } from "@/directives/reveal.js";

describe("Skills section", () => {
  it("renders the title and the technology groups", () => {
    const wrapper = mount(Skills, { global: { directives: { reveal } } });

    expect(wrapper.find("#skills-title").text()).toBe("Stack");
    expect(wrapper.findAll("dt").length).toBeGreaterThan(0);
    expect(wrapper.findAll("li.tech").length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain("Vue.js");
    wrapper.unmount();
  });
});
