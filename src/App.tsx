import { Route, Routes } from 'react-router-dom';
import VoiceChannel from './components/voiceChannel/VoiceChannel';

function App() {
  return (
    <Routes>
      <Route path='/voiceChannel/:id' element={<VoiceChannel />} />
    </Routes>
  );
}

export default App;
