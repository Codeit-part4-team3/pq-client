import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

export default function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    return () => {
      console.log('chatChannel Socket disconnected');
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef;
}
