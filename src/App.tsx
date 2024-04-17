import { useRoutes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Chat from './pages/chat/chat';
import NotFound from './pages/notfound/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  const routing = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/chat', element: <Chat /> },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>{routing}</QueryClientProvider>
    </>
  );
}

export default App;
