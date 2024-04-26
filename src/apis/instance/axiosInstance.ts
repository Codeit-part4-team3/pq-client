import axios from 'axios';

const BASE_URL = 'https://api.pqsoft.net';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
