import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { lastKey, MessageItem, ReadMessageItem, User } from 'src/pages/server/channel/chatChannel/_types/type';
import ChatMessages from 'src/pages/server/channel/chatChannel/_components/ChatMessages';
import { useSubscription } from 'src/hooks/useSubscription';
import { useParams } from 'react-router-dom';
import useUserStore from 'src/store/userStore';
import { useQueryGet } from 'src/apis/service/service';
import { LOCAL_STORAGE_ALRAM_KEY, SOCKET_COMMON, SOCKET_EMIT, SOCKET_ON } from 'src/constants/common';
import useSocket from 'src/hooks/useSocket';
import MessageLoadingSpinner from './_components/MessageLoadingSpinner';
import ChatInputBox from './_components/ChatInputBox';
import { ChannelData } from '../../_types/type';
import ChatChannelIntro from './_components/ChatChannelIntro';

/**@ToDo
 * 소켓 연결 / 소켓 이벤트 리스너 분리하는 로직 짜면 좋을듯
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

  // 채널 데이터
  const { data: channelData } = useQueryGet<ChannelData>(
    'getCurrentChannel',
    `/chat/v1/server/${serverId}/channel/${channelId}`,
    {
      staleTime: 5000,
      refetchInterval: 5000,
      enabled: !!userId,
    },
  );

  // 소켓
  const socketRef = useSocket();
  // 메시지 관련
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleSendMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (messageInputRef.current) {
      if (messageInputRef.current?.value === '') return;
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        socketRef.current?.emit(SOCKET_EMIT.SEND_MESSAGE, { message: e.currentTarget.value, roomName, userId });
        messageInputRef.current.value = '';
      }
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
    socketRef.current?.emit(SOCKET_EMIT.UPDATE_MESSAGE_EDITING, { messageId, createdAt, roomName });
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

    socketRef.current?.emit(SOCKET_EMIT.UPDATE_MESSAGE_COMPLETE, {
      messageId,
      createdAt,
      message: editingMessage,
      roomName,
    });
    setEditingMessage('');
    console.log('메시지 업데이트 완료');
  };

  // 메시지 수정 취소
  const handleUpdateMessageCancelClick = ({ messageId }: { messageId: string }) => {
    socketRef.current?.emit(SOCKET_EMIT.UPDATE_MESSAGE_CANCEL, { messageId, roomName });
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
    socketRef.current?.emit(SOCKET_EMIT.DELETE_MESSAGE, { messageId, createdAt, roomName });
  };

  // infinite scroll : InfiniteScrollTrigger에 닿으면 추가로 메시지를 가져온다.
  const infiniteScroll = async () => {
    if (infiniteScrollTriggerRef.current) {
      const infiniteScrollTriggerIo = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && infiniteScrollTriggerRef.current && lastKey) {
              socketRef.current?.emit(SOCKET_EMIT.MORE_MESSAGES, {
                roomName,
                userSocketId: socketRef.current?.id,
                lastKey,
              });

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
    if (!socketRef.current) return;

    socketRef.current.emit(SOCKET_EMIT.JOIN_CHAT_CHANNEL, roomName);

    socketRef.current.on(SOCKET_ON.JOIN_CHAT_CHANNEL_USER_JOIN, (socketId) => {
      console.log(socketId + 'is joined');
    });

    socketRef.current.on(
      SOCKET_ON.INITIAL_CHAT_MESSAGES,
      ({ initialMessages, lastKey }: { initialMessages: MessageItem[]; lastKey: lastKey }) => {
        console.log('initial messages data : ', initialMessages);
        setMessages([...initialMessages]);
        setLastKey(lastKey);

        // 알림표시 제거를 위한 localStroage update
        const alramMessageId = localStorage.getItem(`${LOCAL_STORAGE_ALRAM_KEY}:${channelId}`);
        initialMessages.forEach((msg) => {
          msg.messageId === alramMessageId && localStorage.removeItem(`${LOCAL_STORAGE_ALRAM_KEY}:${channelId}`);
        });

        // 초기 메시지 수신 후 마지막 메시지 읽음 처리
        if (socketRef.current) {
          console.log('[read-init] read on emit :', userId, roomName, initialMessages[0]?.messageId);
          socketRef.current.emit(SOCKET_COMMON.READ_MESSAGE, {
            messageId: initialMessages[0]?.messageId,
            roomName: roomName,
            userId,
          });
        }
      },
    );

    // 메시지 수신 후 읽음 처리
    socketRef.current.on(SOCKET_ON.RECEIVE_MESSAGE, (newMessage: MessageItem) => {
      console.log('[read] read on receive message');
      if (channelId === newMessage.channelId) {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);

        if (socketRef.current) {
          console.log('좋버그 EMIT_READ_MESSAGE');
          socketRef.current.emit(SOCKET_COMMON.READ_MESSAGE, {
            messageId: newMessage.messageId,
            roomName: roomName,
            userId,
          });
        }
      }
    });

    socketRef.current.on(
      SOCKET_COMMON.READ_MESSAGE,
      ({ prevMessageId, messageId, channelId: readChannelId }: ReadMessageItem) => {
        // 읽음 ui update
        if (channelId !== readChannelId) return;

        console.log('좋버그 EMIT_READ_MESSAGE');
        let disCountStart = false;
        let disCountEnd = false;
        setMessages((prevMessages) =>
          prevMessages.map((prevMessage) => {
            if (prevMessage.messageId === messageId) disCountStart = true;
            if (prevMessage.messageId === prevMessageId) disCountEnd = true;

            if (disCountEnd) {
              return prevMessage;
            }

            if (disCountStart) {
              return {
                ...prevMessage,
                notReadCount: prevMessage.notReadCount - 1,
              };
            }

            return prevMessage;
          }),
        );
      },
    );

    // 메시지 수정 완료
    socketRef.current.on(
      SOCKET_ON.UPDATE_MESSAGE_COMPLETE,
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
    socketRef.current.on(SOCKET_ON.DELETE_MESSAGE, (messageId: string) => {
      console.log('delete message data : ', messageId);
      setMessages((prevMessages) => prevMessages.filter((message) => message.messageId !== messageId));
    });

    // 메시지 알림

    // 인피니티 스크롤을 위한 이벤트
    socketRef.current.on(
      SOCKET_ON.MORE_MESSAGES,
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
        setMessages((prevMessages) => [
          ...prevMessages,
          ...moreMessages.map((msg) => {
            return {
              ...msg,
              notReadCount: 0,
            };
          }),
        ]);
        setLastKey(lastKey);
        if (isNoMoreMessages) {
          setIsNoMoreMessages(true);
        }
      },
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.off(SOCKET_ON.JOIN_CHAT_CHANNEL_USER_JOIN);
        socketRef.current.off(SOCKET_ON.INITIAL_CHAT_MESSAGES);
        socketRef.current.off(SOCKET_ON.RECEIVE_MESSAGE);
        socketRef.current.off(SOCKET_ON.UPDATE_MESSAGE_COMPLETE);
        socketRef.current.off(SOCKET_ON.DELETE_MESSAGE);
        socketRef.current.off(SOCKET_ON.MORE_MESSAGES);
        socketRef.current.off(SOCKET_COMMON.READ_MESSAGE);
      }
    };
  }, [roomName]);

  useEffect(() => {
    // 페이지 진입시, 채팅이 추가될 때마다 스크롤을 맨 아래로 내려준다
    if (messageInputRef.current?.value === '' && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        {/* 채팅 가져오고 더이상 가져올 채팅이 없으면 보여주게할 컴포넌트 */}
        {isNoMoreMessages ? <ChatChannelIntro channelData={channelData} /> : null}
        {/* 무한 스크롤 로딩스피너 */}
        {lastKey ? (
          <>
            <MessageLoadingSpinner infiniteScrollTriggerRef={infiniteScrollTriggerRef} />
          </>
        ) : null}
        {/* 가장 위쪽 */}
      </ChatContainer>
      {/* 채팅 input */}
      <ChatInputBox
        messageInputRef={messageInputRef}
        handleSendMessageKeyDown={handleSendMessageKeyDown}
        messageMaxLength={messageMaxLength}
        isClickedUtilityButton={isClickedUtilityButton}
        handleUiilityButtonClick={handleUiilityButtonClick}
      />
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
