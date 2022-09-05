import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { JobState } from "@/store/types";
import { Job } from "@/api/types";

export const useLoginStore = defineStore("login", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
});

export const useJobsStore = defineStore("jobs", {
  state: (): JobState => ({
    openingJobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  getters: {
    uniqueOrganizations: (state: JobState):Set<string> => {
      const uniqueOrganizations = new Set<string>();
      state.openingJobs.forEach((job) => {
        // console.log(job.organization);
        uniqueOrganizations.add(job.organization);
      });
      return uniqueOrganizations;
    },
    uniqueJobTypes: (state: JobState): Set<string> => {
      const uniqueJobTypes: Set<string> = new Set();
      state.openingJobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType);
      });
      return uniqueJobTypes;
    },
    jobIncludesOrganization: (state: JobState) => (job: Job) => {
      if (state.selectedOrganizations.length === 0) return true;
      return state.selectedOrganizations.includes(job.organization);
    },
    jobIncludesJobType: (state: JobState) => (job: Job) => {
      if (state.selectedJobTypes.length === 0) return true;
      return state.selectedJobTypes.includes(job.jobType);
    },
    filteredJobs: function (state: JobState): Job[] {
      // if (
      //   state.selectedOrganizations.length === 0 &&
      //   state.selectedJobTypes.length === 0
      // ) {
      //   return state.openingJobs;
      // } else if (state.selectedJobTypes.length === 0) {
      //   return state.openingJobs.filter((job) =>
      //     state.selectedOrganizations.includes(job.organization)
      //   );
      // } else if (state.selectedOrganizations.length === 0) {
      //   return state.openingJobs.filter((job) =>
      //     state.selectedJobTypes.includes(job.jobType)
      //   );
      // } else {
      //   return state.openingJobs
      //     .filter((job) => {
      //       return state.selectedOrganizations.includes(job.organization);
      //     })
      //     .filter((job) => {
      //       return state.selectedJobTypes.includes(job.jobType);
      //     });
      // }
      return state.openingJobs
        .filter((job) => this.jobIncludesOrganization(job)) // use arrow function to use this
        .filter((job) => this.jobIncludesJobType(job));
    },
  },
  actions: {
    async fetchJobs() {
      const jobData = await getJobs();
      if (jobData) {
        this.openingJobs = jobData;
      }
    },
  },
});
