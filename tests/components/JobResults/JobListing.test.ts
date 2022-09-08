/**
 * @jest-environment jsdom
 */

import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { Job } from "@/api/types";
import { createJob } from "../../store/utils"
import { DefineComponent } from "vue";

describe("JobListing", () => {
  const createConfig = (jobProps: Job) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      job: {
        ...jobProps,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJob({ title: "React Developer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("React Developer");
  });
  it("renders job organization", () => {
    const jobProps = createJob({ organization: "AirBnB" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("AirBnB");
  });
  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["Osaka", "Fukuoka"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Osaka");
    expect(wrapper.text()).toMatch("Fukuoka");
  });
  it("renders job qualifications", () => {
    const jobProps = createJob({
      minimumQualifications: ["Code", "Communication"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Communication");
  });

  it("links to individual job's page", () => {
    const jobProps = createJob({ id: 12 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    // const jobPageLink = wrapper.findComponent(RouterLinkStub);
    // When using findComponent, getComponent with CSS selector,
    // Have to use findComponent<T> to get VueWrapper, otherwise WrapperLike
    // https://test-utils.vuejs.org/guide/advanced/component-instance.html#usage-with-getcomponent-and-findcomponent
    const jobPageLink = wrapper.findComponent<DefineComponent>("[data-test='job-page-link']");
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/12");
  });
});
