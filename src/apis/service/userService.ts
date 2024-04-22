// useUserData.js

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../instance/axiosInstance';

const getUserData = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

const useUserData = () => {
  return useQuery({ queryKey: ['data'], queryFn: getUserData });
};

export default useUserData;
