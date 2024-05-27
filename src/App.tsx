import { GlobalStyles } from './GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/routes';
import Toasts from './components/toast/toast';
import useToastStore from './store/toastStore';
import { useEffect, useRef } from 'react';
import useEventStore from './store/eventStore';
import useSocketStore from './store/socketStore';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

function App() {
  const queryClient = new QueryClient();
  const { initializeSocket: initializeToastSocket, disconnectSocket: disconnectToastSocket } = useToastStore();
  const { initializeSocket: initializeEventSocket, disconnectSocket: disconnectEventSocket } = useEventStore();
  const { setSocket } = useSocketStore();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    initializeToastSocket();
    initializeEventSocket();

    return () => {
      disconnectToastSocket();
      disconnectEventSocket();
    };
  }, [initializeToastSocket, initializeEventSocket, disconnectToastSocket, disconnectEventSocket]);

  useEffect(() => {
    const socketConnect = io(SOCKET_SERVER_URL);
    setSocket(socketConnect);
    socketRef.current = socketConnect;

    return () => {
      socketRef.current?.disconnect();
    };
  }, [setSocket]);

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Toasts />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
