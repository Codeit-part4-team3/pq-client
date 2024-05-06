import { UserInfo } from 'src/types/userType';
import { create } from 'zustand';

interface UserState {
  email: string;
  setEmail: (email: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserStore = create<UserState>((set) => ({
  email: '',
  accessToken: '',
  setEmail: (email: string) => set({ email }),
  setAccessToken: (accessToken: string) => set({ accessToken }),
  userInfo: {
    id: 0,
    email: '',
    nickname: '',
    state: '',
  },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),

  removeEmail: () => set({ email: '' }),
  removeAccessToken: () => set({ accessToken: '' }),
  removeAll: () => set({ email: '', accessToken: '' }),
  removeUserInfo: () => set({ userInfo: { id: 0, email: '', nickname: '', state: '' } }),
}));

export default useUserStore;
