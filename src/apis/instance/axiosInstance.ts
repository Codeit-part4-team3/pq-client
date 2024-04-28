import axios from 'axios';
import Cookies from 'js-cookie';
import handleError from 'src/utils/handleError';

const BASE_URL = 'https://api.pqsoft.net';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
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
    if (error.response?.status === 401) {
      // TODO: 토큰 갱신 로직
    }
    handleError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
