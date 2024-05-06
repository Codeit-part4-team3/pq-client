export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  state?: string;
}

export interface ResponseUserData {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  userInfo: UserInfo;
}
