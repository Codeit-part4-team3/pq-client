// useUserData.js

import { useQuery } from 'react-query';
import axiosInstance from '../instance/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const userUrl = '/api/user/v1/user';
const authUrl = '/api/user/v1/auth';

const getUserData = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`${userUrl}/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 토큰으로 유저 확인
const getUserWithToken = async () => {
  try {
    const response = await axiosInstance.get(`${authUrl}/user`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 회원가입
const postUserSignup = async () => {
  try {
    const response = await axiosInstance.post(`${authUrl}/signup`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 이메일 인증
const postEmailVerify = async () => {
  try {
    const response = await axiosInstance.post(`${authUrl}/signup/confirm`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 이메일 인증 재전송
const postResendVerification = async () => {
  try {
    const response = await axiosInstance.post(`${authUrl}/signup/resend`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 로그인
const postUserLogin = async () => {
  try {
    const response = await axiosInstance.post(`${authUrl}/login`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

//토큰 갱신
const getNewToken = async () => {
  try {
    const response = await axiosInstance.get(`${authUrl}/user`);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const useQueryUserData = (id: string | number) => {
  return useQuery(['user', id], () => getUserData(id));
};

export const useQueryUserWithToken = () => {
  return useQuery(['userWithToken'], getUserWithToken);
};

export const useMutationUserSignup = () => {
  return useMutation({ mutationFn: postUserSignup });
};

export const useMutationEmailVerify = () => {
  return useMutation({ mutationFn: postEmailVerify });
};

export const useMutationResendVerification = () => {
  return useMutation({ mutationFn: postResendVerification });
};

export const useMutationUserLogin = () => {
  return useMutation({ mutationFn: postUserLogin });
};

export const useQueryNewToken = () => {
  return useQuery(['newToken'], getNewToken);
};
