/**
 * @jest-environment jsdom
 */

import axios from "axios";
import { mount, flushPromises } from "@vue/test-utils";

import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  const stubJobListing = () => ({
    global: {
      stubs: {
        JobListing: true,
      },
    },
  });

  // Resolving Other Asynchronous Behavior
  // https://test-utils.vuejs.org/guide/advanced/async-suspense.html#resolving-other-asynchronous-behavior

  it("fetches jobs", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
    // console.log(axios.get());
    mount(JobListings, stubJobListing());
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
  });

  it("create a job listing for each job", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = mount(JobListings, stubJobListing());
    // console.log(wrapper.html());
    await flushPromises(); // axios promise is resolved immediately
    console.log(wrapper.html());
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(15);
  });
});
