import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

export interface Toast {
  id: number;
  message: string;
}

export interface ToastState {
  socket: Socket | null;
  toasts: Toast[];
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
  initializeSocket: () => void;
  disconnectSocket: () => void;
}

const useToastStore = create<ToastState>((set, get) => ({
  socket: null,
  toasts: [],

  addToast: (message) => {
    const newToast = { id: Date.now(), message };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    setTimeout(() => {
      get().removeToast(newToast.id);
    }, 3000); // 3초 후에 토스트 자동 삭제
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  initializeSocket: () => {
    try {
      const socket = io(SOCKET_SERVER_URL);
      socket.on('receive_toast', (message) => {
        get().addToast(message);
      });
      set({ socket });
    } catch (err) {
      console.error('Socket initialization failed:', err);
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.off('receive_toast');
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useToastStore;
