export const CHAT_URL = {
  BASE: import.meta.env.VITE_APP_ORIGIN_API,
  SERVER: '/chat/v1/server',
};

export const USER_URL = {
  BASE: import.meta.env.VITE_APP_ORIGIN_API,
  USER: '/user/v1/user',
  AUTH: '/user/v1/auth',
  PLANS: '/user/v1/plans',
  PAYMENTS: '/user/v1/payments',
};

export const LOGIN_REDIRECT = import.meta.env.VITE_APP_LOGIN_REDIRECT_URI;
export const SIGNUP_REDIRECT = import.meta.env.VITE_APP_SIGNUP_REDIRECT_URI;

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

export const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN;
