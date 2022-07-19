import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";

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
  state: () => ({
    openingJobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  getters: {
    uniqueOrganizations: (state) => {
      const uniqueOrganizations = new Set();
      state.openingJobs.forEach((job) => {
        // console.log(job.organization);
        uniqueOrganizations.add(job.organization);
      });
      return uniqueOrganizations;
    },
    uniqueJobTypes: (state) => {
      const uniqueJobTypes = new Set();
      state.openingJobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType);
      });
      return uniqueJobTypes;
    },
    jobIncludesOrganization: (state) => (job) => {
      if (state.selectedOrganizations.length === 0) return true;
      return state.selectedOrganizations.includes(job.organization); // return function
    },
    jobIncludesJobType: (state) => (job) => {
      if (state.selectedJobTypes.length === 0) return true;
      return state.selectedJobTypes.includes(job.jobType);
    },
    filteredJobs: function (state) {
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
      this.openingJobs = jobData;
    },
  },
});
