import styled from 'styled-components';
import VoiceChannel from './VoiceChannel/VoiceChannel';

export default function Channel() {
  return (
    <Area>
      {/* <VoiceChannel/> */}
      <VoiceChannel />
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  background-color: #ffffff;
`;
