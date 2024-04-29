/* eslint-disable no-console */
import axios from 'axios';

export default function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorMessage = `{ status: ${error.response?.status}, message: ${error.response?.data?.message} }`;
    console.error(`Axios Error: ${errorMessage}`);

    // 임시
    const customEvent = new CustomEvent('axiosError', {
      detail: errorMessage,
    });
    window.dispatchEvent(customEvent);

    if (error.response?.status === 401) {
      // TODO: 토큰 갱신 로직
    }

    throw error;
  }

  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }

  console.error(`Unknown Error: ${error}`);
  throw error;
}
