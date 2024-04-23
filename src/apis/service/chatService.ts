// useChatData.js

import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../instance/axiosInstance';

const getChatData = async () => {
  const response = await axiosInstance.get('/chat');
  return response.data;
};

interface ChatDataBody {
  message: string;
}

interface ChatDataResponse {
  // Define the shape of the response data here
}

const postChatData = async (data: ChatDataBody): Promise<ChatDataResponse> => {
  const response = await axiosInstance.post<ChatDataResponse>('/chat', data);
  return response.data;
};

export const useQueryChatData = () => {
  return useQuery<ChatDataResponse, Error>({ queryKey: ['chatData'], queryFn: getChatData });
};

export const useMutationChatData = () => {
  return useMutation<ChatDataResponse, Error, ChatDataBody>({ mutationFn: postChatData });
};
