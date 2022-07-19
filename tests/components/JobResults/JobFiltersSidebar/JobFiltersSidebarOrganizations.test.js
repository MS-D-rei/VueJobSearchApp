/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

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

describe("JobFiltersSidebarOrganizations", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        AccordionContainer: false,
        FontAwesomeIcon: true,
      },
      plugins: [createTestingPinia()],
    },
  });

  it("renders unique list of organizations for filtering jobs", async () => {
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
    // after calling createTestingPinia(), we can configure store const jobsStore like below
    const jobsStore = useJobsStore();
    // getters are writable only in test // jobsStore.uniqueOrganization = Set(2) {"Google", "Amazon"};
    jobsStore.uniqueOrganizations = new Set(["Google", "Amazon"]);
    // console.log(initialJobsStore.uniqueOrganizations);
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    // console.log(wrapper.html());
    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());
    expect(organizations).toEqual(["Google", "Amazon"]);
    // set to undefined to reset the default behavior
    jobsStore.uniqueOrganizations = undefined;
  });

  it("when check organization, selectedOrganizations will includes it", async () => {
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
    const jobsStore = useJobsStore();
    jobsStore.uniqueOrganizations = new Set(["Google", "Amazon"]);
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const googleInput = wrapper.find("[data-test='Google']");
    await googleInput.setChecked();
    expect(jobsStore.selectedOrganizations).toEqual(["Google"]);
  });

  it("when check organization, go back to first page to see flesh filteredJobs", async () => {
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
    const jobsStore = useJobsStore();
    jobsStore.uniqueOrganizations = new Set(["Google", "Amazon"]);
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const googleInput = wrapper.find("[data-test='Google']");
    await googleInput.setChecked();
    expect(push).toHaveBeenCalledWith({ name: "JobSearchResults" });
  });
});
