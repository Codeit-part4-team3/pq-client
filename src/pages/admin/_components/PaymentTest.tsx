import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { PlanResponse, TempOrderRequest, TempOrderResponse } from 'src/pages/payments/_type/type';
import { useTempOrderStore, usePaymentStore } from 'src/store/paymentStore';

export default function PaymentTest() {
  const [plan, setPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const { setTempOrderId, setAmount } = useTempOrderStore();
  const { setPlanId } = usePaymentStore();

  const { data: planData } = useQueryGet<PlanResponse>('getPlan', `/user/v1/plans/${plan}`, {
    enabled: !!plan,
  });

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

  const handleSelectPlanClick = (id: number) => {
    setPlan(id);
    setPlanId(id);
  };

  const handlePaymentClick = () => {
    if (planData) {
      const paymentData: TempOrderRequest = {
        orderName: planData.type,
        totalAmount: planData.price,
      };

      console.log(paymentData);
      mutate(paymentData);
      return;
    }

    throw new Error('planData is not exist');
  };

  return (
    <div>
      <input />
      <input />
      <button onClick={() => handleSelectPlanClick(1)}>월간 구독 30000원</button>
      <button onClick={() => handleSelectPlanClick(2)}>연간 구독 50000원</button>
      <button onClick={handlePaymentClick}>결제하기</button>
    </div>
  );
}
