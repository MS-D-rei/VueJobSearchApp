/**
 * @jest-environment jsdom
 */

import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";

import JobSpotlight from "@/components/JobSearch/JobSpotlight.vue";

jest.mock("axios");

describe("JobSpotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "sampleSpotlight img",
          title: "sampleSpotlight title",
          description: "sampleSpotlight description",
          ...data,
        },
      ],
    });
  };

  it("provides img attribute to parent component", async () => {
    const data = { img: "Sample img" };
    mockSpotlightResponse(data);
    const wrapper = mount(JobSpotlight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Sample img");
  });

  it("provides title attribute to parent component", async () => {
    const data = { title: "sampleSpotlight title" }
    mockSpotlightResponse(data);
    const wrapper = mount(JobSpotlight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("sampleSpotlight title");
  });

  it("provides description attribute to parent component", async () => {
    const data = { description: "sampleSpotlight description" };
    mockSpotlightResponse(data);
    const wrapper = mount(JobSpotlight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("sampleSpotlight description");
  });
});
