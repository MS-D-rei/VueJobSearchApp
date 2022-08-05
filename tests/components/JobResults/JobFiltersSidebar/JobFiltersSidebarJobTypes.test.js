/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/store/store";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        AccordionContainer: false,
        FontAwesomeIcon: true,
      },
      plugins: [createTestingPinia()],
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
    // mock uniqueJobTypes (Pinia getter)
    const jobsStore = useJobsStore();
    jobsStore.uniqueJobTypes = new Set(["Full-time", "Part-time"]);
    // open Accordion
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    // job types in Accordion are uniqueJobTypes
    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
    // back to default behaivor
    jobsStore.uniqueJobTypes = undefined;
  });

  it("when check job type, selectedJobTypes will include it", async () => {
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
    const jobsStore = useJobsStore();
    jobsStore.uniqueJobTypes = new Set(["Full-time", "Part-time"]);
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const fullTimeInput = wrapper.find("[data-test='Full-time']");
    await fullTimeInput.setChecked();
    expect(jobsStore.selectedJobTypes).toEqual(["Full-time"]);
  });

  it("when check job type, go back to first page", async () => {
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
    const jobsStore = useJobsStore();
    jobsStore.uniqueJobTypes = new Set(["Full-time", "Part-time"]);
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const fullTimeInput = wrapper.find("[data-test='Full-time']");
    await fullTimeInput.setChecked();
    expect(push).toHaveBeenCalledWith({ name: "JobSearchResults" });
  });
});
