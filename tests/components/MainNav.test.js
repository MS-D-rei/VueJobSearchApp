/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav";

describe("MainNav", () => {
  it("displays company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Anonymous Careers");
  });
  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    // data-test, custom attribute is for testing robustness
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    // toBe is for strict equality(===). toEqual is for equality(==)
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Anonymous Careers",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });
});
