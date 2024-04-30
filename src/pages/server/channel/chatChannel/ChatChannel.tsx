import styled from 'styled-components';

import addSvg from '../../../../../public/images/add_FILL0_wght200_GRAD0_opsz24 3.svg';
import ChannelHeader from '../../../../components/voiceChannel/ChannelHeader';
import ChatMessages from './_components/ChatMessages';
import { Message } from './_types';

export default function ChatChannel() {
  const generateMessageId = () => Math.random().toString(36).substr(2, 9);

  const messages: Message[] = Array.from({ length: 10 }, (_, i) => ({
    messageId: generateMessageId(),
    userId: '1',
    message: `message ${i + 1}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: 'normal',
  }));

  return (
    <Wrapper>
      <ChannelHeader />
      <ChatContainer>
        <ChatChannelIntro>
          <ChannelName>{'# 채팅 채널1'}의 첫 시작 부분이에요</ChannelName>
          <CreationDate>생성일 : {'2024년 04월 11일'}</CreationDate>
        </ChatChannelIntro>
        <ChatMessages messages={messages} />
      </ChatContainer>
      <ChatInputBox>
        <ChatInput type='text' placeholder={`${'#채팅방 이름'}에 메시지 보내기`} />
        <NoTitleButton>
          <img src={addSvg} alt='add 이미지' width={24} height={24} />
        </NoTitleButton>
      </ChatInputBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;

const ChatContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  margin-left: 20px;
  margin-right: 20px;
`;

const ChatChannelIntro = styled.div``;

const ChannelName = styled.h1`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
  margin: 0;
`;

const CreationDate = styled.p`
  color: #666;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  margin: 0;
`;

const ChatInputBox = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ChatInput = styled.input`
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
  height: 48px;

  flex-shrink: 0;
  background: #fff;
  padding-left: 16px;
  padding-right: 12px;

  &:focus {
    outline: none;
    border: 1px solid #00bb83;
  }
`;

const NoTitleButton = styled.button`
  border: none;
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  position: absolute;
  top: 12px;
  right: 12px;
  bottom: 12px;

  cursor: pointer;
`;
