/**
 * @jest-environment jsdom
 */

import { mount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

const factroyMainNav = () => {
  return mount(MainNav, {
    global: {
      stubs: {
        ProfileImage: true,
        ActionButton: true,
        SubNav: true,
        "router-link": RouterLinkStub,
      },
    },
  });
};

describe("MainNav", () => {
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = mount(MainNav, {
  //     global: {
  //       stubs: {
  //         ProfileImage: true,
  //         ActionButton: true,
  //         SubNav: true,
  //         "router-link": RouterLinkStub,
  //       },
  //     },
  //   });
  // });
  it("displays company name", () => {
    const wrapper = factroyMainNav();
    // console.log(wrapper.html());
    expect(wrapper.text()).toMatch("Anonymous Careers");
  });
  it("displays menu items for navigation", () => {
    const wrapper = factroyMainNav();
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

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = factroyMainNav();
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user logs in", () => {
    it("displays the profile image", async () => {
      const wrapper = factroyMainNav();
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
    it("displays subnavigation menu with additional information", async () => {
      const wrapper = factroyMainNav();
      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
