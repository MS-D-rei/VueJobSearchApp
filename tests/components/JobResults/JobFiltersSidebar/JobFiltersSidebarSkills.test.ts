/**
 * @jest-environment jsdom
 */

import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useJobsStore } from '@/store/store';
import { mount } from '@vue/test-utils';

describe('JobFiltersSidebarSkills', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('when input skill, store skillsSearchTerm will include it', async () => {
    const wrapper = mount(JobFiltersSidebarSkills, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const jobsStore = useJobsStore();
    const skillInput = wrapper.find("[data-test='skill-filter']");
    await skillInput.setValue('Vue');
    expect(jobsStore.skillsSearchTerm).toEqual('Vue');
  });

  it('input field reads skillsSearchTerm from store', async () => {
    const wrapper = mount(JobFiltersSidebarSkills, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              jobs: { skillsSearchTerm: 'React' },
            },
          }),
        ],
      },
    });
    const skillInput = wrapper.find("[data-test='skill-filter']");
    const inputElement = skillInput.element as HTMLInputElement;
    expect(inputElement.value).toEqual('React');
  });

  it('remove whitespace from user input', async () => {
    const wrapper = mount(JobFiltersSidebarSkills, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const jobsStore = useJobsStore();
    const skillInput = wrapper.find("[data-test='skill-filter']");
    await skillInput.setValue('   Vue   ');
    expect(jobsStore.skillsSearchTerm).toEqual('Vue'); 
  })
});
