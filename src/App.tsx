import { GlobalStyles } from './GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes/routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
