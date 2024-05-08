import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorResponse, RegistCardResponse, RegistCardRequest } from './_type/type';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';

export function RegistCardSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutate, data } = useMutationPost<RegistCardResponse, RegistCardRequest>(`${USER_URL.PAYMENTS}/method`, {
    onSuccess: () => {
      console.log(data);
    },
    onError: (err: unknown) => {
      const error = err as ErrorResponse;
      const { code, message } = error;
      navigate(`/payments/regist-fail?code=${code}&message=${encodeURIComponent(message)}`);
    },
  });

  useEffect(() => {
    const userId = Number(searchParams.get('userId'));
    const customerKey = searchParams.get('customerKey');
    const authKey = searchParams.get('authKey');

    if (!customerKey || !authKey) {
      console.error('Invalid payment data', { customerKey, authKey });
      navigate('/payments/regist-fail?code=INVALID_SUBSCRIPTION_DATA&message=카드 등록 정보가 올바르지 않습니다.');
      return;
    }

    const subscription = {
      userId,
      customerKey,
      authKey,
    };

    mutate(subscription);
  }, [mutate, searchParams]);

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <img src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png' width='120' height='120' />
        <h2>카드 등록 성공</h2>
      </div>
    </div>
  );
}
