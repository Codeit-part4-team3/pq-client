import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from 'src/apis/instance/axiosInstance';
import { USER_URL } from 'src/constants/apiUrl';
import { ERROR_MESSAGES } from 'src/constants/error';
import useUserStore from 'src/store/userStore';

export default async function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorMessage = `{ status: ${error.response?.status}, message: ${error.response?.data?.message} }`;
    console.error(`Axios Error: ${errorMessage}`);
    dispatchAxiosErrorEvent(errorMessage);

    // 토큰 만료
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        useUserStore.getState().setAccessToken(newAccessToken);

        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        if (error.config) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
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

export const dispatchAxiosErrorEvent = (errorMessage: string) => {
  const customEvent = new CustomEvent('axiosError', { detail: errorMessage });
  window.dispatchEvent(customEvent);
};

// refreshToken 사용해 accessToken 갱신
export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    alert(ERROR_MESSAGES.AUTH.SESSION_EXPIRED);
    location.replace('/login');
    throw new Error('Refresh Token is not found');
  }

  try {
    const response = await axiosInstance.get(`${USER_URL.AUTH}/token`);

    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    throw error;
  }
};
