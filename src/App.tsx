import { GlobalStyles } from './GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/routes';
import { ToastProvider } from './context/toast';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
