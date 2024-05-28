import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useMutationDelete, useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { useEventWinner } from 'src/hooks/useEventWinner';
import useEventStore from 'src/store/eventStore';
import { UserInfo } from 'src/types/userType';

const SOCKET_SERVER_URL = 'https://api.pqsoft.net:3000';

export default function Event() {
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const { isEventActive } = useEventStore();
  const { eventAmount, refetchEventAmount, eventPayments, refetchEventPayments, participants, accumulatedAmount } =
    useEventWinner();

  // 당첨자 정보 조회
  const { data: userData } = useQueryGet<UserInfo | null>('getUserData', `${USER_URL.USER}/${winnerId}`, {
    enabled: !!winnerId,
  });

  // 이벤트 시작: 누적 금액 테이블 추가
  const { mutate: startEvent, isPending: isStarting } = useMutationPost(`${USER_URL.PAYMENTS}/event`, {
    onSuccess: () => {
      socketRef.current?.emit('update_event_status', true);
      socketRef.current?.emit('send_toast', `이벤트가 시작되었습니다!`);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 400) {
        alert('이미 이벤트가 진행 중입니다.');
        return;
      }
      alert(`${err?.message}`);
    },
  });

  // 이벤트 종료: 누적 금액 테이블 삭제
  const { mutate: endEvent, isPending: isEnding } = useMutationDelete(`${USER_URL.PAYMENTS}/event`, {
    onSuccess: () => {
      socketRef.current?.emit('update_event_status', false);
      socketRef.current?.emit('send_toast', `이벤트가 종료되었습니다.`);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 500) {
        alert('이벤트가 진행 중이 아닙니다.');
        return;
      }

      alert(`${err?.message}`);
    },
  });

  // 당첨자 선정
  const selectWinner = async () => {
    if (!participants || participants.length === 0) return alert('이벤트 참가자가 없습니다.');

    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedWinner = participants[randomIndex];

    setWinnerId(selectedWinner.userId);
    socketRef.current?.emit('send_toast', `${userData?.nickname} 님이 ${accumulatedAmount}원에 당첨되셨습니다!`);
  };

  const handleStartEvent = () => {
    if (isStarting) return;
    if (Array.isArray(eventAmount) && eventAmount.length > 0) {
      return alert('이미 이벤트가 진행 중입니다.');
    }
    startEvent({ amount: 0 });
  };

  const handleEndEvent = async () => {
    if (isEnding) return;
    await refetchEventAmount();
    await refetchEventPayments();
    endEvent();
  };

  useEffect(() => {
    if (isEventActive === false) {
      selectWinner();
    }
  }, [eventPayments, isEventActive]);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Event</h1>
      <button onClick={handleStartEvent}>이벤트 시작</button>
      <button onClick={handleEndEvent}>이벤트 종료</button>
    </div>
  );
}
