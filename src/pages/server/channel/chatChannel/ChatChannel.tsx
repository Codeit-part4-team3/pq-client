import styled from 'styled-components';

import addSvg from '../../../../../public/images/add_FILL0_wght200_GRAD0_opsz24 3.svg';
import ChannelHeader from 'src/components/channel/ChannelHeader';
import ChatMessages from './_components/ChatMessages';
import { MessageItem } from './_types/type';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

export default function ChatChannel() {
  const { channelId: roomName } = useParams();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      socketRef.current?.emit('send_message', e.currentTarget.value, roomName);
      setInputValue('');
    }
  };

  const handleMoreMessageButton = () => {
    socketRef.current?.emit('more_message', roomName);
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.emit('join_chat_channel', roomName);

    socketRef.current.on('join_chat_channel_user_join', (socketId) => {
      console.log(socketId + 'is joined');
    });

    socketRef.current.on('initial_chat_messages', (initialMessages: MessageItem[]) => {
      console.log('initial messages data : ', initialMessages);
      setMessages([...initialMessages]);
    });

    socketRef.current.on('receive_message', (newMessage: MessageItem) => {
      console.log('new message data : ', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomName]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Wrapper>
      <button onClick={handleMoreMessageButton}>메시지 더보기</button>
      <ChannelHeader />

      <ChatContainer ref={chatContainerRef}>
        {/* 채팅 가져오고 더이상 가져올 채팅이 없으면 보여주게 하면될듯 */}
        <ChatChannelIntro>
          <ChannelName>{'# 채팅 채널1'}의 첫 시작 부분이에요</ChannelName>
          <CreationDate>생성일 : {'2024년 04월 11일'}</CreationDate>
        </ChatChannelIntro>
        <ChatMessages messages={messages} />
      </ChatContainer>
      <ChatInputBox>
        <ChatInput
          type='text'
          placeholder={`${'#채팅방 이름'}에 메시지 보내기`}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSendMessageKeyDown}
        />
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
