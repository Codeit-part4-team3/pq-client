// import { useState } from 'react';

import styled from 'styled-components';

// import ChatChannel from './chatChannel/ChatChannel';

import { useParams } from 'react-router-dom';
import VoiceChannel from './voiceChannel/VoiceChannel';
import ChatChannel from './chatChannel/ChatChannel';
import { useState } from 'react';
import ChannelHeader from 'src/components/channel/ChannelHeader';

export default function Channel() {
  const [isShowMembers, setIsShowMembers] = useState(true);
  const { serverId, channelId } = useParams();
  console.log('serverId:', serverId, 'channelId:', channelId);

  const handleMembers = () => {
    setIsShowMembers(!isShowMembers);
  };

  /**@ToDo channel 데이터의 onVoice의 boolean에 따라 ChatChannel을 보여줄지 VoiceChannel을 보여줄지 생각 */
  const [onVoice] = useState('false');
  return (
    <Area>
      <ChannelHeader onClickMembers={handleMembers} />
      <Container>
        {onVoice === 'true' ? <ChatChannel /> : <VoiceChannel />}
        {isShowMembers && (
          <MembersContainer>
            <div>
              <span>구성원</span>
            </div>
            <div>구성원4</div>
            <div>구성원3</div>
          </MembersContainer>
        )}
      </Container>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 48px);

  background-color: var(--white_FFFFFF);
  display: flex;
  flex-direction: row;

  position: relative;
`;

const MembersContainer = styled.div`
  width: 180px;
  height: 100%;

  border-left: 1px solid var(--gray_CCCCCC);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & > * {
    padding: 10px;
  }
`;
