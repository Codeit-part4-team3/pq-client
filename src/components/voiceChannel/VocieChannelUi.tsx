import styled from 'styled-components';
import OtherVideo from './OtherVideo';
import MyMediaControlPanel from './MyMediaControlPanel';
import ChannelHeader from './ChannelHeader';

export default function VoiceChannelUi() {
  return (
    <Wrapper>
      <ChannelHeader />
      <VideoContainer>
        <OtherVideo />
        <OtherVideo />
        <OtherVideo />
        <OtherVideo />
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
