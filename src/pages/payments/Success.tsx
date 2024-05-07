import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorResponse, ConfirmRequest, ConfirmResponse } from './_type/type';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutate, data } = useMutationPost<ConfirmResponse, ConfirmRequest>(`${USER_URL.PAYMENTS}/confirm`, {
    onSuccess: () => {
      console.log(data);
    },
    onError: (err: unknown) => {
      const error = err as ErrorResponse;
      const { code, message } = error;

      // 새로고침시 이미 결제가 된 경우 에러를 표시
      if (code === 'ALREADY_PROCESSED_PAYMENT') {
        return {
          props: { isError: true },
        };
      }

      navigate(`/payments/fail?code=${code}&message=${encodeURIComponent(message)}`);
    },
  });

  useEffect(() => {
    const userId = Number(searchParams.get('userId'));
    const planId = Number(searchParams.get('planId'));
    const orderId = searchParams.get('orderId');
    const amount = Number(searchParams.get('amount'));
    const paymentKey = searchParams.get('paymentKey');

    if (!orderId || !amount || !paymentKey || userId === 0 || planId === 0) {
      console.error('Invalid payment data', { userId, planId, orderId, amount, paymentKey });
      navigate('/payments/fail?code=INVALID_PAYMENT_DATA&message=결제 정보가 올바르지 않습니다.');
      return;
    }

    const payment = {
      userId: userId,
      planId: planId,
      orderId: orderId,
      amount: amount,
      paymentKey: paymentKey,
    };

    mutate(payment);
  }, [mutate, searchParams]);

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <img src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png' width='120' height='120' />
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get('amount')).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
      </div>
    </div>
  );
}
