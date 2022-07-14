/**
 * @jest-environment jsdom
 */

import axios from "axios";
import getJobs from "@/api/getJobs";

jest.mock("axios");

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockReturnValue({
      data: mockJobData,
    });
  });

  const mockJobData = [
    {
      id: 1,
      title: "Vue Developer",
    }
  ]

  it("fetches jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("extracts jobs from response", async () => {
    const data = await getJobs();
    expect(data).toEqual([
      {
        id: 1,
        title: "Vue Developer",
      },
    ]);
  });
});
