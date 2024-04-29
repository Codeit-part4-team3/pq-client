import axios from 'axios';
import Cookies from 'js-cookie';
import { URL } from 'src/constants/apiUrl';
import handleError from 'src/utils/handleError';

const axiosInstance = axios.create({
  baseURL: URL.BASE,
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
    handleError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
