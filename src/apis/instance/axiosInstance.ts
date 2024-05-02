import axios from 'axios';
import Cookies from 'js-cookie';
import { CHAT_URL } from 'src/constants/apiUrl';
import handleError from 'src/utils/handleError';

/**
 * axios instance 속성 추가
 */

const axiosInstance = axios.create({
  baseURL: CHAT_URL.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    handleError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
