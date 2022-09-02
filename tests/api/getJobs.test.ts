/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import getJobs from '@/api/getJobs';
import { Job } from '@/api/types'

/**
 * Wrap an object or a module with mock definitions
 *
 *
 *  jest.mock("../api");
 *  import * as api from "../api";
 *
 *  const mockApi = api as jest.Mocked<typeof api>;
 *  api.MyApi.prototype.myApiMethod.mockImplementation(() => "test");
 */

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('getJobs', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({
      data: mockJobData,
    });
  });

  const mockJobData = [
    {
      id: 1,
      title: 'Vue Developer',
    },
  ] as unknown as Job[];

  it('fetches jobs that candidates can apply to', async () => {
    await getJobs();
    expect(mockAxios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
  });

  it('extracts jobs from response', async () => {
    const data = await getJobs();
    expect(data).toEqual([
      {
        id: 1,
        title: 'Vue Developer',
      },
    ]);
  });
});
