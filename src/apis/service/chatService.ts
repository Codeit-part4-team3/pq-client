// useChatData.js

import { useMutation, useQuery } from 'react-query';
import axiosInstance from '../instance/axiosInstance';
import { URL } from 'src/constants/apiUrl';

interface ChatDataBody {
  message: string;
}

interface ChatDataResponse {
  // Define the shape of the response data here
}

interface CreateServerBody {
  name: string;
  imageUrl: string;
}

const getChatData = async () => {
  const response = await axiosInstance.get('/chat');
  return response.data;
};

const postChatData = async (data: ChatDataBody): Promise<ChatDataResponse> => {
  const response = await axiosInstance.post<ChatDataResponse>('/chat', data);
  return response.data;
};

const getAllServers = async () => {
  const response = await axiosInstance.get(`${URL.SERVER}/all`);
  return response.data;
};

const createServer = async (data: CreateServerBody) => {
  const response = await axiosInstance.post(`${URL.SERVER}`, data);
  return response.data;
};

const updateServer = async (data: CreateServerBody) => {
  const response = await axiosInstance.put(`${URL.SERVER}`, data);
  return response.data;
};

export const useQueryChatData = () => {
  return useQuery({ queryFn: getChatData });
};

export const useMutationChatData = () => {
  return useMutation({ mutationFn: postChatData });
};

export const useQueryAllServers = () => {
  return useQuery({ queryFn: getAllServers });
};

export const useMutationCreateServer = () => {
  return useMutation({ mutationFn: createServer });
};

export const useMutationUpdateServer = () => {
  return useMutation({ mutationFn: updateServer });
};
