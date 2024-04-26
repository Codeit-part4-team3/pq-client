import axios from 'axios';

const BASE_URL = 'https://api.pqsoft.net';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export default axiosInstance;
