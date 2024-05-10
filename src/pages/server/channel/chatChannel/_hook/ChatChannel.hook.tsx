import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from 'src/store/userStore';
import { lastKey, MessageItem, User } from '../_types/type';
import { useSocketConnect } from 'src/hooks/useSocketConnect';
import { useSubscription } from 'src/hooks/useSubscription';
import { useQueryGet } from 'src/apis/service/service';

export default function useChatChannel() {
  // 유저, 서버, 채널 데이터
  const { userInfo } = useUserStore();
  const { id: userId } = userInfo;
  const { serverId, channelId } = useParams();
  const roomName = channelId;

  // api 호출
  const { data: serverUserData } = useQueryGet<User[]>('getServerAllUser', `/chat/v1/server/${serverId}/users`, {
    staleTime: 5000,
    refetchInterval: 5000,
    enabled: !!userId,
  });

  // 소켓
  const { socketRef } = useSocketConnect();
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
      if (messageInputRef.current.value === '') return;
      if (e.key === 'Enter') {
        socketRef.current?.emit('send_message', { message: e.currentTarget.value, roomName, userId });
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
    socketRef.current?.emit('update_message_editing', { messageId, createdAt, roomName });
  };

  const handleEditingMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log('메시지 업데이트 완료');
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
      const Io = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && infiniteScrollTriggerRef.current && lastKey) {
              socketRef.current?.emit('more_messages', { roomName, userSocketId: socketRef.current?.id, lastKey });

              Io.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );

      Io.observe(infiniteScrollTriggerRef.current);
    }
  };

  useEffect(() => {
    if (!socketRef.current) return;
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
  }, [roomName, socketRef, userId]);

  useEffect(() => {
    // 페이지 진입시, 채팅이 추가될 때마다 스크롤을 맨 아래로 내려준다
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    infiniteScroll();
    // eslint-disable-next-line
  }, [lastKey]);

  return {
    serverUserData,
    messages,
    messageInputRef,
    isNoMoreMessages,
    chatContainerRef,
    infiniteScrollTriggerRef,
    lastKey,
    editingMessage,
    setEditingMessage,
    currentEditingMessageId,
    messageMaxLength,
    isClickedUtilityButton,
    handleUiilityButtonClick,
    handleSendMessageKeyDown,
    handleUpdateMessageClick,
    handleDeleteMessageClick,
    handleUpdateMessageKeyDown,
    handleUpdateMessageCancelClick,
    handleEditingMessageChange,
  };
}
