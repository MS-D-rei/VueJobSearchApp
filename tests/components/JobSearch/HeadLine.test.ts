/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import HeadLine from "@/components/JobSearch/HeadLine.vue";

describe("HeadLine", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays introductory action verb", () => {
    const wrapper = mount(HeadLine);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
  });
  it("changes action verb at a consistent interval", () => {
    // spyOn - Creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function.
    jest.spyOn(global, "setInterval");
    mount(HeadLine);
    expect(setInterval).toHaveBeenCalled();
  });
  it("swaps action verb after first interval", async () => {
    const wrapper = mount(HeadLine);
    jest.runOnlyPendingTimers(); // proceed pending task
    await nextTick(); // reflect the changes to the virtual view
    // When you mutate reactive state in Vue, the resulting DOM updates are not applied synchronously.
    // Instead, Vue buffers them until the "next tick" to ensure that
    // each component updates only once no matter how many state changes you have made.
    // nextTick() can be used immediately after a state change to wait for the DOM updates to complete.
    // You can either pass a callback as an argument, or await the returned Promise.
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Create for everyone");
  });
  it("remove interval when component unMounted", () => {
    jest.spyOn(global, "clearInterval");
    const wrapper = mount(HeadLine);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
