/* eslint-disable no-console */
import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from 'src/apis/instance/axiosInstance';
import { USER_URL } from 'src/constants/apiUrl';
import { ERROR_MESSAGES } from 'src/constants/error';
import useTokenStore from 'src/store/userStore';

export default async function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorMessage = `{ status: ${error.response?.status}, message: ${error.response?.data?.message} }`;
    console.error(`Axios Error: ${errorMessage}`);
    dispatchAxiosErrorEvent(errorMessage);

    // 토큰 만료
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        useTokenStore.getState().setAccessToken(newAccessToken);
        return;
      } catch (refreshError) {
        console.error('Refresh Token is not found');
        throw refreshError;
      }
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

const dispatchAxiosErrorEvent = (errorMessage: string) => {
  const customEvent = new CustomEvent('axiosError', { detail: errorMessage });
  window.dispatchEvent(customEvent);
};

// refreshToken 사용해 accessToken 갱신
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    alert(ERROR_MESSAGES.AUTH.SESSION_EXPIRED);
    location.replace('/login');
    throw new Error('Refresh Token is not found');
  }

  try {
    const response = await axiosInstance.get(`${USER_URL.AUTH}/token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    throw error;
  }
};
