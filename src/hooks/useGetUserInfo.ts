import { useEffect } from 'react';
import axiosInstance from 'src/apis/instance/axiosInstance';

import useUserStore from 'src/store/userStore';
import { UserInfo } from 'src/types/userType';

interface AccessTokenResponse {
  accessToken: string;
}

export function useGetUserInfo() {
  const { setUserInfo, userInfo, accessToken, setAccessToken } = useUserStore();

  const getAccessToken = async () => {
    try {
      const res = await axiosInstance.get<AccessTokenResponse>('/user/v1/auth/token', { withCredentials: true });
      const { data } = res;
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error('Failed to get access token:', error);
    }
  };

  const getUserInfo = async () => {
    await getAccessToken();
    try {
      const { data } = await axiosInstance.get<UserInfo>('/user/v1/user/me');
      setUserInfo(data);
    } catch (error) {
      console.error('Failed to get user info:', error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      getUserInfo();
    }
  }, []);

  return userInfo;
}
