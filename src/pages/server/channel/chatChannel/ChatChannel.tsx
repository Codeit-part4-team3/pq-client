import styled from 'styled-components';

import ChatInputBox from './_components/ChatInputBox';
import ChatContainer from './_components/ChatContainer';

/**@ToDo
 * 소켓 연결 / 소켓 이벤트 리스너 분리하는 로직 짜면 좋을듯
 */
export default function ChatChannel() {
  return (
    <Wrapper>
      <ChatContainer />
      <ChatInputBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;
