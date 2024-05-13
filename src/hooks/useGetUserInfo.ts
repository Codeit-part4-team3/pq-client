import { useEffect } from 'react';

import { useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';

import useUserStore from 'src/store/userStore';
import { UserInfo } from 'src/types/userType';

export function useGetUserInfo() {
  const { setUserInfo, userInfo } = useUserStore();

  const { data: userData, isLoading } = useQueryGet<UserInfo>('getUserInfo', `${USER_URL.USER}/me`, {});

  // 유저 정보 업데이트
  useEffect(() => {
    if (isLoading) return;

    if (userData) {
      setUserInfo(userData as UserInfo);
    }
  }, [userData]);

  return userInfo;
}
