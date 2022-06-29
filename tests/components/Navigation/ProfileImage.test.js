/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";

describe("ProfileImage", () => {
  it("renders", () => {
    const wrapper = mount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
