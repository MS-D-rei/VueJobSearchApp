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

  describe("Jobs Store State", () => {
    it("store opening jobs state", () => {
      const initialJobsStore = useJobsStore();
      const sampleJobData = [{ id: "1", title: "Vue Developer" }];
      initialJobsStore.openingJobs = sampleJobData;
      expect(initialJobsStore.openingJobs).toEqual(sampleJobData);
    });

    it("stores organizations that use would like to filter job by", () => {
      const initialJobsStore = useJobsStore();
      expect(initialJobsStore.selectedOrganizations).toEqual([]);
    });
  });

  describe("Jobs Store Getters", () => {
    it("compute uniqueOrganizations from list of jobs", () => {
      const initialJobsStore = useJobsStore();
      const sampleJobData = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      initialJobsStore.openingJobs = sampleJobData.jobs;
      // console.log(initialJobsStore.openingJobs);
      // console.log(initialJobsStore.uniqueOrganizations);
      expect(initialJobsStore.uniqueOrganizations).toEqual(
        new Set(["Google", "Amazon"])
      );
    });
    describe("filteredJobs with selectedOrganizations", () => {
      it("selectedOrganizations.length >= 1, return selectedOrganizations", () => {
        const initialJobsStore = useJobsStore();
        const sampleJobData = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Microsoft" },
          ],
        };
        initialJobsStore.openingJobs = sampleJobData.jobs;
        const sampleSelectedOrganizations = ["Google", "Microsoft"];
        initialJobsStore.selectedOrganizations = sampleSelectedOrganizations;
        expect(initialJobsStore.filteredJobs).toEqual([
          { organization: "Google" },
          { organization: "Microsoft" },
        ]);
      });
      it("no selectedOrganizations, return all openingJobs", () => {
        const initialJobsStore = useJobsStore();
        const sampleJobData = {
          jobs: [
            { organization: "Google" },
            { organization: "Amazon" },
            { organization: "Microsoft" },
          ],
        };
        initialJobsStore.openingJobs = sampleJobData.jobs;
        initialJobsStore.selectedOrganizations = [];
        expect(initialJobsStore.filteredJobs).toEqual(
          initialJobsStore.openingJobs
        );
      });
    });
  });

  describe("Jobs Store Actions", () => {
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
});
