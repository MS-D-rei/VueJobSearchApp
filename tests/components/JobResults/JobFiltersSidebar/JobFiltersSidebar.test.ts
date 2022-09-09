/**
 * @jest-environment jsdom
 */

import { flushPromises, mount } from '@vue/test-utils';
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useJobsStore } from '@/store/store';
import { DefineComponent } from 'vue';

describe('JobFiltersSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const createConfig = () => ({
    global: {
      stubs: {
        AccordionContainer: true,
        JobFiltersSidebarCheckboxGroup: true,
      },
      plugins: [createTestingPinia()],
    },
  });

  it('allows users to filter jobs by job types', async () => {
    const wrapperConfig = createConfig();
    const wrapper = mount(JobFiltersSidebar, wrapperConfig);
    const jobsStore = useJobsStore();
    const testJobTypes = new Set(['Full-time', 'Part-time']);
    // @ts-expect-error: Getter is read-only but writable in test
    jobsStore.uniqueJobTypes = testJobTypes;
    await flushPromises();
    // console.log(wrapper.html());
    const jobTypesFilter = wrapper.findComponent<DefineComponent>(
      "[data-test='job-types-filter']"
    );
    // console.log(jobTypesFilter.html());
    const { header, group } = jobTypesFilter.props();
    expect(header).toBe('Job Types');
    expect(group).toEqual(testJobTypes);
    // @ts-expect-error: Getter is read-only but writable in test
    jobsStore.uniqueJobTypes = undefined;
  });
  it('allows users to filter jobs by organization', async () => {
    const wrapperConfig = createConfig();
    const wrapper = mount(JobFiltersSidebar, wrapperConfig);
    const jobsStore = useJobsStore();
    const testOrganizations = new Set(['Alphabet']);
    // @ts-expect-error: Getter is read-only but writable in test
    jobsStore.uniqueOrganizations = testOrganizations;
    await flushPromises();
    const organizationsFilter = wrapper.findComponent<DefineComponent>(
      "[data-test='job-organizations-filter']"
    );
    const { header, group } = organizationsFilter.props();
    expect(header).toBe('Organizations');
    expect(group).toEqual(testOrganizations);
    // @ts-expect-error: Getter is writable in test
    jobsStore.uniqueOrganizations = undefined;
  });
});
