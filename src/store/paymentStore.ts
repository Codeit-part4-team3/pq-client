import { create } from 'zustand';

interface TempOrderState {
  tempOrderId: string;
  setTempOrderId: (tempOrderId: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
}

const usePaymentStore = create<TempOrderState>((set) => ({
  tempOrderId: '',
  setTempOrderId: (tempOrderId: string) => set({ tempOrderId }),
  amount: 0,
  setAmount: (amount: number) => set({ amount }),
}));

export default usePaymentStore;
