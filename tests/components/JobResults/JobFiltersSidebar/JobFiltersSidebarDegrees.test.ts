/**
 * @jest-environment jsdom
 */

import { flushPromises, mount } from '@vue/test-utils';
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useJobsStore } from '@/store/store';
import { DefineComponent } from 'vue';
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useRouter } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;

describe('JobFiltersSidebarDegrees', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const createConfig = (stubsConfig = {}) => ({
    global: {
      stubs: {
        JobFiltersSidebarCheckboxGroup: true,
      },
      ...stubsConfig,
      plugins: [createTestingPinia()],
    },
  });

  it('allows users to filter jobs by degrees', async () => {
    const wrapperConfig = createConfig();
    const wrapper = mount(JobFiltersSidebarDegrees, wrapperConfig);
    const jobsStore = useJobsStore();
    const testDegreesSet = new Set(["Bachelor's", "Master's"]);
    // @ts-expect-error: pinia Getter is writable only in test
    jobsStore.uniqueDegrees = testDegreesSet;
    await flushPromises();
    const degreesFilter = wrapper.findComponent<DefineComponent>(
      JobFiltersSidebarCheckboxGroup
    );
    const { group } = degreesFilter.props();
    expect(group).toEqual(testDegreesSet);
  });

  it('when check degree, selectedDegrees will include it', async () => {
    const push = jest.fn();
    mockUseRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapperConfig = createConfig({
      stubs: { JobFiltersSidebarCheckboxGroup: false },
    });
    const wrapper = mount(JobFiltersSidebarDegrees, wrapperConfig);
    const jobsStore = useJobsStore();
    // @ts-expect-error: pinia Getter is writable only in test
    jobsStore.uniqueDegrees = new Set(['Bachelor', 'Master']);
    await flushPromises();
    const masterDegreeInput = wrapper.find("[data-test='Master']");
    masterDegreeInput.setValue(true);
    expect(jobsStore.selectedDegrees).toEqual(['Master']);
  });
});
