import { create } from 'zustand';

interface EventState {
  isEventActive: boolean;
  setIsEventActive: (isEventActive: boolean) => void;
}

export const useEventStore = create<EventState>((set) => ({
  isEventActive: false,
  setIsEventActive: (isEventActive: boolean) => set({ isEventActive }),
}));

export default useEventStore;
