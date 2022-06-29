/**
 * @jest-environment jsdom
 */
import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav";

describe("SubNav", () => {
  describe("when user is on job page", () => {
    it("displays job count", () => {
      const wrapper = mount(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        setup() {
          const onJobResultPage = true;
          return {
            onJobResultPage,
          };
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });
  describe("when user is not on job page", () => {
    it("does not display job count", () => {
      const wrapper = mount(SubNav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        setup() {
          const onJobResultPage = false;
          return {
            onJobResultPage,
          };
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
