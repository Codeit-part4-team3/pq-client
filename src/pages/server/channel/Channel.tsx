// import { useState } from 'react';

import styled from 'styled-components';

// import ChatChannel from './chatChannel/ChatChannel';

import { useParams } from 'react-router-dom';
import VoiceChannel from './voiceChannel/VoiceChannel';
import ChatChannel from './chatChannel/ChatChannel';
import { useState } from 'react';

export default function Channel() {
  const { serverId, channelId } = useParams();
  console.log('serverId:', serverId, 'channelId:', channelId);

  // 받아온 channelId를 이용해서 해당 채널의 데이터를 가져와서 isVoice에 따라서 채널을 렌더링한다
  // 채널 데이터를 가져오는 로직

  const [isVoice] = useState(true);
  return <Area>{isVoice ? <ChatChannel /> : <VoiceChannel />}</Area>;
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  background-color: var(--white_FFFFFF);

  position: relative;
`;
