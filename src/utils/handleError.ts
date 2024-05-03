/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { USER_URL } from 'src/constants/apiUrl';
import { ERROR_MESSAGES } from 'src/constants/error';

export default async function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorMessage = `{ status: ${error.response?.status}, message: ${error.response?.data?.message} }`;
    console.error(`Axios Error: ${errorMessage}`);
    dispatchAxiosErrorEvent(errorMessage);

    // 토큰 만료
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        Cookies.set('accessToken', newAccessToken, { expires: 1, secure: true, sameSite: 'strict' });
        await refetch(error, newAccessToken);
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
    const response = await axios.post(
      `${USER_URL.AUTH}/token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    throw error;
  }
};

// 새로운 accessToken으로 요청 재시도
const refetch = (error: AxiosError, accessToken: string) => {
  if (!error.config) {
    console.error('Error configuration is undefined, cannot retry the request');
    throw error;
  }

  const newConfig = {
    ...error.config,
    headers: {
      ...error.config.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios(newConfig);
};
