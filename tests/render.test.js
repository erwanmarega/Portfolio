import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Skills from "@/views/Skills.vue";

describe("Skills section", () => {
  it("renders the title and the technology layers", () => {
    const wrapper = mount(Skills, { global: { stubs: { FontAwesomeIcon: true } } });

    expect(wrapper.find("#skills-title").exists()).toBe(true);
    expect(wrapper.text()).toContain("Technologies");
    expect(wrapper.findAll("li.layer").length).toBeGreaterThan(0);
    wrapper.unmount();
  });
});
