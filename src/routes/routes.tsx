import { Route, Routes } from 'react-router-dom';
import Landing from 'src/pages/landing/Landing';
import Signup from 'src/pages/signup/Signup';
import Login from 'src/pages/login/Login';
import Server from 'src/pages/server/Server';
import NotFound from 'src/pages/notfound/NotFound';
import Channel from 'src/pages/server/channel/Channel';
import Admin from 'src/pages/admin/Admin';
import EmailCheck from 'src/pages/signup/EmailCheck.tsx/EmailCheck';
import FindPassword from 'src/pages/login/findPassword/FindPassowrd';
import ChangePassword from 'src/pages/login/changePassword/ChangePassword';
import Invite from 'src/pages/invite/Invite';
import ChatChannel from 'src/pages/server/channel/chatChannel/ChatChannel';
import VoiceChannel from 'src/pages/server/channel/voiceChannel/VoiceChannel';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/find-password' element={<FindPassword />} />
      <Route path='/change-password' element={<ChangePassword />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/check-email' element={<EmailCheck />} />
      <Route path='/server' element={<Server />} />
      <Route path='/server/:serverId' element={<Server />}>
        <Route path='channel/:channelId' element={<Channel />} />
      </Route>
      <Route path='/invite' element={<Invite />} />
      <Route path='/invite/:inviteId' element={<Invite />} />
      <Route path='chatTest' element={<ChatChannel />} />
      <Route path='voiceTest' element={<VoiceChannel />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
  );
}
