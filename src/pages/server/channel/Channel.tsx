import styled from 'styled-components';
import VoiceChannel from '../../../components/voiceChannel/VoiceChannel';

export default function Channel() {
  return (
    <ChannelArea>
      <h1>Channel Page</h1>
      <VoiceChannel />
    </ChannelArea>
  );
}

const ChannelArea = styled.section`
  width: 100%;
  height: 100vh;

  background-color: #ffffff;
`;
