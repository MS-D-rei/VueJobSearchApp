import axios from "axios";
// import { AxiosResponse } from "axios";
// import { Job } from "@/api/types";

// Env Variables and Modes
// https://vitejs.dev/guide/env-and-mode.html

const getJobs = async () => {
  try {
    if (process.env.VITE_API_URL) {
      const apiUrl: string = process.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/jobs`);
      return response.data;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log('Unexpected Error', err);
    }
  }
}

export default getJobs;