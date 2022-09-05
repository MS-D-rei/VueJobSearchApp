/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  const createSlotsConfig = (slots = {}) => ({
    title: "<h2>Title for test</h2>",
    subtitle: "<h3>Subtitle for test</h3>",
    ...slots,
  });

  const createConfig = (slotsConfig: { title: string, subtitle: string }) => ({
    slots: {
      ...slotsConfig,
    }
  });

  it("allows parent component to provide title content", () => {
    const slotsConfig = createSlotsConfig();
    const wrapper = mount(HeaderContainer, createConfig(slotsConfig));
    expect(wrapper.text()).toMatch("Title for test");
  });

  it("allows parent component to provide subtitle content", () => {
    const slotsConfig = createSlotsConfig({ subtitle: "subtitle for test" });
    const wrapper = mount(HeaderContainer, createConfig(slotsConfig));
    // console.log(wrapper.text());
    expect(wrapper.text()).toMatch("subtitle for test");
  })
});
