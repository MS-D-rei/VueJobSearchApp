/**
 * @jest-environment jsdom
 */

import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";

import JobSpotlight from "@/components/JobSearch/JobSpotlight.vue" 

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("JobSpotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    mockAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
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
    // FIX: JobSpotlight occurs no overload error on mount function.
    const wrapper = mount(JobSpotlight as any, {
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
    // FIX: JobSpotlight occurs no overload error on mount function.
    const wrapper = mount(JobSpotlight as any, {
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
    // FIX: JobSpotlight occurs no overload error on mount function.
    const wrapper = mount(JobSpotlight as any, {
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
