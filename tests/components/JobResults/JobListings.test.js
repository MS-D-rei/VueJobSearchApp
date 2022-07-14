/**
 * @jest-environment jsdom
 */

// Responsibility
// store object by Pinia => store.test.js, then mock store
// getJobs function from @/api/getJobs => getJobs.test.js, then mock getJobs with createTestingPinia

// import axios from "axios";
import { mount, flushPromises, RouterLinkStub } from "@vue/test-utils";
import { useRoute } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

import JobListings from "@/components/JobResults/JobListings.vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("JobListings", () => {
  const stubJobListing = (storeConfig) => ({
    global: {
      stubs: {
        JobListing: true,
        "router-link": RouterLinkStub,
      },
      plugins: [createTestingPinia(storeConfig)],
    },
  });

  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1",
      ...queryParams,
    },
  });

  const createStoreConfig = (storeProps = {}) => ({
    stubActions: true,
    initialState: {
      jobs: { openingJobs: Array(20).fill({}) },
    },
    ...storeProps,
  });

  // Resolving Other Asynchronous Behavior
  // https://test-utils.vuejs.org/guide/advanced/async-suspense.html#resolving-other-asynchronous-behavior

  // eslint-disable-next-line jest/no-commented-out-tests
  // it("fetches jobs", async () => {
  //   useRoute.mockImplementationOnce(() => ({
  //     ...createRoute(),
  //   }));
  //   jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
  //   // console.log(axios.get());
  //   mount(JobListings, stubJobListing());
  //   await flushPromises();
  //   expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  //   axios.get.mockReset();
  // });

  it("create a job listing for first 10 jobs", async () => {
    useRoute.mockImplementationOnce(() => ({
      ...createRoute({ page: "1" }),
    }));
    // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(10).fill({}) });
    const numberOfJobsData = 20;
    const storeConfig = createStoreConfig({
      initialState: {
        jobs: { openingJobs: Array(numberOfJobsData).fill({}) }
      }
    });
    const wrapper = mount(JobListings, stubJobListing(storeConfig));
    // // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    // // console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
    // axios.get.mockReset();
  });

  it("create a job listing for next 10 jobs", async () => {
    useRoute.mockImplementationOnce(() => ({
      ...createRoute({ page: "2" }),
    }));
    // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    const numberOfJobsData = 20;
    const storeConfig = createStoreConfig({
      initialState: {
        jobs: { openingJobs: Array(numberOfJobsData).fill({}) },
      },
    });
    const wrapper = mount(JobListings, stubJobListing(storeConfig));
    // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    // console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
    // axios.get.mockReset();
  });

  describe("when params exclude page number", () => {
    it("display page No.1", () => {
      useRoute.mockImplementationOnce(() => ({
        ...createRoute({ page: undefined }),
      }));
      const storeConfig = createStoreConfig()
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      expect(wrapper.text()).toMatch("Page: 1");
    });
  });

  describe("when params include page number", () => {
    it("display page number", () => {
      useRoute.mockImplementationOnce(() => ({
        ...createRoute({ page: 3 }),
      }));
      const wrapper = mount(JobListings, stubJobListing());
      expect(wrapper.text()).toMatch("Page: 3");
    });
  });

  describe("when user is on first page of job results", () => {
    beforeEach(() => {
      useRoute.mockImplementationOnce(() => ({
        ...createRoute({ page: 1 }),
      }));
      // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    });

    // afterEach(() => {
    //   axios.get.mockReset();
    // });

    it("does not show link to previous page", async () => {
      const numberOfJobsData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobsData).fill({}) },
        },
      })
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("shows link to next page", async () => {
      const numberOfJobsData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobsData).fill({}) },
        },
      })
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      await flushPromises();
      // console.log(wrapper.html());
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    beforeEach(() => {
      useRoute.mockImplementationOnce(() => ({
        ...createRoute({ page: 2 }),
      }));
      // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    });
    afterEach(() => {
      // axios.get.mockReset();
    });

    it("shows link to previous page", async () => {
      const numberOfJobsData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobsData).fill({}) },
        },
      })
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });

    it("does not show link to next page", async () => {
      const numberOfJobsData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobsData).fill({}) }
        }
      })
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
