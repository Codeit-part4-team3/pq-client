import styled from 'styled-components';
import OtherVideo from './OtherVideo';
import MyMediaControlPanel from './MyMediaControlPanel';

export default function VoiceChannelUi() {
  return (
    <Wrapper>
      <OtherVideo />
      <MyMediaControlPanel />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
