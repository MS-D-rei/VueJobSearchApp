/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import AccordionContainer from "@/components/Shared/AccordionContainer.vue";

describe("AccordionContainer", () => {
  const createPropsConfig = (props = {}) => ({
    header: "Tests header",
    ...props
  })

  const createSlotsConfig = (slots = {}) => ({
    default: "<h3>nested components</h3>",
    ...slots
  })

  const createConfig = (propsConfig: { header: string }, slotsConfig: { default?: string }) => ({
    global: {
      stubs: {
        'FontAwesomeIcon': true,
      }
    },
    props: {
      ...propsConfig
    },
    slots: {
      ...slotsConfig
    },
  })

  it("render child components", async () => {
    const propsConfig = createPropsConfig();
    const slotsConfig = createSlotsConfig();
    const wrapper = mount(AccordionContainer, createConfig(propsConfig, slotsConfig));
    expect(wrapper.text()).not.toMatch("nested components");

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("nested components");
  })

  describe("when provide no child component", () => {
    it("renders default content", async () => {
      const propsConfig = createPropsConfig();
      const slotsConfig = {};
      const wrapper = mount(AccordionContainer, createConfig(propsConfig, slotsConfig));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("Fallback content");
    })
  })
})