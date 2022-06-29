/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils";
import TextInput from "@/components/Shared/TextInput";

describe("TextInput", () => {
  it("communicates that user has entered character", () => {
    const wrapper = mount(TextInput, {
      props: {
        inputValue: "",
      },
    });
    const input = wrapper.find("input");
    console.log(wrapper.emitted());
    input.setValue("N");
    // console.log(wrapper.emitted());
    input.setValue("Y");
    // console.log(wrapper.emitted());
    input.setValue("C");
    // console.log(wrapper.emitted());
    const message = wrapper.emitted()['update:inputValue'];
    expect(message).toEqual([['N'], ['Y'], ['C']]);
  });
});
