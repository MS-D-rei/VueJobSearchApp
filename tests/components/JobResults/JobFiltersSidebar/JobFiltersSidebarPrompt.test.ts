/**
 * @jest-environment jsdom
 */

import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useJobsStore } from '@/store/store';

describe('JobFiltersSidebarPrompt', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })
  describe('when user click clear filters button', () => {
    it('clear all job search filters', async () => {
      const wrapper = mount(JobFiltersSidebarPrompt, {
        global: {
          stubs: {
            ActionButton: false,
          },
          plugins: [createTestingPinia()],
        },
      });
      const jobsStore = useJobsStore();
      // console.log(wrapper.html());
      const clearFilterButton = wrapper.find("[data-test='clear-filters-button']");
      await clearFilterButton.trigger('click');
      // Pinia actions are mocked by default
      expect(jobsStore.clearFilters).toHaveBeenCalledTimes(1)
    });
  });
});
