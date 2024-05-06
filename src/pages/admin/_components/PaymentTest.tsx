import { useNavigate } from 'react-router-dom';
import { useMutationPost } from 'src/apis/service/service';
import { TempOrderRequest, TempOrderResponse } from 'src/pages/payments/_type/type';
import usePaymentStore from 'src/store/paymentStore';

export default function PaymentTest() {
  const navigate = useNavigate();
  const { setTempOrderId, setAmount } = usePaymentStore();

  const { mutate } = useMutationPost('/user/v1/payments/temp-order', {
    onError: () => {
      // const axiosError = error as AxiosError;
      // const status = axiosError?.response?.status;

      alert('결제 실패');
    },

    onSuccess: (data: TempOrderResponse) => {
      if (!data?.tempOrderId) {
        alert('결제 실패');
        throw new Error('tempOrderId is not exist');
      }

      setTempOrderId(data?.tempOrderId);
      setAmount(data?.totalAmount);
      navigate('/payments');
    },
  });

  const handleMonthPaymentClick = () => {
    const paymentData: TempOrderRequest = {
      orderName: '프리미엄 월별 구독권',
      pointAmount: 0,
      couponAmount: 0,
      totalAmount: 300,
    };

    mutate(paymentData);
  };

  const handleYearPaymentClick = () => {
    const paymentData: TempOrderRequest = {
      orderName: '프리미엄 연간 구독권',
      pointAmount: 0,
      couponAmount: 0,
      totalAmount: 500,
    };

    mutate(paymentData);
  };

  return (
    <div>
      <input />
      <input />
      <button onClick={handleMonthPaymentClick}>월별 결제 300원</button>
      <button onClick={handleYearPaymentClick}>연간 결제 500원</button>
    </div>
  );
}
