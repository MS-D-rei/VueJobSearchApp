/**
 * @jest-environment jsdom
 */
/* eslint-disable jest/no-commented-out-tests */
// Responsibility
// store object by Pinia => store.test.js, then mock store
// getJobs function from @/api/getJobs => getJobs.test.js, then mock getJobs with createTestingPinia
// currentPageNumber => useCurrentPage.test.js
// previousPage, nextPage => usePreviousAndNextPage.test.js

// import axios from "axios";
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils';
// import { useRoute } from "vue-router";
import { createPinia, setActivePinia } from 'pinia';
import { createTestingPinia, TestingOptions } from '@pinia/testing';
import { useJobsStore } from '@/store/store';

import JobListings from '@/components/JobResults/JobListings.vue';
import useCurrentPage from '@/composables/useCurrentPage';
jest.mock('@/composables/useCurrentPage');
const mockUseCurrentPage = useCurrentPage as jest.Mock;
import usePreviousAndNextPage from '@/composables/usePreviousAndNextPage';
jest.mock('@/composables/usePreviousAndNextPage');
const mockUsePreviousAndNextPage = usePreviousAndNextPage as jest.Mock;

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
}));

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('JobListings', () => {
  const stubJobListing = (storeConfig: Partial<TestingOptions>) => ({
    global: {
      stubs: {
        JobListing: true,
        'router-link': RouterLinkStub,
      },
      plugins: [createTestingPinia(storeConfig)],
    },
  });

  // const createRoute = (queryParams = {}) => ({
  //   query: {
  //     page: "1",
  //     ...queryParams,
  //   },
  // });

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

  it('create a job listing for first 10 jobs', async () => {
    // useRoute.mockImplementationOnce(() => ({
    //   ...createRoute({ page: "1" }),
    // }));
    mockUseCurrentPage.mockReturnValue(1);
    mockUsePreviousAndNextPage.mockReturnValue({
      previousPage: undefined,
      nextPage: 2,
    });
    const numberOfJobData = 20;
    const storeConfig = createStoreConfig({
      initialState: {
        jobs: { openingJobs: Array(numberOfJobData).fill({}) },
      },
    });
    const wrapper = mount(JobListings, stubJobListing(storeConfig));
    const jobsStore = useJobsStore();
    // Pinia's getter is writable only in test but typescript can't understand it. That's why the following error occurs.
    // https://github.com/vuejs/pinia/issues/945
    // Error: Cannot assign to 'filteredJobs' because it is a read-only property.ts(2540)
    // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
    jobsStore.filteredJobs = Array(10).fill({});
    // // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    // // console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
    // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
    jobsStore.filteredJobs = undefined;
  });

  it('create a job listing for next 10 jobs', async () => {
    // useRoute.mockImplementationOnce(() => ({
    //   ...createRoute({ page: "2" }),
    // }));
    mockUseCurrentPage.mockReturnValue(2);
    mockUsePreviousAndNextPage.mockReturnValue({
      previousPage: 1,
      nextPage: undefined
    });
    // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    const numberOfJobData = 20;
    const storeConfig = createStoreConfig({
      initialState: {
        jobs: { openingJobs: Array(numberOfJobData).fill({}) },
      },
    });
    const wrapper = mount(JobListings, stubJobListing(storeConfig));
    const jobsStore = useJobsStore();
    // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
    jobsStore.filteredJobs = Array(numberOfJobData).fill({});
    // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    // console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
    // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
    jobsStore.filteredJobs = undefined;
  });

  // Move to useCurrentPage.test.js
  // describe("when params exclude page number", () => {
  //   it("display page No.1", () => {
  //     useRoute.mockImplementationOnce(() => ({
  //       ...createRoute({ page: undefined }),
  //     }));
  //     const storeConfig = createStoreConfig();
  //     const wrapper = mount(JobListings, stubJobListing(storeConfig));
  //     expect(wrapper.text()).toMatch("Page: 1");
  //   });
  // });
  // describe("when params include page number", () => {
  //   it("display page number", () => {
  //     useRoute.mockImplementationOnce(() => ({
  //       ...createRoute({ page: 3 }),
  //     }));
  //     const wrapper = mount(JobListings, stubJobListing());
  //     expect(wrapper.text()).toMatch("Page: 3");
  //   });
  // });

  describe('when user is on first page of job results', () => {
    beforeEach(() => {
      // useRoute.mockImplementationOnce(() => ({
      //   ...createRoute({ page: 1 }),
      // }));
      mockUseCurrentPage.mockReturnValue(1);
      mockUsePreviousAndNextPage.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    });

    // afterEach(() => {
    //   axios.get.mockReset();
    // });

    it('does not show link to previous page', async () => {
      const numberOfJobData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobData).fill({}) },
        },
      });
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      const jobsStore = useJobsStore();
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = Array(numberOfJobData).fill({});
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = undefined;
    });

    it('shows link to next page', async () => {
      const numberOfJobData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobData).fill({}) },
        },
      });
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      const jobsStore = useJobsStore();
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = Array(numberOfJobData).fill({});
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = undefined;
    });
  });

  describe('when user is on last page of job results', () => {
    beforeEach(() => {
      // useRoute.mockImplementationOnce(() => ({
      //   ...createRoute({ page: 2 }),
      // }));
      mockUseCurrentPage.mockReturnValue(2);
      mockUsePreviousAndNextPage.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      // jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    });
    afterEach(() => {
      // axios.get.mockReset();
    });

    it('shows link to previous page', async () => {
      const numberOfJobData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobData).fill({}) },
        },
      });
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      const jobsStore = useJobsStore();
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = Array(numberOfJobData).fill({});
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = undefined;
    });

    it('does not show link to next page', async () => {
      const numberOfJobData = 20;
      const storeConfig = createStoreConfig({
        initialState: {
          jobs: { openingJobs: Array(numberOfJobData).fill({}) },
        },
      });
      const wrapper = mount(JobListings, stubJobListing(storeConfig));
      const jobsStore = useJobsStore();
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = Array(numberOfJobData).fill({});
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
      // @ts-expect-error: Getter is read only /* this line of code is needed to silent the error above */
      jobsStore.filteredJobs = undefined;
    });
  });
});
