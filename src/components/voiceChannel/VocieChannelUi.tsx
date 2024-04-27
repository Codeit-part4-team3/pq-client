import styled from 'styled-components';
import OtherVideo from './OtherVideo';

export default function VoiceChannelUi() {
  return (
    <Wrapper>
      <OtherVideo />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
