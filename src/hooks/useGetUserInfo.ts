import { useEffect } from 'react';
import axiosInstance from 'src/apis/instance/axiosInstance';

import useUserStore from 'src/store/userStore';
import { UserInfo } from 'src/types/userType';

export function useGetUserInfo() {
  const { setUserInfo, userInfo, accessToken } = useUserStore();

  const getUserInfo = async () => {
    try {
      const { data } = await axiosInstance.get<UserInfo>('/user/v1/user/me');
      setUserInfo(data);
    } catch (error) {
      console.error('Failed to get user info:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  return userInfo;
}
