/**
 * @jest-environment jsdom
 */

import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    ...jobProps,
  });

  const createConfig = (jobProps) => ({
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
    const jobProps = createJobProps({ title: "React Developer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("React Developer");
  });
  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "AirBnB" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("AirBnB");
  });
  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Osaka", "Fukuoka"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Osaka");
    expect(wrapper.text()).toMatch("Fukuoka");
  });
  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Code", "Communication"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Communication");
  });

  it("links to individual job's page", () => {
    const jobProps = createJobProps({ id: 12 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    // const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const jobPageLink = wrapper.findComponent("[data-test='job-page-link']");
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/12");
  });
});
