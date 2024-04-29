// useUserData.js

import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from '../instance/axiosInstance';
import { URL } from 'src/constants/apiUrl';

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody extends LoginBody {
  nickname: string;
}

interface LoginResponseBody {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface EmailVerifyBody {
  email: string;
  code: string;
}

const getUserData = async (id: string | number) => {
  const response = await axiosInstance.get(`${URL.USER}/${id}`);
  return response.data;
};

// 토큰으로 유저 확인
const getUserWithToken = async () => {
  const response = await axiosInstance.get(`${URL.AUTH}/user`);
  return response.data;
};

// 회원가입
const postUserSignup = async (data: SignupBody) => {
  const response = await axiosInstance.post(`${URL.AUTH}/signup`, data);
  return response.data;
};

// 이메일 인증
const postEmailVerify = async (data: EmailVerifyBody) => {
  const response = await axiosInstance.post(`${URL.AUTH}/signup/confirm`, data);
  return response.data;
};

// 이메일 인증 재전송
const postResendVerification = async () => {
  const response = await axiosInstance.post(`${URL.AUTH}/signup/resend`);
  return response.data;
};

// 로그인
const postUserLogin = async (data: LoginBody) => {
  const response = await axiosInstance.post(`${URL.AUTH}/login`, data);
  return response.data;
};

//토큰 갱신
const getNewToken = async () => {
  const response = await axiosInstance.get(`${URL.AUTH}/user`);
  return response.data;
};

// ----------react-query----------
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

export const useMutationUserLogin = (options: UseMutationOptions<LoginResponseBody, unknown, LoginBody, unknown>) => {
  return useMutation(postUserLogin, options);
};

export const useQueryNewToken = () => {
  return useQuery(['newToken'], getNewToken);
};
