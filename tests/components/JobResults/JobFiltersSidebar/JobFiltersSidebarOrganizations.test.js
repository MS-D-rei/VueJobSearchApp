/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/store/store";

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
    const initialJobsStore = useJobsStore();
    // getters are writable only in test // jobsStore.uniqueOrganization = Set(2) {"Google", "Amazon"};
    initialJobsStore.uniqueOrganizations = new Set(["Google", "Amazon"]);
    // console.log(initialJobsStore.uniqueOrganizations);
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    // console.log(wrapper.html());
    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organization = organizationLabels.map((node) => node.text());
    expect(organization).toEqual(["Google", "Amazon"]);
    // set to undefined to reset the default behavior
    initialJobsStore.uniqueOrganizations = undefined;
  });
});
