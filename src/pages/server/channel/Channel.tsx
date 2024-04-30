// import { useState } from 'react';

import styled from 'styled-components';

// import ChatChannel from './chatChannel/ChatChannel';

import { useParams } from 'react-router-dom';
import VoiceChannel from './voiceChannel/VoiceChannel';

export default function Channel() {
  const { serverId, channelId } = useParams();
  console.log('serverId:', serverId, 'channelId:', channelId);
  /**@ToDo channel 데이터의 onVoice의 boolean에 따라 ChatChannel을 보여줄지 VoiceChannel을 보여줄지 생각 */
  // const [onVoice] = useState('false');
  // return <Area>{onVoice === 'false' ? <ChatChannel /> : <VoiceChannel />}</Area>;
  return (
    <Area>
      <VoiceChannel />
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  background-color: #ffffff;

  position: relative;
`;
