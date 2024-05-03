import { create } from 'zustand';

interface UserState {
  email: string;
  setEmail: (email: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  email: '',
  setEmail: (email: string) => set({ email }),
  accessToken: '',
  setAccessToken: (accessToken: string) => set({ accessToken }),
  removeAccessToken: () => set({ accessToken: '' }),
}));

export default useUserStore;
