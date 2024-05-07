import { create } from 'zustand';

interface TempOrderState {
  tempOrderId: string;
  setTempOrderId: (tempOrderId: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
}

interface PaymentState {
  userId: string;
  setUserId: (userId: string) => void;
  planId: number;
  setPlanId: (planId: number) => void;
}

export const useTempOrderStore = create<TempOrderState>((set) => ({
  tempOrderId: '',
  setTempOrderId: (tempOrderId: string) => set({ tempOrderId }),
  amount: 0,
  setAmount: (amount: number) => set({ amount }),
}));

export const usePaymentStore = create<PaymentState>((set) => ({
  userId: '',
  setUserId: (userId: string) => set({ userId }),
  planId: 1,
  setPlanId: (planId: number) => set({ planId }),
}));
