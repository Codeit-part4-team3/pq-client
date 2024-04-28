// useUserData.js

import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from '../instance/axiosInstance';

const userUrl = '/api/user/v1/user';
const authUrl = '/api/user/v1/auth';

interface SignupBody {
  email: string;
  password: string;
  nickname: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface EmailVerifyBody {
  email: string;
  code: string;
}

const getUserData = async (id: string | number) => {
  const response = await axiosInstance.get(`${userUrl}/${id}`);
  return response.data;
};

// 토큰으로 유저 확인
const getUserWithToken = async () => {
  const response = await axiosInstance.get(`${authUrl}/user`);
  return response.data;
};

// 회원가입
const postUserSignup = async (data: SignupBody) => {
  const response = await axiosInstance.post(`${authUrl}/signup`, data);
  return response.data;
};

// 이메일 인증
const postEmailVerify = async (data: EmailVerifyBody) => {
  const response = await axiosInstance.post(`${authUrl}/signup/confirm`, data);
  return response.data;
};

// 이메일 인증 재전송
const postResendVerification = async () => {
  const response = await axiosInstance.post(`${authUrl}/signup/resend`);
  return response.data;
};

// 로그인
const postUserLogin = async (data: LoginBody) => {
  const response = await axiosInstance.post(`${authUrl}/login`, data);
  return response.data;
};

//토큰 갱신
const getNewToken = async () => {
  const response = await axiosInstance.get(`${authUrl}/user`);
  return response.data;
};

export const useQueryUserData = (id: string | number) => {
  return useQuery(['user', id], () => getUserData(id));
};

export const useQueryUserWithToken = () => {
  return useQuery(['userWithToken'], getUserWithToken);
};

export const useMutationUserSignup = (options: UseMutationOptions<SignupBody, unknown, SignupBody, unknown>) => {
  return useMutation(postUserSignup, options);
};

export const useMutationEmailVerify = (
  options: UseMutationOptions<EmailVerifyBody, unknown, EmailVerifyBody, unknown>,
) => {
  return useMutation(postEmailVerify, options);
};

export const useMutationResendVerification = () => {
  return useMutation({ mutationFn: postResendVerification });
};

export const useMutationUserLogin = (options: UseMutationOptions<LoginBody, unknown, LoginBody, unknown>) => {
  return useMutation(postUserLogin, options);
};

export const useQueryNewToken = () => {
  return useQuery(['newToken'], getNewToken);
};
