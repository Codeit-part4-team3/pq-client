import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

export const useSocketConnect = () => {
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socketRef };
};
