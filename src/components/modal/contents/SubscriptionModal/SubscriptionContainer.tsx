import { useState, Dispatch, SetStateAction, useCallback } from 'react';
import { ModalTitle } from '../../CommonStyles';
import { USER_URL } from 'src/constants/apiUrl';
import RegistCardButton from 'src/components/modal/contents/SubscriptionModal/RegistCardButton';
import { Plan, PlansResponse } from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';
import styled from 'styled-components';
import { useQueryGet } from 'src/apis/service/service';
import { SubscriptionResponse } from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';
import { PLAN } from 'src/constants/plan';
import { useEventWinner } from 'src/hooks/useEventWinner';

interface SubscriptionContainerProps {
  subscription: SubscriptionResponse | undefined;
  selectedPlan: Plan | undefined;
  setSelectedPlan: Dispatch<SetStateAction<Plan | undefined>>;
  setIsCancelSelected: Dispatch<SetStateAction<boolean>>;
}

export default function SubscriptionContainer({
  subscription,
  selectedPlan,
  setSelectedPlan,
  setIsCancelSelected,
}: SubscriptionContainerProps) {
  const [isRecurring, setIsRecurring] = useState(false);
  const { eventAmount, participants } = useEventWinner();
  const { BASIC, PREMIUM } = PLAN;
  const maxLength = [BASIC.maxLength, PREMIUM.maxLength];

  const { data: plans } = useQueryGet<PlansResponse>('getPlan', `${USER_URL.PLANS}/all`);
  const event = plans?.[2];

  const handlePlanButtonClick = useCallback(
    (id: number) => {
      if (plans) {
        const plan = plans.find((plan) => plan.id === id);
        setSelectedPlan(plan);
      }
    },
    [plans, setSelectedPlan],
  );

  const isSubscribedPlan = (planId: number) => {
    if (!subscription || !subscription.isActive) return false;
    return subscription.planId >= planId;
  };

  return (
    <>
      <ModalTitle>구독</ModalTitle>
      <SubscriptionBox>
        {/* 플랜 */}
        <PlanButtonContainer>
          {plans?.map(
            (plan, index) =>
              index !== 2 && (
                <PlanButton
                  type='button'
                  key={plan.id}
                  onClick={() => handlePlanButtonClick(plan.id)}
                  $isSelected={selectedPlan?.id === plan.id}
                  $isSubscribed={isSubscribedPlan(plan.id)}
                  disabled={isSubscribedPlan(plan.id)}
                >
                  {isSubscribedPlan(plan.id) && <SubscribedToast>Subscribed</SubscribedToast>}
                  <PlanName>{plan.type.toUpperCase()}</PlanName>
                  <span>
                    최대 글자 수 <br />
                    {maxLength[index]}자
                  </span>
                  <PlanPrice>₩{plan.price.toLocaleString()}</PlanPrice>
                </PlanButton>
              ),
          )}
        </PlanButtonContainer>
        {/* 이벤트 */}
        {event && eventAmount && (
          <EventButton
            type='button'
            key={event.id}
            onClick={() => handlePlanButtonClick(event?.id)}
            $isSelected={selectedPlan?.id === event.id}
            $isSubscribed={isSubscribedPlan(event.id)}
            disabled={isSubscribedPlan(event.id)}
          >
            {isSubscribedPlan(event.id) && <SubscribedToast>참여해주셔서 감사합니다!</SubscribedToast>}
            <EventDescription>
              <PlanName>{event.type.toUpperCase()}</PlanName>
              <p>지금 바로 당첨금의 주인공이 되어보세요!</p>
              <PlanPrice>₩{event.price.toLocaleString()}</PlanPrice>
            </EventDescription>

            <EventProgress>
              <EventAccumulated>
                ₩{eventAmount.amount}
                <CoinImg src='/images/coin.gif' alt='coin' />
              </EventAccumulated>
              <span>{participants?.length}명 참여 중</span>
            </EventProgress>
          </EventButton>
        )}
        {/* 환불 */}
        <SubscriptionCancelButton onClick={() => setIsCancelSelected(true)}>구독 취소 & 환불</SubscriptionCancelButton>
      </SubscriptionBox>

      <SettingsBox>
        <RegularPaymentBox>
          <RegularPaymentLabel htmlFor='recurringCheckbox'>
            {' '}
            <RegularPaymentInput
              type='checkbox'
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              id='recurringCheckbox'
            />
            정기 구독 활성화
          </RegularPaymentLabel>
          <RegistCardButton isRecurring={isRecurring} />
        </RegularPaymentBox>
      </SettingsBox>
    </>
  );
}

const SubscriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlanButtonContainer = styled.div`
  height: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

const PlanButton = styled.button<{ $isSelected: boolean; $isSubscribed: boolean }>`
  width: 100%;
  height: 100%;
  padding: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  position: relative;
  font-size: 16px;
  border-radius: 10px;
  color: #000;
  background-color: ${(props) => (props.$isSelected ? '#e8f4ff' : '#fff')};
  border: 1px solid ${(props) => (props.$isSelected ? '#007BFF' : 'var(--text_gray)')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  opacity: ${(props) => (props.$isSubscribed ? '0.5' : '1')};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    cursor: ${(props) => (props.$isSubscribed ? 'default' : 'pointer')};
  }
`;

const EventButton = styled(PlanButton)`
  flex-direction: row;
  justify-content: center;
  position: relative;
  color: #fff;
  background: ${(props) =>
    props.$isSelected ? 'linear-gradient(135deg, #7e93fa, #fa8199)' : 'linear-gradient(135deg, #6a82fb, #fc5c7d)'};
  border: 1px solid ${(props) => (props.$isSelected ? '#007BFF' : 'var(--text_gray)')};
`;

const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const EventProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const EventAccumulated = styled.span`
  display: flex;
  gap: 4px;
  font-size: 20px;
`;

const CoinImg = styled.img`
  width: 20px;
  height: 20px;
`;

const SubscribedToast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  width: 100%;
  height: 130px;
  position: absolute;
  font-size: 25px;
  font-weight: bold;
  color: #0d519b;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
`;

const PlanName = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const PlanPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const SettingsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RegularPaymentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegularPaymentLabel = styled.label`
  width: 30%;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
`;

const RegularPaymentInput = styled.input`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
`;

const SubscriptionCancelButton = styled.span`
  width: 20%;
  margin: 4px 0 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    background: var(--text_gray);
  }
`;
