export interface LoginUser {
  email: string;
  password: string;
}

interface State {
  id: number;
  name: string;
  userId: number;
}

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  state: State;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseBody {
  userInfo: UserInfo;
  token: Token;
}

export type LoginRequest = LoginUser;
export type LoginResponse = LoginResponseBody | null;
