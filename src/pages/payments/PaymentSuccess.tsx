import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorResponse, ConfirmRequest, ConfirmResponse } from './_type/type';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import useUserStore from 'src/store/userStore';
import { UserInfo } from 'src/types/userType';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentData = {
    userId: Number(searchParams.get('userId')),
    planId: Number(searchParams.get('planId')),
    orderId: searchParams.get('orderId') ?? '',
    amount: Number(searchParams.get('amount')),
    paymentKey: searchParams.get('paymentKey') ?? '',
  };

  const { setUserInfo } = useUserStore();
  const { data: userData } = useQueryGet<UserInfo | null>('getUserData', `${USER_URL.USER}/me`);
  const { mutate } = useMutationPost<ConfirmResponse, ConfirmRequest>(`${USER_URL.PAYMENTS}/confirm`, {
    onSuccess: () => {
      navigate(
        `/payments/confirm-success?orderId=${paymentData.orderId}&amount=${paymentData.amount}&paymentKey=${paymentData.paymentKey}`,
      );
    },
    onError: (err: unknown) => {
      const error = err as ErrorResponse;
      navigate(`/payments/fail?code=${error.code}&message=${encodeURIComponent(error.message)}`);
    },
  });

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
    }
  }, [userData, setUserInfo]);

  const handlePaymentClick = () => {
    mutate(paymentData);
  };

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2>결제 정보가 확인되었습니다.</h2>
        <button onClick={handlePaymentClick}>이어서 결제하기</button>
      </div>
    </div>
  );
}
