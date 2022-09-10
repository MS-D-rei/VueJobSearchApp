import axios from 'axios';
import { Degree } from '@/api/types';

const getDegrees = async () => {
  try {
    if (process.env.VITE_API_URL) {
      const apiUrl: string = process.env.VITE_API_URL;
      const response = await axios.get<Degree[]>(`${apiUrl}/degrees`);
      return response.data;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log('Unexpected Error', err);
    }
  }
};

export default getDegrees;
