import { Link, Outlet } from 'react-router-dom';
import VoiceChannel from '../../components/voiceChannel/VoiceChannel';

export default function Server() {
  return (
    <div>
      <h1>Server Page</h1>
      <VoiceChannel />
      <Link to='/'>Logout</Link>
      <Outlet />
    </div>
  );
}
