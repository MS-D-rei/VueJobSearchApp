import { Degree, Job } from "@/api/types";

export interface JobState {
  openingJobs: Job[];
  degrees: Degree[];
  skillsSearchTerm: string;
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}