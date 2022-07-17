/**
 * @jest-environment jsdom
 */

// Responsibility
// SubNav
// when logged in, shows jobsStore.filetedJobs count correctly.
// when logged out, doesn't show jobs count.
// jobsStore => store.test.js, so mock it.

import { flushPromises, mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav";
import { useRoute } from "vue-router";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/store/store"

// vue-utils vue-router with Composition API
// https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

beforeEach(() => {
  setActivePinia(createPinia());
})

describe("SubNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
      plugins: [createTestingPinia({
        initialState: {
          jobs: { openingJobs: Array(20).fill({}) }
        }
      })],
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", async () => {
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
      // mock jobsStore.filteredJobs
      const numberOfFilteredJobs = 2;
      const mockedFilteredJobs = Array(numberOfFilteredJobs).fill({});
      const jobsStore = useJobsStore();
      jobsStore.filteredJobs = mockedFilteredJobs;
      // wait for reacting to mocked jobsStore.filteredJobs change
      await flushPromises();
      // console.log(wrapper.html());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toEqual(`${jobsStore.filteredJobs.length}`);
      jobsStore.filteredJobs = undefined;
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
