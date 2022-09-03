import { Job } from '@/api/types';

export const createJob = (config: Partial<Job> = {}): Job => ({
  id: 1,
  title: 'Vue Developer',
  organization: 'Anonymous Company',
  degree: 'Master',
  jobType: 'Intern',
  locations: ['Tokyo'],
  minimumQualifications: [],
  preferredQualifications: [],
  description: [],
  dateAdded: '2022-09-01',
  ...config,
});
