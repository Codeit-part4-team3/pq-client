import axios from 'axios';
import { CHAT_URL } from 'src/constants/apiUrl';
import useTokenStore from 'src/store/userStore';
import handleHttpError from 'src/utils/handleHttpError';

const getAccessToken = () => {
  const store = useTokenStore.getState();
  return store.accessToken;
};

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
