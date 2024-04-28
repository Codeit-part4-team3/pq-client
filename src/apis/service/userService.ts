// useUserData.js

import { useQuery, useMutation } from 'react-query';
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
const postUserSignup = async (data: SignupBody) => {
  try {
    const response = await axiosInstance.post(`${authUrl}/signup`, data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 이메일 인증
const postEmailVerify = async (data: EmailVerifyBody) => {
  try {
    const response = await axiosInstance.post(`${authUrl}/signup/confirm`, data);
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
const postUserLogin = async (data: LoginBody) => {
  try {
    const response = await axiosInstance.post(`${authUrl}/login`, data);
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
