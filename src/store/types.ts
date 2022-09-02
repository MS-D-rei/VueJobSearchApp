import { Job } from "@/api/types";

export interface JobState {
  openingJobs: Job[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
}