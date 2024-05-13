import { GlobalStyles } from './GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/routes';
import Toasts from './components/toast/toast';
import useToastStore from './store/toastStore';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient();
  const initializeSocket = useToastStore((state) => state.initializeSocket);
  const disconnectSocket = useToastStore((state) => state.disconnectSocket);

  useEffect(() => {
    initializeSocket();
    return () => disconnectSocket();
  }, [initializeSocket, disconnectSocket]);

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
