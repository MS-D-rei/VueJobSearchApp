/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav";

describe("MainNav", () => {
  it("display company name", () => {
    const wrapper = mount(MainNav);
    console.log(wrapper.text());
  });
});
