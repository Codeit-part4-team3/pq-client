import styled from 'styled-components';
import ChannelHeader from 'src/components/channel/ChannelHeader';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { lastKey, MessageItem } from 'src/pages/server/channel/chatChannel/_types/type';
import ChatMessages from 'src/pages/server/channel/chatChannel/_components/ChatMessages';
import UtilityButton from './_components/UtilityButton';
import { useParams } from 'react-router-dom';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

export default function ChatChannel() {
  const userId = 'minji';
  const { channelId } = useParams();
  const roomName = channelId || 'test';
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isNoMoreMessages, setIsNoMoreMessages] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isClickedUtilityButton, setIsClickedUtilityButton] = useState<boolean>(false);
  const infiniteScrollTriggerRef = useRef<HTMLDivElement | null>(null);
  const [lastKey, setLastKey] = useState<lastKey | null>(null);

  const handleUiilityButtonClick = () => {
    setIsClickedUtilityButton(!isClickedUtilityButton);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue === '') return;
    if (e.key === 'Enter') {
      socketRef.current?.emit('send_message', { message: e.currentTarget.value, roomName, userId });
      setInputValue('');
    }
  };

  // infinite scroll : InfiniteScrollTrigger에 닿으면 추가로 메시지를 가져온다.
  const infiniteScroll = async () => {
    console.log('infiniteScroll');
    if (infiniteScrollTriggerRef.current) {
      const infiniteScrollTriggerIo = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && infiniteScrollTriggerRef.current && lastKey) {
              socketRef.current?.emit('more_messages', { roomName, userSocketId: socketRef.current?.id, lastKey });

              infiniteScrollTriggerIo.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );

      infiniteScrollTriggerIo.observe(infiniteScrollTriggerRef.current);
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.emit('join_chat_channel', roomName);

    socketRef.current.on('join_chat_channel_user_join', (socketId) => {
      console.log(socketId + 'is joined');
    });

    socketRef.current.on(
      'initial_chat_messages',
      ({ initialMessages, lastKey }: { initialMessages: MessageItem[]; lastKey: lastKey }) => {
        console.log('initial messages data : ', initialMessages);
        setMessages([...initialMessages]);
        setLastKey(lastKey);
      },
    );

    socketRef.current.on('receive_message', (newMessage: MessageItem) => {
      console.log('new message data : ', newMessage);
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    // 인피니티 스크롤을 위한 이벤트
    socketRef.current.on(
      'more_messages',
      ({
        moreMessages,
        lastKey,
        isNoMoreMessages,
      }: {
        moreMessages: MessageItem[];
        lastKey: lastKey;
        isNoMoreMessages: boolean;
      }) => {
        console.log('more messages data : ', moreMessages);
        setMessages((prevMessages) => [...prevMessages, ...moreMessages]);
        setLastKey(lastKey);
        if (isNoMoreMessages) {
          setIsNoMoreMessages(true);
        }
      },
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomName]);

  useEffect(() => {
    // 채팅이 추가될 때마다 스크롤을 맨 아래로 내려준다
    if (inputValue === '' && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [inputValue]);

  useEffect(() => {
    infiniteScroll();
    // eslint-disable-next-line
  }, [lastKey]);

  return (
    <Wrapper>
      <ChannelHeader />
      <ChatContainer ref={chatContainerRef}>
        {/* flex: column-reverse상태 */}
        {/* 가장 아래쪽 */}
        <ChatMessages messages={messages} />
        {/* 채팅 가져오고 더이상 가져올 채팅이 없으면 보여주게 하면될듯, 서버 데이터 필요 */}
        {isNoMoreMessages ? (
          <ChatChannelIntro>
            <ChannelName>{'# 채팅 채널1'}의 첫 시작 부분이에요</ChannelName>
            <CreationDate>생성일 : {'2024년 04월 11일'}</CreationDate>
          </ChatChannelIntro>
        ) : null}
        {lastKey ? (
          <InfinityScrollTrigger ref={infiniteScrollTriggerRef}>infiniteScrollTrigger</InfinityScrollTrigger>
        ) : null}

        {/* 가장 위쪽 */}
      </ChatContainer>
      <ChatInputBox>
        <ChatInput
          type='text'
          placeholder={`${'#채팅방 이름'}에 메시지 보내기`}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSendMessageKeyDown}
        />
        <UtilityButton
          isClickedUtilityButton={isClickedUtilityButton}
          handleUiilityButtonClick={handleUiilityButtonClick}
        />
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

const InfinityScrollTrigger = styled.div`
  width: 100%;
  height: 100px;
`;

const ChatContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;

  margin-left: 20px;
  margin-right: 20px;
`;

const ChatChannelIntro = styled.div`
  margin-top: 495px;
`;

const ChannelName = styled.h1`
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%; /* 32px */
  margin: 0;
`;

const CreationDate = styled.p`
  color: var(--gray_666666);
  font-family: Pretendard;
  font-size: 14px;
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
  border: 1px solid var(--gray_CCCCCC);
  width: 100%;
  height: 48px;

  flex-shrink: 0;
  background: var(--white_FFFFFF);
  padding-left: 16px;
  padding-right: 12px;

  &:focus {
    outline: none;
    border: 1px solid #00bb83;
  }
`;
