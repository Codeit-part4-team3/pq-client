import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorResponse, ConfirmRequest, ConfirmResponse } from './_type/type';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { usePaymentStore } from 'src/store/paymentStore';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const basicAuth = btoa(`${import.meta.env.VITE_APP_TOSS_SECRET_KEY}:`);
  const { planId } = usePaymentStore();

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
    console.log(basicAuth);
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      userId: 1,
      planId: planId,
      orderId: searchParams.get('orderId'),
      amount: Number(searchParams.get('amount')),
      paymentKey: searchParams.get('paymentKey'),
    };

    mutate(requestData);
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
