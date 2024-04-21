import { Route, Routes } from 'react-router-dom';
import VoiceChannel from './components/voiceChannel/VoiceChannel';
import ChatChannel from './components/chatChannel/ChatChannel';

function App() {
  return (
    <Routes>
      <Route path='/voiceChannel/:id' element={<VoiceChannel />} />
      <Route path='/chatChannel/:id' element={<ChatChannel />} />
    </Routes>
  );
}

export default App;
