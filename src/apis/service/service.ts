// useChatData.js

import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../instance/axiosInstance';
import { AxiosResponse } from 'axios';

export const useQueryGet = <Res>(queryKey: string, url: string, options: object = {}) => {
  const query = useQuery<Res>({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axiosInstance.get(url);
      return res.data;
    },
    ...options,
  });

  return query;
};

export const useMutationPost = <Res, Req>(url: string, options: object = {}, axiosOptions: object = {}) => {
  const mutationFn: MutationFunction<Res, Req> = async (body) => {
    const res: AxiosResponse<Res> = await axiosInstance.post(url, body, axiosOptions);
    return res.data;
  };

  const mutation = useMutation<Res, unknown, Req>({ mutationFn, ...options });
  return mutation;
};

export const useMutationPatch = <Res, Req>(url: string, options: object = {}, axiosOptions: object = {}) => {
  const mutationFn: MutationFunction<Res, Req> = async (body) => {
    const res: AxiosResponse<Res> = await axiosInstance.patch(url, body, axiosOptions);
    return res.data;
  };

  const mutation = useMutation<Res, unknown, Req>({ mutationFn, ...options });
  return mutation;
};

export const useMutationDelete = (url: string, options: object = {}) => {
  const mutationFn = async () => {
    const res = await axiosInstance.delete(url);
    return res.data;
  };

  const mutation = useMutation({ mutationFn, ...options });
  return mutation;
};

export const useMutationPut = <Res, Req>(url: string, options: object = {}, axiosOptions: object = {}) => {
  const mutationFn: MutationFunction<Res, Req> = async (body) => {
    const res: AxiosResponse<Res> = await axiosInstance.put(url, body, axiosOptions);
    return res.data;
  };

  const mutation = useMutation<Res, unknown, Req>({ mutationFn, ...options });
  return mutation;
};
