/**
 * @jest-environment jsdom
 */

import { setActivePinia, createPinia } from 'pinia';
import { useLoginStore, useJobsStore } from '@/store/store';
import getJobs from '@/api/getJobs';
// import { Job } from "@/api/types"
import { jest } from '@jest/globals';
import { createJob } from './utils';

jest.mock('@/api/getJobs');
const mockGetJobs = getJobs as jest.Mock;

describe('User login state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('keeps track of whether user is logged in', () => {
    const initialLoginStore = useLoginStore();
    expect(initialLoginStore.isLoggedIn).toBe(false);
  });

  it('loginUser changes user login state', () => {
    const initialLoginStore = useLoginStore();
    initialLoginStore.loginUser();
    expect(initialLoginStore.isLoggedIn).toBe(true);
  });
});

describe('Jobs Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Jobs Store State', () => {
    it('store opening jobs state', () => {
      const jobsStore = useJobsStore();
      // const sampleJobData = [{ id: 1, title: 'Vue Developer' }];
      const sampleJobData = createJob();
      jobsStore.openingJobs = [sampleJobData];
      expect(jobsStore.openingJobs).toEqual([sampleJobData]);
    });

    it('stores organizations that user would like to filter job by', () => {
      const jobsStore = useJobsStore();
      expect(jobsStore.selectedOrganizations).toEqual([]);
    });

    it('stores job types that user would like to choose', () => {
      const jobsStore = useJobsStore();
      expect(jobsStore.selectedJobTypes).toEqual([]);
    });
  });

  describe('Jobs Store Getters', () => {
    it('compute uniqueOrganizations from list of jobs', () => {
      const jobsStore = useJobsStore();
      const sampleJobData = [
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' }),
      ];
      jobsStore.openingJobs = sampleJobData;
      // console.log(initialJobsStore.openingJobs);
      // console.log(initialJobsStore.uniqueOrganizations);
      expect(jobsStore.uniqueOrganizations).toEqual(
        new Set(['Google', 'Amazon'])
      );
    });

    it('compute uniqueJobTypes with checked job types', () => {
      const jobsStore = useJobsStore();
      const sampleJobData = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Part-time' }),
        createJob({ jobType: 'Part-time' }),
      ];
      jobsStore.openingJobs = sampleJobData;
      expect(jobsStore.uniqueJobTypes).toEqual(
        new Set(['Full-time', 'Part-time'])
      );
    });

    describe('compute filteredJobs', () => {
      const jobGoogleFullTime = createJob({
        organization: 'Google',
        jobType: 'Full-time',
      });
      const jobAmazonPartTime = createJob({
        organization: 'Amazon',
        jobType: 'Part-time',
      });
      const jobMicrosoftIntern = createJob({
        organization: 'Microsoft',
        jobType: 'Intern',
      });
      const sampleJobData = [
        jobGoogleFullTime,
        jobAmazonPartTime,
        jobMicrosoftIntern,
      ];

      describe('computes jobsIncludeOrganization', () => {
        it('when no selected organization, includes all jobs', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedOrganizations = [];
          expect(jobsStore.jobIncludesOrganization(jobGoogleFullTime)).toBe(
            true
          );
          expect(jobsStore.jobIncludesOrganization(jobAmazonPartTime)).toBe(
            true
          );
          expect(jobsStore.jobIncludesOrganization(jobMicrosoftIntern)).toBe(
            true
          );
        });
        it('when at least one organization selected, filter openingJobs with it', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedOrganizations = ['Google', 'Amazon'];
          expect(jobsStore.jobIncludesOrganization(jobGoogleFullTime)).toEqual(
            true
          );
          expect(jobsStore.jobIncludesOrganization(jobAmazonPartTime)).toEqual(
            true
          );
          expect(jobsStore.jobIncludesOrganization(jobMicrosoftIntern)).toEqual(
            false
          );
        });
      });

      describe('compute jobsIncludeJobType', () => {
        it('when no selected jobType, includes all jobs', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedJobTypes = [];
          expect(jobsStore.jobIncludesJobType(jobGoogleFullTime)).toEqual(true);
          expect(jobsStore.jobIncludesJobType(jobAmazonPartTime)).toEqual(true);
          expect(jobsStore.jobIncludesJobType(jobMicrosoftIntern)).toEqual(
            true
          );
        });
        it('when at least one jobType selected, filter openingJobs with it', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedJobTypes = ['Full-time', 'Part-time'];
          expect(jobsStore.jobIncludesJobType(jobGoogleFullTime)).toEqual(true);
          expect(jobsStore.jobIncludesJobType(jobAmazonPartTime)).toEqual(true);
          expect(jobsStore.jobIncludesJobType(jobMicrosoftIntern)).toEqual(
            false
          );
        });
      });

      it('when no selection, return all openingJobs', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = [];
        jobsStore.selectedJobTypes = [];
        expect(jobsStore.filteredJobs).toEqual(jobsStore.openingJobs);
      });

      it('when no selected job types, filteredJobs filtered with uniqueOrganizations', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = ['Google', 'Microsoft'];
        jobsStore.selectedJobTypes = [];
        expect(jobsStore.filteredJobs).toEqual([
          jobGoogleFullTime, jobMicrosoftIntern
        ]);
      });

      it('when no selected organizations, filteredJobs filtered with selectedJobTypes', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = [];
        jobsStore.selectedJobTypes = ['Full-time', 'Part-time'];
        expect(jobsStore.filteredJobs).toEqual([
          jobGoogleFullTime, jobAmazonPartTime
        ]);
      });
    });
  });

  describe('Jobs Store Actions', () => {
    it('fetch and store opening jobs data from API', async () => {
      const jobsStore = useJobsStore();
      const mockJobData = [createJob({ id: 1, title: 'React Developer' })];
      // mockGetJobs.mockResolvedValue(mockJobData);
      mockGetJobs.mockImplementation(() => mockJobData);
      await jobsStore.fetchJobs();
      expect(jobsStore.openingJobs).toEqual(mockJobData);
    });
  });
});
