import { Degree, Job } from "@/api/types";

export interface JobState {
  openingJobs: Job[];
  degrees: Degree[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}