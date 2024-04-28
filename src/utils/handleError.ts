/* eslint-diabled no-console */
import axios from 'axios';

export default function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || `Error status: ${error.response?.status}`;
    console.log(`Axios Error: ${errorMessage}`);
    throw error;
  }
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
    throw Error;
  }
  console.error(`Unknown Error: ${error}`);
  throw error;
}
