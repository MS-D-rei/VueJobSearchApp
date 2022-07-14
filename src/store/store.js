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
  }),
  actions: {
    async fetchJobs() {
      const jobData = await getJobs();
      this.openingJobs = jobData;
    },
  },
});
