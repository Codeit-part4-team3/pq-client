import { GlobalStyles } from './GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/routes';
import Toasts from './components/toast/toast';
import useToastStore from './store/toastStore';
import { useEffect } from 'react';
import useEventStore from './store/eventStore';

function App() {
  const queryClient = new QueryClient();
  const { initializeSocket: initializeToastSocket, disconnectSocket: disconnectToastSocket } = useToastStore();
  const { initializeSocket: initializeEventSocket, disconnectSocket: disconnectEventSocket } = useEventStore();

  useEffect(() => {
    initializeToastSocket();
    initializeEventSocket();

    return () => {
      disconnectToastSocket();
      disconnectEventSocket();
    };
  }, [initializeToastSocket, initializeEventSocket, disconnectToastSocket, disconnectEventSocket]);

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
