import { Route, Routes } from 'react-router-dom';
import VoiceChannel from './components/voiceChannel/VoiceChannel';
import Landing from './pages/landing/Landing';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Chat from './pages/chat/chat';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
      <VoiceChannel />
    </>
  );
}

export default App;
