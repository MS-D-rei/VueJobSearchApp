/**
 * @jest-environment jsdom
 */

// Responsibility
// SubNav
// when logged in, shows jobsStore.filetedJobs count correctly.
// when logged out, doesn't show jobs count.
// jobsStore => store.test.js, so mock it.
// routeName check => useConfirmRoute.test.js

import { flushPromises, mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/store/store"
import useConfirmRoute from "@/composables/useConfirmRoute"

// vue-utils vue-router with Composition API
// https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api

jest.mock("@/composables/useConfirmRoute")
const mockUseConfirmRoute = useConfirmRoute as jest.Mock;

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

      // const routeName = "JobSearchResults";
      // useRoute.mockImplementationOnce(() => ({
      //   name: routeName,
      // }));
      // when user is on job page, useConfirmRoute returns true
      mockUseConfirmRoute.mockReturnValue(true);
      const wrapper = mount(SubNav, createConfig());
      // mock jobsStore.filteredJobs
      const numberOfFilteredJobs = 2;
      const mockedFilteredJobs = Array(numberOfFilteredJobs).fill({});
      const jobsStore = useJobsStore();
      // Pinia's getter is writable only in test but typescript can't understand it. That's why the following error occurs.
      // https://github.com/vuejs/pinia/issues/945
      // Error: Cannot assign to 'filteredJobs' because it is a read-only property.ts(2540)
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */ 
      jobsStore.filteredJobs = mockedFilteredJobs;
      // wait for reacting to mocked jobsStore.filteredJobs change
      await flushPromises();
      // console.log(wrapper.html());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toEqual(`${jobsStore.filteredJobs.length}`);
       // @ts-expect-error: Getter is read only
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

      // const routeName = "Home";
      // useRoute.mockImplementationOnce(() => ({
      //   name: routeName,
      // }));
      // when user is not on job page, useConfirmRoute returns false
      mockUseConfirmRoute.mockReturnValue(false);
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
