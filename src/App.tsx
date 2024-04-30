import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Server from './pages/server/Server';
import NotFound from './pages/notfound/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStyles } from './GlobalStyles';
import Channel from './pages/server/channel/Channel';
import Admin from './pages/admin/Admin';
import EmailCheck from './pages/signup/EmailCheck.tsx/EmailCheck';
import FindPassword from './pages/login/findPassword/FindPassowrd';
import ChangePassword from './pages/login/changePassword/ChangePassword';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/findPassword' element={<FindPassword />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/checkEmail' element={<EmailCheck />} />
          <Route path='/server' element={<Server />} />
          <Route path='/server/:serverId' element={<Server />}>
            <Route path='channel/:channelId' element={<Channel />} />
          </Route>
          <Route path='*' element={<NotFound />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
