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
    console.error(`에러 발생: ${error.message}`);
    throw Error;
  }
  console.error(`알 수 없는 에러: ${error}`);
  throw error;
}
