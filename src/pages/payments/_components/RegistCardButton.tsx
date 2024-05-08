import { loadTossPayments } from '@tosspayments/payment-sdk';
import useUserStore from 'src/store/userStore';

interface RegistCardButtonProps {
  isRecurring: boolean;
}

export default function RegistCardButton({ isRecurring }: RegistCardButtonProps) {
  const { userInfo } = useUserStore();
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = userInfo.email;
  const subscribe = () => {
    loadTossPayments(clientKey).then((tossPayments) => {
      tossPayments
        .requestBillingAuth('카드', {
          customerKey,
          successUrl: `${window.location.origin}/payments/regist-success?userId=${userInfo.id}`,
          failUrl: `${window.location.origin}/payments/regist-fail`,
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
    <button onClick={subscribe} disabled={!isRecurring}>
      결제 수단 등록
    </button>
  );
}
