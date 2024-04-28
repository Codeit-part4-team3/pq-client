// useChatData.js

import { useMutation, useQuery } from 'react-query';
import axiosInstance from '../instance/axiosInstance';

export const useQueryGet = (queryKey: string, url: string, options: object = {}) => {
  const { data, error, isError, isSuccess, isLoading, isFetching } = useQuery(
    queryKey,
    async () => {
      const res = await axiosInstance.get(url);
      return res.data;
    },
    options,
  );

  return { data, error, isError, isSuccess, isLoading, isFetching };
};

export const useMutationPost = (url: string, options: object = {}) => {
  const mutation = useMutation(async (body: object) => {
    const res = await axiosInstance.post(url, body);
    return res.data;
  }, options);
  return mutation;
};

export const useMutationPatch = (url: string, options: object = {}) => {
  const mutation = useMutation(async (body: object) => {
    const res = await axiosInstance.patch(url, body);
    return res.data;
  }, options);

  return mutation;
};

export const useMutationDelete = (url: string, options: object = {}) => {
  const mutation = useMutation(async () => {
    const res = await axiosInstance.delete(url);
    return res.data;
  }, options);

  return mutation;
};
