import axios from "axios";

const getJobs = async () => {
  try { 
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await axios.get(`${apiUrl}/jobs`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export default getJobs;