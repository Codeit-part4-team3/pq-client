import { useState } from 'react';

import styled from 'styled-components';

import ChatChannel from './chatChannel/ChatChannel';
import VoiceChannel from './VoiceChannel/VoiceChannel';

export default function Channel() {
  // Channel의 종류에 따라 VoiceChannel, ChatChannel을 렌더링
  const [channelType] = useState('chat');
  return <Area>{channelType === 'chat' ? <ChatChannel /> : <VoiceChannel />}</Area>;
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  background-color: #ffffff;

  position: relative;
`;
