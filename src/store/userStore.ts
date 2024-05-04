import { create } from 'zustand';

interface UserState {
  email: string;
  setEmail: (email: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  email: '',
  accessToken: '',
  setEmail: (email: string) => set({ email }),
  setAccessToken: (accessToken: string) => set({ accessToken }),

  removeEmail: () => set({ email: '' }),
  removeAccessToken: () => set({ accessToken: '' }),
  removeAll: () => set({ email: '', accessToken: '' }),
}));

export default useUserStore;
