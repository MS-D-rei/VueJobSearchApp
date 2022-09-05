/**
 * @jest-environment jsdom
 */

import { mount, RouterLinkStub } from "@vue/test-utils";
// Pinia -- Testing Stores https://pinia.vuejs.org/cookbook/testing.html
import { createTestingPinia } from "@pinia/testing";
import MainNav from "@/components/Navigation/MainNav.vue";
import { useLoginStore } from "@/store/store";
import { createPinia, setActivePinia } from "pinia";

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});

const factroyMainNav = () => {
  return mount(MainNav, {
    global: {
      stubs: {
        ProfileImage: true,
        ActionButton: true,
        SubNav: true,
        "router-link": RouterLinkStub,
      },
      // returns a pinia instance designed to help unit tests components.
      plugins: [
        createTestingPinia({
          // https://pinia.vuejs.org/api/interfaces/pinia_testing.TestingOptions.html#plugins
          // stubActions: false => actions are only spied and get executed
          // stubActions: true => actions will be replaced with spies and not get executed
          // default -- true
          stubActions: true,
        }),
      ],
    },
  });
};

const factroyMainNavLoggedIn = () => {
  return mount(MainNav, {
    global: {
      stubs: {
        ProfileImage: true,
        ActionButton: true,
        SubNav: true,
        "router-link": RouterLinkStub,
      },
      plugins: [
        createTestingPinia({
          stubActions: true,
          initialState: {
            // id : { propery: value }
            login: { isLoggedIn: true },
          },
        }),
      ],
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

    it("when push login button, loginUser action in store will be called", async () => {
      const wrapper = factroyMainNav();
      const initialLoginStore = useLoginStore();
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(initialLoginStore.loginUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("when user is logged in", () => {
    it("displays the profile image", () => {
      const wrapper = factroyMainNavLoggedIn();
      // initialLoginStore.isLoggedIn = false;
      // let profileImage = wrapper.find("[data-test='profile-image']");
      // expect(profileImage.exists()).toBe(false);
      // const loginButton = wrapper.find("[data-test='login-button']");
      // await loginButton.trigger("click");

      // const initialLoginStore = useLoginStore();
      // console.log(initialLoginStore);
      // console.log(wrapper.html());
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
    it("displays subnavigation menu with additional information", () => {
      const wrapper = factroyMainNavLoggedIn();
      // let subnav = wrapper.find("[data-test='subnav']");
      // expect(subnav.exists()).toBe(false);
      // const loginButton = wrapper.find("[data-test='login-button']");
      // await loginButton.trigger("click");
      const subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
