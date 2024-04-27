import styled from 'styled-components';

import MyMediaControlPanel from './MyMediaControlPanel';
import ChannelHeader from './ChannelHeader';
import Video from './Video';

// @ToDo webRTC 버그 수정 전까지만 이 컴포넌트로 사용예정(일단 보여주기 식 입니다.)
export default function VoiceChannelUi() {
  return (
    <Wrapper>
      <ChannelHeader />
      <VideoContainer>
        <Video onVoice={true} />
        <Video onVoice={false} />
        <Video onVoice={false} />
        <Video onVoice={false} />
      </VideoContainer>

      <MyMediaControlPanel />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 80px;
  padding-bottom: 125px;
`;
