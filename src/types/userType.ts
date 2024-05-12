export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  state?: string;
  imageUrl?: string;
}

export interface ResponseUserData {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  userInfo: UserInfo;
}

export interface RequestUpdateUserData {
  nickname: string;
  imageFile: File | null;
}
