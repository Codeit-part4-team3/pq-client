import axios from 'axios';
import useUserStore from 'src/store/userStore';
import handleHttpError from 'src/utils/handleHttpError';

const getAccessToken = () => {
  const store = useUserStore.getState();
  return store.accessToken;
};

/**
 * axios instance 속성 추가
 */

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_ORIGIN_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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
    handleHttpError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
