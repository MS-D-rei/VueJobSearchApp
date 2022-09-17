/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
// import { useJobsStore } from '@/store/store';
// import { DefineComponent } from 'vue';

describe('JobFiltersSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const createConfig = () => ({
    global: {
      stubs: {
        AccordionContainer: true,
        JobFiltersSidebarJobTypes: true,
        JobFiltersSidebarOrganizations: true,
        JobFiltersSidebarDegrees: true,
      },
      plugins: [createTestingPinia()],
    },
  });

  it('sets up panels for user to filter jobs by one or more criteria', () => {
    const wrapperConfig = createConfig();
    const wrapper = mount(JobFiltersSidebar, wrapperConfig);
    expect(wrapper.exists()).toBe(true);
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('allows users to filter jobs by job types', async () => {
  //   const wrapperConfig = createConfig();
  //   const wrapper = mount(JobFiltersSidebar, wrapperConfig);
  //   const jobsStore = useJobsStore();
  //   const testJobTypes = new Set(['Full-time', 'Part-time']);
  //   // @ts-expect-error: Getter is read-only but writable in test
  //   jobsStore.uniqueJobTypes = testJobTypes;
  //   await flushPromises();
  //   console.log(wrapper.html());
  //   const jobTypesFilter = wrapper.findComponent<DefineComponent>(
  //     "[data-test='job-types-filter']"
  //   );
  //   // console.log(jobTypesFilter.html());
  //   const { header, group } = jobTypesFilter.props();
  //   expect(header).toBe('Job Types');
  //   expect(group).toEqual(testJobTypes);
  //   // @ts-expect-error: Getter is read-only but writable in test
  //   jobsStore.uniqueJobTypes = undefined;
  // });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('allows users to filter jobs by organization', async () => {
  //   const wrapperConfig = createConfig();
  //   const wrapper = mount(JobFiltersSidebar, wrapperConfig);
  //   const jobsStore = useJobsStore();
  //   const testOrganizations = new Set(['Alphabet']);
  //   // @ts-expect-error: Getter is read-only but writable in test
  //   jobsStore.uniqueOrganizations = testOrganizations;
  //   await flushPromises();
  //   const organizationsFilter = wrapper.findComponent<DefineComponent>(
  //     "[data-test='job-organizations-filter']"
  //   );
  //   const { header, group } = organizationsFilter.props();
  //   expect(header).toBe('Organizations');
  //   expect(group).toEqual(testOrganizations);
  //   // @ts-expect-error: Getter is writable in test
  //   jobsStore.uniqueOrganizations = undefined;
  // });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('allows users to filter jobs by degree', async () => {
  //   const wrapperConfig = createConfig();
  //   const wrapper = mount(JobFiltersSidebar, wrapperConfig);
  //   const jobsStore = useJobsStore();
  //   const testDegrees = new Set(["Bachelor's", "Master's"]);
  //   // @ts-expect-error: Getter is read-only but writable only in test
  //   jobsStore.uniqueDegrees = testDegrees;
  //   await flushPromises();
  //   const degreesFilter = wrapper.findComponent<DefineComponent>(
  //     "[data-test='job-degrees-filter']"
  //   );
  //   const { header, group } = degreesFilter.props();
  //   expect(header).toBe('Degrees');
  //   expect(group).toEqual(testDegrees);
  //   // @ts-expect-error: Getter is writable only in test, this is for neutralizing
  //   jobsStore.uniqueDegrees = undefined;
  // });
});
