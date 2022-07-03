/**
 * @jest-environment jsdom
 */
import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav";
import { useRoute } from "vue-router";

// vue-utils vue-router with Composition API
// https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

describe("SubNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      // const wrapper = mount(SubNav, {
      //   global: {
      //     stubs: {
      //       FontAwesomeIcon: true,
      //     },
      //   },
      //   setup() {
      //     const onJobResultPage = true;
      //     return {
      //       onJobResultPage,
      //     };
      //   },
      // });
      const routeName = "JobSearchResults";
      useRoute.mockImplementationOnce(() => ({
        name: routeName,
      }));
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });
  describe("when user is not on job page", () => {
    it("does not display job count", () => {
      // const $route = {
      //   name: "Home",
      // };
      // const wrapper = mount(SubNav, {
      //   global: {
      //     stubs: {
      //       FontAwesomeIcon: true,
      //     },
      //   },
      //   // setup() {
      //   //   const onJobResultPage = false;
      //   //   return {
      //   //     onJobResultPage,
      //   //   };
      //   // },
      // });
      const routeName = "Home";
      useRoute.mockImplementationOnce(() => ({
        name: routeName,
      }));
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
