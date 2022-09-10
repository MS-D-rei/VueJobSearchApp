/**
 * @jest-environment jsdom
 */

import axios from 'axios';
    /**
     * Wrap an object or a module with mock definitions
     * 
     *  jest.mock("../api");
     *  import * as api from "../api";
     *
     *  const mockApi = api as jest.Mocked<typeof api>;
     *  api.MyApi.prototype.myApiMethod.mockImplementation(() => "test");
     */
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
import getDegrees from '@/api/getDegrees';
import { Degree } from '@/api/types';

describe('getDegrees', () => {
  const mockDegreesData: Degree[] = [
    {
      id: 1,
      degree: 'Associate',
    },
    {
      id: 2,
      degree: "Bachelor's",
    },
    {
      id: 3,
      degree: "Master's",
    },
  ];
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({
      data: mockDegreesData,
    })
  })

  it('get proper URL when getDegrees is called', async () => {
    await getDegrees();
    expect(mockAxios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees');
  })
  
  it('fetches degrees data from db.json file', async () => {
    const data = await getDegrees();
    expect(data).toBe(mockDegreesData);
  })
});
