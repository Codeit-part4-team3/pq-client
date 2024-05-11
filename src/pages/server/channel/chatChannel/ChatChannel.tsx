import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { lastKey, MessageItem, User } from 'src/pages/server/channel/chatChannel/_types/type';
import ChatMessages from 'src/pages/server/channel/chatChannel/_components/ChatMessages';
import UtilityButton from './_components/UtilityButton';
import { useSubscription } from 'src/hooks/useSubscription';
import { useParams } from 'react-router-dom';
import useUserStore from 'src/store/userStore';
import { useQueryGet } from 'src/apis/service/service';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

/**@Todo Channel 컴포넌트로 부터 channel date를 prop로 받고 데이터 바인딩 예정
 * 유저 데이터들 처리하는 로직 짜야함
 */
export default function ChatChannel() {
  // 유저, 서버, 채널 데이터
  const { userInfo } = useUserStore();
  const { id: userId } = userInfo;
  const { serverId, channelId } = useParams();
  const roomName = channelId;

  // 서버내의 모든 유저 데이터
  const { data: serverUserData } = useQueryGet<User[]>('getServerAllUser', `/chat/v1/server/${serverId}/users`, {
    staleTime: 5000,
    refetchInterval: 5000,
    enabled: !!userId,
  });
  // 소켓
  const socketRef = useRef<Socket | null>(null);
  // 메시지 관련
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  // 무한 스크롤
  const [isNoMoreMessages, setIsNoMoreMessages] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const infiniteScrollTriggerRef = useRef<HTMLDivElement | null>(null);
  const [lastKey, setLastKey] = useState<lastKey | null>(null);
  // 유틸리티 버튼
  const [isClickedUtilityButton, setIsClickedUtilityButton] = useState<boolean>(false);
  // 메시지 수정
  const [editingMessage, setEditingMessage] = useState<string>('');
  // 메시지 수정 상태, 수정중인 메시지의 messageId를 저장
  const [currentEditingMessageId, setCurrentEditingMessageId] = useState<string | null>(null);
  // 구독 여부에 따라 채팅 글자수 제한
  const { messageMaxLength } = useSubscription();

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

  // // 메시지 수정 상태로 만들기
  const handleUpdateMessageClick = ({ messageId, createdAt }: { messageId: string; createdAt: number }) => {
    if (currentEditingMessageId) return;
    // message.status를 editing으로 바꾸고 input창에 기존 메시지를 넣어준다.
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.messageId === messageId) {
          return {
            ...message,
            status: 'editing',
          };
        }
        return message;
      });
    });
    setCurrentEditingMessageId(messageId);
    socketRef.current?.emit('update_message_editing', { messageId, createdAt, roomName });
  };

  const hanedleEditingMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingMessage(e.target.value);
  };

  // 메시지 수정 완료
  const handleUpdateMessageKeyDown = ({ messageId, createdAt }: { messageId: string; createdAt: number }) => {
    if (editingMessage === '') return;
    // 낙관적 업데이트
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.messageId === messageId) {
          return {
            ...message,
            status: 'stable',
          };
        }
        return message;
      });
    });
    setCurrentEditingMessageId(null);

    socketRef.current?.emit('update_message_complete', { messageId, createdAt, message: editingMessage, roomName });
    setEditingMessage('');
  };

  // 메시지 수정 취소
  const handleUpdateMessageCancelClick = ({ messageId }: { messageId: string }) => {
    socketRef.current?.emit('update_message_cancel', { messageId, roomName });
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.messageId === messageId) {
          return {
            ...message,
            status: 'stable',
          };
        }
        return message;
      });
    });
    setCurrentEditingMessageId(null);
  };

  // 메시지 삭제
  const handleDeleteMessageClick = ({ messageId, createdAt }: { messageId: string; createdAt: number }) => {
    socketRef.current?.emit('delete_message', { messageId, createdAt, roomName });
  };

  // infinite scroll : InfiniteScrollTrigger에 닿으면 추가로 메시지를 가져온다.
  const infiniteScroll = async () => {
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

    // 메시지 수정 완료
    socketRef.current.on(
      'update_message_complete',
      ({ messageId, message }: { messageId: string; message: string }) => {
        console.log('update message data : ', messageId, message);
        setMessages((prevMessages) =>
          prevMessages.map((prevMessage) => {
            if (prevMessage.messageId === messageId) {
              return {
                ...prevMessage,
                message,
                status: 'stable',
              };
            }
            return prevMessage;
          }),
        );
      },
    );

    // 메시지 삭제
    socketRef.current.on('delete_message', (messageId: string) => {
      console.log('delete message data : ', messageId);
      setMessages((prevMessages) => prevMessages.filter((message) => message.messageId !== messageId));
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
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomName]);

  useEffect(() => {
    // 페이지 진입시, 채팅이 추가될 때마다 스크롤을 맨 아래로 내려준다
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
      <ChatContainer ref={chatContainerRef}>
        {/* flex: column-reverse상태 */}
        {/* 가장 아래쪽 */}
        <ChatMessages
          serverUserData={serverUserData}
          messages={messages}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          currentEditingMessageId={currentEditingMessageId}
          onUpdateMessageClick={handleUpdateMessageClick}
          onDeleteMessageClick={handleDeleteMessageClick}
          onUpdateMessageKeyDown={handleUpdateMessageKeyDown}
          onUpdateMessageCancelClick={handleUpdateMessageCancelClick}
          onEditingMessageChange={hanedleEditingMessageChange}
        />
        {/* 채팅 가져오고 더이상 가져올 채팅이 없으면 보여주게 하면될듯, 서버 데이터 필요 */}
        {isNoMoreMessages ? (
          <ChatChannelIntro>
            <ChannelName>{'# 채팅 채널1'}의 첫 시작 부분이에요</ChannelName>
            <CreationDate>생성일 : {'2024년 04월 11일'}</CreationDate>
          </ChatChannelIntro>
        ) : null}
        {lastKey ? (
          <>
            {/* LoadingSpinner */}
            <ChatLoadingSpinner ref={infiniteScrollTriggerRef}>
              <Spinner delay='0s' />
              <Spinner delay='0.2s' />
              <Spinner delay='0.4s' />
            </ChatLoadingSpinner>
          </>
        ) : null}
        {/* 가장 위쪽 */}
      </ChatContainer>
      {/* 채팅 input */}
      <ChatInputBox>
        <ChatInput
          type='text'
          placeholder={`${'#채팅방 이름'}에 메시지 보내기`}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSendMessageKeyDown}
          maxLength={messageMaxLength}
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;

const ChatContainer = styled.div`
  width: calc(100%-1px);
  height: 100%;

  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;

  margin-left: 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const ChatChannelIntro = styled.div`
  margin-top: 495px;
  padding-left: 20px;
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
  padding-bottom: 20px;

  position: relative;
  margin-left: 20px;
  margin-right: 20px;
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

const ChatLoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const Spinner = styled.div<{ delay: string }>`
  margin: 8px;
  width: 12px;
  height: 12px;
  background-color: var(--black_000000);
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  animation-delay: ${(props) => props.delay};
`;
