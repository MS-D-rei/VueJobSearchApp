const mockGetJobs = jest.fn();
jest.mock('@/api/getJobs.ts', () => mockGetJobs);

export default mockGetJobs
