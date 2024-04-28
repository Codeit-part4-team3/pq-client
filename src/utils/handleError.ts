/* eslint-diabled no-console */
import axios from 'axios';

export default function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const customEvent = new CustomEvent('axiosError', {
      detail: error.response?.data?.message || `Error status: ${error.status}`,
    });
    window.dispatchEvent(customEvent);
    throw error;
  }
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
  console.error(`Unknown Error: ${error}`);
  throw error;
}
