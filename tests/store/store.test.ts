/**
 * @jest-environment jsdom
 */

import { setActivePinia, createPinia } from "pinia";
import { useLoginStore, useJobsStore } from "@/store/store";
import getJobs from "@/api/getJobs";
import { Job } from "@/api/types"
import { jest } from "@jest/globals"

jest.mock("@/api/getJobs");

const mockGetJobs = getJobs as jest.Mock;

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
      const jobsStore = useJobsStore();
      const sampleJobData = [{ id: 1, title: "Vue Developer" }];
      jobsStore.openingJobs = sampleJobData as unknown as Job[];
      expect(jobsStore.openingJobs).toEqual(sampleJobData);
    });

    it("stores organizations that user would like to filter job by", () => {
      const jobsStore = useJobsStore();
      expect(jobsStore.selectedOrganizations).toEqual([]);
    });

    it("stores job types that user would like to choose", () => {
      const jobsStore = useJobsStore();
      expect(jobsStore.selectedJobTypes).toEqual([]);
    });
  });

  describe("Jobs Store Getters", () => {
    it("compute uniqueOrganizations from list of jobs", () => {
      const jobsStore = useJobsStore();
      const sampleJobData = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
      // console.log(initialJobsStore.openingJobs);
      // console.log(initialJobsStore.uniqueOrganizations);
      expect(jobsStore.uniqueOrganizations).toEqual(
        new Set(["Google", "Amazon"])
      );
    });

    it("compute uniqueJobTypes with checked job types", () => {
      const jobsStore = useJobsStore();
      const sampleJobData = {
        jobs: [
          { jobType: "Full-time" },
          { jobType: "Part-time" },
          { jobType: "Part-time" },
        ],
      };
      jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
      expect(jobsStore.uniqueJobTypes).toEqual(
        new Set(["Full-time", "Part-time"])
      );
    });

    describe("compute filteredJobs", () => {
      const sampleJobData = {
        jobs: [
          { organization: "Google", jobType: "Full-time" },
          { organization: "Amazon", jobType: "Part-time" },
          { organization: "Microsoft", jobType: "Intern" },
        ],
      };

      describe("computes jobsIncludeOrganization", () => {
        it("when no selected organization, includes all jobs", () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
          jobsStore.selectedOrganizations = [];
          const oneOfOpeningJobs = { organization: "Google" } as unknown as Job;
          expect(jobsStore.jobIncludesOrganization(oneOfOpeningJobs)).toBe(true);
        });
        it("when at least one organization selected, filter openingJobs with it", () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
          jobsStore.selectedOrganizations = ["Google", "Amazon"];
          const oneOfOpeningJobs = { organization: "Google" } as unknown as Job;
          expect(jobsStore.jobIncludesOrganization(oneOfOpeningJobs)).toEqual(true);
        });
      });

      describe("compute jobsIncludeJobType", () => {
        it("when no selected jobType, includes all jobs", () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
          jobsStore.selectedJobTypes = [];
          const oneOfJobs = { jobType: "Full-time" } as unknown as Job;
          expect(jobsStore.jobIncludesJobType(oneOfJobs)).toBe(true);
        });
        it("when at least one jobType selected, filter openingJobs with it", () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
          jobsStore.selectedJobTypes = ["Full-time", "Part-time"];
          const oneOfOpeningJobs = { jobType: "Full-time" } as unknown as Job;
          expect(jobsStore.jobIncludesJobType(oneOfOpeningJobs)).toEqual(true);
        });
      });

      it("when no selection, return all openingJobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
        jobsStore.selectedOrganizations = [];
        jobsStore.selectedJobTypes = [];
        expect(jobsStore.filteredJobs).toEqual(jobsStore.openingJobs);
      });

      it("when no selected job types, filteredJobs filtered with uniqueOrganizations", () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
        jobsStore.selectedOrganizations = ["Google", "Microsoft"];
        jobsStore.selectedJobTypes = [];
        expect(jobsStore.filteredJobs).toEqual([
          { organization: "Google", jobType: "Full-time" },
          { organization: "Microsoft", jobType: "Intern" },
        ]);
      });

      it("when no selected organizations, filteredJobs filtered with selectedJobTypes", () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData.jobs as unknown as Job[];
        jobsStore.selectedOrganizations = [];
        jobsStore.selectedJobTypes = ["Full-time", "Part-time"];
        expect(jobsStore.filteredJobs).toEqual([
          { organization: "Google", jobType: "Full-time" },
          { organization: "Amazon", jobType: "Part-time" },
        ]);
      });
    });
  });

  describe("Jobs Store Actions", () => {
    it("fetch and store opening jobs data from API", async () => {
      const jobsStore = useJobsStore();
      const mockJobData = [
        {
          id: 1,
          title: "React Developer",
        },
      ] as unknown as Job;
      mockGetJobs.mockResolvedValue(mockJobData);
      await jobsStore.fetchJobs();
      expect(jobsStore.openingJobs).toEqual(mockJobData);
    });
  });
});
