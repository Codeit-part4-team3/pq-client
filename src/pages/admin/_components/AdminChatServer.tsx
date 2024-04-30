import styled from 'styled-components';

import ServerTest from './ServerTest';
import ChannelTest from './ChannelTest';

// TODO : request api
export default function AdminChatServer() {
  return (
    <>
      <ServerTest />
      <ChannelTest />
    </>
  );
}

export const Area = styled.section`
  width: 100%;
  height: 100vh;

  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
`;

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

export const LogContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  color: #ffffff;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  > * {
    width: 100%;
    height: 100%;
  }

  > button {
    height: 20px;
  }
`;
