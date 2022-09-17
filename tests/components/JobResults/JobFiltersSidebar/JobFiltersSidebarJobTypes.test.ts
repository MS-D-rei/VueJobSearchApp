/**
 * @jest-environment jsdom
 */

import { mount, flushPromises } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/store/store";
import { useRouter } from "vue-router";
import { DefineComponent } from "vue";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = (stubsConfig = {}) => ({
    global: {
      stubs: {
        JobFiltersSidebarCheckboxGroup: true,
      },
      ...stubsConfig,
      plugins: [createTestingPinia()],
    },
  });

  it('allows users to filter jobs by job types', async () => {
    const wrapperConfig = createConfig();
    const wrapper = mount(JobFiltersSidebarJobTypes, wrapperConfig);
    const jobsStore = useJobsStore();
    const testJobTypes = new Set(['Full-time', 'Part-time']);
    // @ts-expect-error: Getter is read-only but writable in test
    jobsStore.uniqueJobTypes = testJobTypes;
    await flushPromises();
    /*  WTF: the code line below doesn't work. COULD'T FIND THE REASON */
    // const jobTypesFilter = wrapper.findComponent<DefineComponent>(
    //   "data-test='job-types-filter'"
    // );
    const jobTypesFilter = wrapper.findComponent<DefineComponent>(
      JobFiltersSidebarCheckboxGroup
    );
    console.log(jobTypesFilter.html());
    console.log(jobTypesFilter.props());
    const { group } = jobTypesFilter.props();
    expect(group).toEqual(testJobTypes);
    // @ts-expect-error: Getter is read-only but writable in test
    jobsStore.uniqueJobTypes = undefined;
  });

  it("when check job type, selectedJobTypes will include it", async () => {
    const push = jest.fn();
    mockUseRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapperConfig = createConfig({stubs: { JobFiltersSidebarCheckboxGroup: false }});
    const wrapper = mount(JobFiltersSidebarJobTypes, wrapperConfig);
    const jobsStore = useJobsStore();
    // @ts-expect-error: pinia getter is writable in test
    jobsStore.uniqueJobTypes = new Set(["Full-time", "Part-time"]);
    await flushPromises();
    const fullTimeInput = wrapper.find("[data-test='Full-time']");
    // await fullTimeInput.setChecked();
    await fullTimeInput.setValue(true);
    expect(jobsStore.selectedJobTypes).toEqual(["Full-time"]);
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it("renders unique list of job types for filtering jobs", async () => {
  //   const wrapper = mount(JobFiltersSidebarJobTypes, createConfig());
  //   const jobsStore = useJobsStore();
  //   // @ts-expect-error: pinia getter is writable in test
  //   jobsStore.uniqueJobTypes = new Set(["Full-time", "Part-time"]);
  //   // open Accordion
  //   const clickableArea = wrapper.find("[data-test='clickable-area']");
  //   await clickableArea.trigger("click");
  //   // job types in Accordion are uniqueJobTypes
  //   const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
  //   const jobTypes = jobTypeLabels.map((node) => node.text());
  //   expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  //   // back to default behaivor
  //   // @ts-expect-error: pinia getter is writable in test
  //   jobsStore.uniqueJobTypes = undefined;
  // });
});
