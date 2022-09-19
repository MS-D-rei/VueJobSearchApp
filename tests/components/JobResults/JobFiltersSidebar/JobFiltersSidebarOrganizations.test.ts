/**
 * @jest-environment jsdom
 */

import { flushPromises, mount } from '@vue/test-utils';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';

import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useJobsStore } from '@/store/store';
import { useRouter } from 'vue-router';
import { DefineComponent } from 'vue';
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('JobFiltersSidebarOrganizations', () => {
  const createConfig = (stubsConfig = {}) => ({
    global: {
      stubs: {
        JobFiltersSidebarCheckboxGroup: true,
      },
      ...stubsConfig,
      plugins: [createTestingPinia()],
    },
  });

  it('allows users to filter jobs by organizations', async () => {
    const wrapperConfig = createConfig();
    const wrapper = mount(JobFiltersSidebarOrganizations, wrapperConfig);
    const jobsStore = useJobsStore();
    const testOrganizations = new Set(['Google', 'Amazon']);
    // @ts-expect-error: pinia Getter is writable only in test
    jobsStore.uniqueOrganizations = testOrganizations;
    await flushPromises();
    const organizationsFilter = wrapper.findComponent<DefineComponent>(
      JobFiltersSidebarCheckboxGroup
    );
    const { group } = organizationsFilter.props();
    expect(group).toEqual(testOrganizations);
  });

  it('when check organization, selectedOrganizations will includes it', async () => {
    const push = jest.fn();
    mockUseRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapperConfig = createConfig({ stubs: {JobFiltersSidebarCheckboxGroup: false} })
    const wrapper = mount(JobFiltersSidebarOrganizations, wrapperConfig);
    const jobsStore = useJobsStore();
    // @ts-expect-error: pinia getter is writable only in test
    jobsStore.uniqueOrganizations = new Set(['Google', 'Amazon']);
    await flushPromises();
    const googleInput = wrapper.find("[data-test='Google']");
    // await googleInput.setChecked();
    await googleInput.setValue(true);
    expect(jobsStore.selectedOrganizations).toEqual(['Google']);
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('renders unique list of organizations for filtering jobs', async () => {
  //   const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
  //   // after calling createTestingPinia(), we can configure store const jobsStore like below
  //   const jobsStore = useJobsStore();
  //   // @ts-expect-error: pinia getter is writable only in test // jobsStore.uniqueOrganization = Set(2) {"Google", "Amazon"};
  //   jobsStore.uniqueOrganizations = new Set(['Google', 'Amazon']);
  //   // console.log(initialJobsStore.uniqueOrganizations);
  //   const clickableArea = wrapper.find("[data-test='clickable-area']");
  //   await clickableArea.trigger('click');
  //   // console.log(wrapper.html());
  //   const organizationLabels = wrapper.findAll("[data-test='organization']");
  //   const organizations = organizationLabels.map((node) => node.text());
  //   expect(organizations).toEqual(['Google', 'Amazon']);
  //   // set to undefined to reset the default behavior
  //   // @ts-expect-error: pinia getter is writable only in test
  //   jobsStore.uniqueOrganizations = undefined;
  // });
});
