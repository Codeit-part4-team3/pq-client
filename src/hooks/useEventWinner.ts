import { useEffect, useState } from 'react';
import { useQueryGet } from 'src/apis/service/service';
import { EventResponse } from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';
import { USER_URL } from 'src/constants/apiUrl';
import { PLAN } from 'src/constants/plan';
import { EventPaymentsResponse } from 'src/pages/payments/_type/type';
import useEventStore from 'src/store/eventStore';

export const useEventWinner = () => {
  const [participants, setParticipants] = useState<EventPaymentsResponse>(null);
  const [accumulatedAmount, setAccumulatedAmount] = useState<number>(0);
  const { isEventActive } = useEventStore();

  const { data: eventAmount, refetch: refetchEventAmount } = useQueryGet<EventResponse>(
    'getEventAmount',
    `${USER_URL.PAYMENTS}/event`,
  );
  const { data: eventPayments, refetch: refetchEventPayments } = useQueryGet<EventPaymentsResponse>(
    'getEventPayments',
    `${USER_URL.PAYMENTS}/plan/${PLAN.EVENT.id}`,
  );

  useEffect(() => {
    if (eventAmount) {
      setAccumulatedAmount(eventAmount.amount);
    }
  }, [eventAmount]);

  useEffect(() => {
    if (isEventActive) {
      refetchEventAmount();
    }
  }, [isEventActive, refetchEventAmount]);

  useEffect(() => {
    if (eventPayments && eventAmount) {
      const filteredParticipants = eventPayments.filter((payment) => {
        return new Date(payment.createdAt) > new Date(eventAmount.createdAt) && payment.status === 'DONE';
      });
      setParticipants(filteredParticipants);
    }
  }, [eventAmount, eventPayments]);

  return { eventAmount, refetchEventAmount, eventPayments, refetchEventPayments, participants, accumulatedAmount };
};
