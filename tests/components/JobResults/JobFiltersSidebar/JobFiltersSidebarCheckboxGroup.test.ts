/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';
import { useJobsStore } from '@/store/store';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createPropsConfig = (props = {}) => ({
    group: new Set(['TypeA', 'TypeB', 'TypeC']),
    modelName: 'selectedJobTypes',
    ...props,
  });
  const createConfig = (propsConfig: {
    group: Set<string>;
    modelName: string;
  }) => ({
    global: {
      stubs: {
        // AccordionContainer: false,
        // FontAwesomeIcon: true,
      },
      plugins: [createTestingPinia()],
    },
    props: {
      ...propsConfig,
    },
  });
  it('renders unique group list from props', async () => {
    // Make wrapper with props
    const propsConfig = createPropsConfig({
      group: new Set(['TypeA', 'TypeB', 'TypeC']),
    });
    const wrapper = mount(
      JobFiltersSidebarCheckboxGroup,
      createConfig(propsConfig)
    );
    // Open accordion /* no need to test because moved AccordionContainer to outside this component */
    // const clickableArea = wrapper.find("[data-test='clickable-area']");
    // await clickableArea.trigger('click');
    // Extract label names
    const jobTypeLabels = wrapper.findAll("[data-test='labelName']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(['TypeA', 'TypeB', 'TypeC']);
  });
  it('when check item, selectedItemList will include it', async () => {
    // Mock router
    const push = jest.fn();
    mockUseRouter.mockImplementationOnce(() => ({
      push,
    }));
    // Make wrapper with props
    const propsConfig = createPropsConfig({
      group: new Set(['TypeA', 'TypeB', 'TypeC']),
    });
    const wrapper = mount(
      JobFiltersSidebarCheckboxGroup,
      createConfig(propsConfig)
    );
    // Make wrapper => create store, otherwise can't use store
    const jobsStore = useJobsStore();
    // Open accordion /* no need to test because moved AccordionContainer to outside this component */
    // const clickableArea = wrapper.find("[data-test='clickable-area']");
    // await clickableArea.trigger('click');
    // Check Full-time checkbox
    const fullTimeInput = wrapper.find("[data-test='TypeA']");
    // await fullTimeInput.setChecked();
    // setValue -- Vue Test Utils
    // https://test-utils.vuejs.org/api/#setvalue
    await fullTimeInput.setValue(true);
    expect(jobsStore.selectedJobTypes).toEqual(['TypeA']);
  });
  it('when check item, go back to the first page', async () => {
    const push = jest.fn();
    mockUseRouter.mockImplementationOnce(() => ({
      push,
    }));
    const propsConfig = createPropsConfig({
      group: new Set(['TypeA', 'TypeB', 'TypeC']),
    });
    const wrapper = mount(
      JobFiltersSidebarCheckboxGroup,
      createConfig(propsConfig)
    );
    // Open accordion /* no need to test because moved AccordionContainer to outside this component */
    // const clickableArea = wrapper.find("[data-test='clickable-area']");
    // await clickableArea.trigger('click');
    const fullTimeInput = wrapper.find("[data-test='TypeA']");
    // await fullTimeInput.setChecked();
    await fullTimeInput.setValue(true);
    expect(push).toHaveBeenCalledWith({ name: 'JobSearchResults' });
  });
});
