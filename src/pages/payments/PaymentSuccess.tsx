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
  const { setUserInfo } = useUserStore();
  const { data: userData } = useQueryGet<UserInfo | null>('getUserData', `${USER_URL.USER}/me`);
  const { mutate } = useMutationPost<ConfirmResponse, ConfirmRequest>(`${USER_URL.PAYMENTS}/confirm`, {
    onSuccess: () => {
      navigate('/payments/confirm-success');
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
    const paymentData = {
      userId: Number(searchParams.get('userId')),
      planId: Number(searchParams.get('planId')),
      orderId: searchParams.get('orderId') ?? '',
      amount: Number(searchParams.get('amount')),
      paymentKey: searchParams.get('paymentKey') ?? '',
    };

    mutate(paymentData);
  };

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2>결제 정보가 확인되었습니다.</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get('amount')).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
        <button onClick={handlePaymentClick}>이어서 결제하기</button>
      </div>
    </div>
  );
}
