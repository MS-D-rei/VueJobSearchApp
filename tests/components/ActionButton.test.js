/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import ActionButton from "@/components/ActionButton";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Sign in",
        type: "sign-in",
      },
    });
    expect(wrapper.text()).toMatch("Sign in");
  });

  it("applies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Sign in",
        type: "sign-in",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("sign-in")).toBe(true)
  });
});
