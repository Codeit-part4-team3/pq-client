import { loadTossPayments } from '@tosspayments/payment-sdk';
import { MouseEvent } from 'react';
import useUserStore from 'src/store/userStore';
import styled from 'styled-components';

interface RegistCardButtonProps {
  isRecurring: boolean;
}

export default function RegistCardButton({ isRecurring }: RegistCardButtonProps) {
  const { userInfo } = useUserStore();
  const clientKey = import.meta.env.VITE_APP_TOSS_REGIST_KEY;
  const customerKey = userInfo.email;

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    loadTossPayments(clientKey).then((tossPayments) => {
      tossPayments
        .requestBillingAuth('카드', {
          customerKey,
          successUrl: `${window.location.origin}/regist-success?userId=${userInfo.id}`,
          failUrl: `${window.location.origin}/regist-fail`,
        })
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            throw new Error('사용자가 등록을 취소했습니다.');
          }
          if (error.code === 'INVALID_CARD_COMPANY') {
            throw new Error('지원하지 않는 카드사입니다.');
          }
          throw new Error('카드 등록에 실패했습니다. 카드 정보를 다시 확인해주세요.');
        });
    });
  };

  return (
    <RegistCardButtonContainer isVisible={isRecurring}>
      <Button onClick={(e) => handleButtonClick(e)} disabled={!isRecurring}>
        결제 수단 등록
      </Button>
    </RegistCardButtonContainer>
  );
}

const RegistCardButtonContainer = styled.div<{ isVisible: boolean }>`
  overflow: hidden;
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  max-height: ${(props) => (props.isVisible ? '100px' : '0px')};
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
`;

const Button = styled.button`
  width: 30%;
  padding: 13px;
  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  border: 1px solid var(--text_gray);
  background: #fff;

  &:hover {
    cursor: pointer;
    background: var(--text_gray);
  }
`;
