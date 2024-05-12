import { create } from 'zustand';

interface TempOrderState {
  tempOrderId: string;
  tempAmount: number;
  setTempOrderId: (tempOrderId: string) => void;
  setTempAmount: (tempAmount: number) => void;
}

export const useTempOrderStore = create<TempOrderState>((set) => ({
  tempOrderId: '',
  tempAmount: 0,

  setTempOrderId: (tempOrderId: string) => set({ tempOrderId }),
  setTempAmount: (tempAmount: number) => set({ tempAmount }),
}));

interface PlanState {
  planId: number;
  planType: string;
  amount: number;

  setPlanId: (planId: number) => void;
  setPlanType: (planType: string) => void;
  setAmount: (amount: number) => void;

  removeAll: () => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  planId: 0,
  planType: '',
  amount: 0,

  setPlanId: (planId: number) => set({ planId }),
  setPlanType: (planType: string) => set({ planType }),
  setAmount: (amount: number) => set({ amount }),

  removeAll: () => set({ planId: 0, planType: '', amount: 0 }),
}));

interface EventWinnerState {
  eventWinner: string | undefined;
  setEventWinner: (eventWinner: string | undefined) => void;
  removeEventWinner: () => void;
}

export const useEventWinnerStore = create<EventWinnerState>((set) => ({
  eventWinner: undefined,
  setEventWinner: (eventWinner: string | undefined) => set({ eventWinner }),
  removeEventWinner: () => set({ eventWinner: undefined }),
}));
