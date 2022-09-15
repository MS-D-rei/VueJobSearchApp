/**
 * @jest-environment jsdom
 */

import { setActivePinia, createPinia } from 'pinia';
import { useLoginStore, useJobsStore } from '@/store/store';
import { jest } from '@jest/globals';
import { createJob, createDegree } from './utils';
import { Degree } from '@/api/types';

import getJobs from '@/api/getJobs';
jest.mock('@/api/getJobs');
const mockGetJobs = getJobs as jest.Mock;

import getDegrees from '@/api/getDegrees';
jest.mock('@/api/getDegrees');
const mockGetDegrees = getDegrees as jest.Mock;

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

    it('stores degrees that use would like to filter job by', () => {
      const jobsStore = useJobsStore();
      expect(jobsStore.selectedDegrees).toEqual([]);
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

    it('compute uniqueJobTypes from list of jobs', () => {
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

    it('compute uniqueDegrees from backend data', () => {
      const jobsStore = useJobsStore();
      const sampleDegreesData = [
        createDegree({ id: 1, degree: "Bachelor's" }),
        createDegree({ id: 2, degree: "Master's" }),
        createDegree({ id: 3, degree: "Master's" }),
      ];
      jobsStore.degrees = sampleDegreesData;
      expect(jobsStore.uniqueDegrees).toEqual(
        new Set(["Bachelor's", "Master's"])
      );
    });

    describe('compute filteredJobs', () => {
      const jobGoogleFullTime = createJob({
        organization: 'Google',
        jobType: 'Full-time',
        degree: "Master's",
      });
      const jobAmazonPartTime = createJob({
        organization: 'Amazon',
        jobType: 'Part-time',
        degree: "Bachelor's",
      });
      const jobMicrosoftIntern = createJob({
        organization: 'Microsoft',
        jobType: 'Intern',
        degree: "Bachelor's",
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
          expect(jobsStore.jobIncludesJobType(jobGoogleFullTime)).toBe(true);
          expect(jobsStore.jobIncludesJobType(jobAmazonPartTime)).toBe(true);
          expect(jobsStore.jobIncludesJobType(jobMicrosoftIntern)).toBe(true);
        });
        it('when at least one jobType selected, filter openingJobs with it', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedJobTypes = ['Full-time', 'Part-time'];
          expect(jobsStore.jobIncludesJobType(jobGoogleFullTime)).toBe(true);
          expect(jobsStore.jobIncludesJobType(jobAmazonPartTime)).toBe(true);
          expect(jobsStore.jobIncludesJobType(jobMicrosoftIntern)).toBe(false);
        });
      });

      describe('compute jobsIncludeDegrees', () => {
        it('when no selected degrees, includes all jobs', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedDegrees = [];
          expect(jobsStore.jobIncludesDegree(jobGoogleFullTime)).toBe(true);
          expect(jobsStore.jobIncludesDegree(jobAmazonPartTime)).toBe(true);
          expect(jobsStore.jobIncludesDegree(jobMicrosoftIntern)).toBe(true);
        });
        it('when at least one degree selected, filter openingJobs with it', () => {
          const jobsStore = useJobsStore();
          jobsStore.openingJobs = sampleJobData;
          jobsStore.selectedDegrees = ["Bachelor's"];
          expect(jobsStore.jobIncludesDegree(jobGoogleFullTime)).toBe(false);
          expect(jobsStore.jobIncludesDegree(jobAmazonPartTime)).toBe(true);
          expect(jobsStore.jobIncludesDegree(jobMicrosoftIntern)).toBe(true);
        });
      });

      it('when no selection, return all openingJobs', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = [];
        jobsStore.selectedJobTypes = [];
        jobsStore.selectedDegrees = [];
        expect(jobsStore.filteredJobs).toEqual(jobsStore.openingJobs);
      });

      it('when no selected job types, filteredJobs is filtered with other selected factors', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = ['Google', 'Microsoft'];
        jobsStore.selectedJobTypes = [];
        jobsStore.selectedDegrees = ["Master's"];
        expect(jobsStore.filteredJobs).toEqual([jobGoogleFullTime]);
      });

      it('when no selected organizations, filteredJobs is filtered with other selected factors', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = [];
        jobsStore.selectedJobTypes = ['Full-time', 'Part-time'];
        jobsStore.selectedDegrees = ["Master's"];
        expect(jobsStore.filteredJobs).toEqual([jobGoogleFullTime]);
      });

      it('when no selected degrees, filteredJobs is filtered with other selected factors', () => {
        const jobsStore = useJobsStore();
        jobsStore.openingJobs = sampleJobData;
        jobsStore.selectedOrganizations = ['Google', 'Microsoft'];
        jobsStore.selectedJobTypes = ['Full-time', 'Part-time'];
        jobsStore.selectedDegrees = [];
        expect(jobsStore.filteredJobs).toEqual([jobGoogleFullTime]);
      })
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

    it('fetch and return degrees data from API', async () => {
      const jobsStore = useJobsStore();
      const mockDegreesData: Degree[] = [
        {
          id: 1,
          degree: "Bachelor's",
        },
        {
          id: 2,
          degree: "Master's",
        },
      ];
      mockGetDegrees.mockImplementationOnce(() => mockDegreesData);
      await jobsStore.fetchDegrees();
      expect(jobsStore.degrees).toEqual(mockDegreesData);
    });

    it('clear all factors filtering jobs', () => {
      const jobsStore = useJobsStore();
      jobsStore.selectedOrganizations = ["Google", "Amazon", "Microsoft"];
      jobsStore.selectedJobTypes = ["Full-time", "Part-time"];
      jobsStore.selectedDegrees = ["Bachelor's", "Master's"];
      jobsStore.clearFilters();
      expect(jobsStore.selectedOrganizations).toEqual([]);
      expect(jobsStore.selectedJobTypes).toEqual([]);
      expect(jobsStore.selectedDegrees).toEqual([]);
    })
  });
});
