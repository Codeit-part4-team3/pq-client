import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { SOCKET_EMIT } from 'src/constants/common';
import { useSubscription } from 'src/hooks/useSubscription';
import useSocketStore from 'src/store/socketStore';
import useUserStore from 'src/store/userStore';

export default function useChatInputBox() {
  // 유저, 서버, 채널 데이터
  const { userInfo } = useUserStore();
  const { id: userId } = userInfo;
  const { channelId } = useParams();
  const roomName = channelId;

  // 소켓
  const { socket } = useSocketStore();
  const socketRef = useRef<Socket | null>(null);

  // 메시지 입력창
  const InputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (InputRef.current) {
      if (InputRef.current?.value === '') return;
      if (e.nativeEvent.isComposing) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        socketRef.current?.emit(SOCKET_EMIT.SEND_MESSAGE, { message: e.currentTarget.value, roomName, userId });
        InputRef.current.value = '';
      }
    }
  };

  // 구독 여부에 따라 채팅 글자수 제한
  const { messageMaxLength } = useSubscription();

  // 소켓 연결
  useEffect(() => {
    if (socket) {
      socketRef.current = socket;
    }
  }, [socket]);

  return {
    InputRef,
    handleKeyDown,
    messageMaxLength,
  };
}
