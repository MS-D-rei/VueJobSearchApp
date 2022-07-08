/**
 * @jest-environment jsdom
 */

import axios from "axios";
import { mount, flushPromises } from "@vue/test-utils";
import { useRoute } from "vue-router";

import JobListings from "@/components/JobResults/JobListings.vue";

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

describe("JobListings", () => {
  const stubJobListing = () => ({
    global: {
      stubs: {
        JobListing: true,
      },
    },
  });

  const createRoute = (queryParams = {}) => ({
    query: {
      page: "1",
      ...queryParams,
    },
  });

  // Resolving Other Asynchronous Behavior
  // https://test-utils.vuejs.org/guide/advanced/async-suspense.html#resolving-other-asynchronous-behavior

  it("fetches jobs", async () => {
    useRoute.mockImplementationOnce(() => ({
      ...createRoute(),
    }));
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
    // console.log(axios.get());
    mount(JobListings, stubJobListing());
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("create a job listing for first 10 jobs", async () => {
    useRoute.mockImplementationOnce(() => ({
      ...createRoute({ page: "1" }),
    }));
    jest.spyOn(axios, "get").mockResolvedValue({ data: Array(10).fill({}) });
    const wrapper = mount(JobListings, stubJobListing());
    // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    // console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  it("create a job listing for next 10 jobs", async () => {
    useRoute.mockImplementationOnce(() => ({
      ...createRoute({ page: "2" }),
    }));
    jest.spyOn(axios, "get").mockResolvedValue({ data: Array(20).fill({}) });
    const wrapper = mount(JobListings, stubJobListing());
    // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    // console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });
});
