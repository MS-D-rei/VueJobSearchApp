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
    filteredJobs: (state) => {
      if (state.selectedOrganizations.length === 0) {
        return state.openingJobs;
      } else {
        return state.openingJobs.filter((job) =>
          state.selectedOrganizations.includes(job.organization)
        );
      }
    },
  },
  actions: {
    async fetchJobs() {
      const jobData = await getJobs();
      this.openingJobs = jobData;
    },
  },
});
