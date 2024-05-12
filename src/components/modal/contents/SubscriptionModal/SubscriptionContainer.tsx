import { useState, Dispatch, SetStateAction, useCallback, memo, useEffect } from 'react';
import { ModalTitle } from '../../CommonStyles';
import { USER_URL } from 'src/constants/apiUrl';
import RegistCardButton from 'src/components/modal/contents/SubscriptionModal/RegistCardButton';
import { Plan, PlansResponse } from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';
import styled from 'styled-components';
import { useQueryGet } from 'src/apis/service/service';
import { SubscriptionResponse } from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';

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
  const [isEventActive, setIsEventActive] = useState(false);

  const { data: plans } = useQueryGet<PlansResponse>('getPlan', `${USER_URL.PLANS}/all`);
  const { data: event } = useQueryGet<{ amount: number }>('getEventAmount', `${USER_URL.PAYMENTS}/event`);

  useEffect(() => {
    if (event) {
      setIsEventActive(true);
    }
  }, [event]);

  const handlePlanButtonClick = useCallback(
    (id: number) => {
      if (plans) {
        const plan = plans.find((plan) => plan.id === id);
        setSelectedPlan(plan);
      }
    },
    [plans],
  );

  const isSubscribedPlan = useCallback(
    (planId: number) => {
      if (!subscription || !subscription.isActive) return false;
      return subscription.planId >= planId;
    },
    [subscription],
  );

  return (
    <>
      <ModalTitle>구독</ModalTitle>
      <SubscriptionBox>
        <PlanButtonContainer>
          {plans &&
            plans.map(
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
                    <br />
                    <br />₩{plan.price.toLocaleString()}
                  </PlanButton>
                ),
            )}
        </PlanButtonContainer>
        {plans?.[2] && isEventActive && (
          <PlanButton
            type='button'
            key={plans[2].id}
            onClick={() => handlePlanButtonClick(plans[2].id)}
            $isSelected={selectedPlan?.id === plans[2].id}
            $isSubscribed={isSubscribedPlan(plans[2].id)}
            disabled={isSubscribedPlan(plans[2].id)}
          >
            {isSubscribedPlan(plans[2].id) && <SubscribedToast>참여해주셔서 감사합니다!</SubscribedToast>}
            <PlanName>{plans[2].type.toUpperCase()}</PlanName>
            <br />
            <br />₩{plans[2].price.toLocaleString()}
          </PlanButton>
        )}
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

const PlanButton = memo(styled.button<{ $isSelected: boolean; $isSubscribed: boolean }>`
  width: 100%;
  height: 100%;
  padding: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
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
`);

const SubscribedToast = styled.div`
  padding: 5px 10px;
  width: 100%;
  position: absolute;
  font-size: 25px;
  font-weight: bold;
  color: #0d519b;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
`;

const PlanName = styled.span`
  font-size: 20px;
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
