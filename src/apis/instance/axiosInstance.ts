import axios from 'axios';
import { URL } from 'src/constants/apiUrl';
import useUserStore from 'src/store/userStore';
import handleError from 'src/utils/handleError';

const getAccessToken = () => {
  const store = useUserStore.getState();
  return store.accessToken;
};

/**
 * axios instance 속성 추가
 */

const axiosInstance = axios.create({
  baseURL: URL.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
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
