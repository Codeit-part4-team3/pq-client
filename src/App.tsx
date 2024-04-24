import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Server from './pages/server/Server';
import NotFound from './pages/notfound/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './GlobalStyles';
import Channel from './pages/server/channel/Channel';
import Admin from './pages/admin/Admin';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/server' element={<Server />} />
          <Route path='/server/:id' element={<Server />}>
            <Route path='channel/:id' element={<Channel />} />
          </Route>
          <Route path='*' element={<NotFound />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
