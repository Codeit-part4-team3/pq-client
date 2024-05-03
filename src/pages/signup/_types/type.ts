import { LoginUser } from 'src/pages/login/_type/type';

export interface FormValues {
  otp: string;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

interface SignupUser extends LoginUser {
  nickname: string;
}

export type SignupRequest = SignupUser;
export type SignupResponse = SignupUser | null;

interface EmailVerify {
  email: string;
  code: string;
}

interface EmailVerifyStatus {
  statusCode: number;
  message: string;
}

export type EmailVerifyRequest = EmailVerify;
export type EmailVerifyResponse = EmailVerifyStatus | null;

export interface KakaoSignupRequest {
  id: number;
  email: string;
  nickname: string;
  state?: string;
}
