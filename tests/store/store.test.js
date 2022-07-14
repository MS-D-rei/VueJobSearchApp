/**
 * @jest-environment jsdom
 */

import { setActivePinia, createPinia } from "pinia";
import { useLoginStore, useJobsStore } from "@/store/store";
import getJobs from "@/api/getJobs";

jest.mock("@/api/getJobs");

describe("User login state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of whether user is logged in", () => {
    const initialLoginStore = useLoginStore();
    expect(initialLoginStore.isLoggedIn).toBe(false);
  });

  it("loginUser changes user login state", () => {
    const initialLoginStore = useLoginStore();
    initialLoginStore.loginUser();
    expect(initialLoginStore.isLoggedIn).toBe(true);
  });
});

describe("Jobs Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("store opening jobs state", () => {
    const initialJobsStore = useJobsStore();
    expect(initialJobsStore.openingJobs).toEqual([]);
  });

  it("fetch and store opening jobs data from API", async () => {
    const initialJobsStore = useJobsStore();
    const mockJobData = [
      {
        id: 1,
        title: "React Developer",
      },
    ];
    getJobs.mockResolvedValue(mockJobData);
    await initialJobsStore.fetchJobs();
    expect(initialJobsStore.openingJobs).toEqual(mockJobData);
  });
});
