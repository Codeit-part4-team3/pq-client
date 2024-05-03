import { create } from 'zustand';

interface TokenState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useTokenStore = create<TokenState>((set) => ({
  accessToken: '',
  setAccessToken: (accessToken: string) => set({ accessToken }),
  removeAccessToken: () => set({ accessToken: '' }),
}));

export default useTokenStore;
