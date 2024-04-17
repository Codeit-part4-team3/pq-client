import { Link } from 'react-router-dom';
import VoiceChannel from '../../components/voiceChannel/VoiceChannel';

export default function Chat() {
  return (
    <div>
      <h1>Chat Page</h1>
      <VoiceChannel />
      <Link to='/'>Logout</Link>
    </div>
  );
}
