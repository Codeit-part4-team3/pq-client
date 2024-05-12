import { useEffect, useState } from 'react';
import { useMutationDelete, useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { PLAN } from 'src/constants/plan';
import { useToast } from 'src/context/toast';
import { EventPaymentsResponse } from 'src/pages/payments/_type/type';
import { useEventWinnerStore } from 'src/store/paymentStore';
import { UserInfo } from 'src/types/userType';

interface EventResponseBody {
  id: number;
  amount: number;
}

type EventResponse = EventResponseBody | null;

export default function Event() {
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const { setEventWinner, removeEventWinner } = useEventWinnerStore();
  const { addToast } = useToast();

  // 누적 금액 조회
  const { data: eventAmount } = useQueryGet<EventResponse>('getEventAmount', `${USER_URL.PAYMENTS}/event`);
  // 이벤트 결제 내역 조회(참가자 조회용)
  const { data: eventPayments } = useQueryGet<EventPaymentsResponse>(
    'getEventPayments',
    `${USER_URL.PAYMENTS}/plan/${PLAN.EVENT.id}`,
  );
  // 당첨자 정보 조회
  const { data: userData } = useQueryGet<UserInfo | null>('getUserData', `${USER_URL.USER}/${winnerId}`, {
    enabled: !!winnerId,
  });

  // 누적 금액 테이블 추가
  const { mutate: startEvent, isPending: isStarting } = useMutationPost(`${USER_URL.PAYMENTS}/event`, {
    onSuccess: () => alert('이벤트가 시작되었습니다.'),
    onError: () => alert('이벤트 시작에 실패했습니다.'),
  });

  // 이벤트 종료: 누적 금액 테이블 삭제
  const { mutate: endEvent, isPending: isEnding } = useMutationDelete(`${USER_URL.PAYMENTS}/event`, {
    onSuccess: () => alert('이벤트가 종료되었습니다.'),
    onError: () => alert('이벤트 종료에 실패했습니다.'),
  });

  // 당첨자 선정
  const selectWinner = () => {
    if (!eventPayments) return alert('이벤트 참가자가 없습니다.');

    const randomIndex = Math.floor(Math.random() * eventPayments.length);
    const selectedWinner = eventPayments[randomIndex];

    setWinnerId(selectedWinner.userId);
    setEventWinner(userData?.nickname);
    addToast(`${userData?.nickname} 님이 당첨되었습니다.`);
  };

  const handleStartEvent = () => {
    if (isStarting) return;
    if (Array.isArray(eventAmount) && eventAmount.length > 0) {
      return alert('이미 이벤트가 진행 중입니다.');
    }

    removeEventWinner();
    startEvent({ amount: 0 });
  };

  const handleEndEvent = () => {
    if (isEnding) return;

    selectWinner();
    endEvent();
  };

  useEffect(() => {
    console.log(eventAmount);
  }, [eventAmount]);

  return (
    <div>
      <h1>Event</h1>
      <button onClick={handleStartEvent}>이벤트 시작</button>
      <button onClick={handleEndEvent}>이벤트 종료</button>
    </div>
  );
}
