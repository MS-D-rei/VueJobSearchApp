/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import { useRouter } from "vue-router";

// vue-utils vue-router with Composition API
// https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to job results page with user's input params", async () => {
      const push = jest.fn();
      mockUseRouter.mockImplementationOnce(() => ({
        push,
      }));

      const wrapper = mount(JobSearchForm, {
        // Vue Test Utils doesn't add mounted DOM nodes to the document by default.
        // use attachTo, otherwise this test tries to push 'empty' instead of button.
        attachTo: document.body,
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("Tokyo");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      // console.log(submitButton);
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobSearchResults",
        query: { role: "Vue Developer", location: "Tokyo" },
      });
    });
  });
});
