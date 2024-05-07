import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { PlanResponse, TempOrderRequest, TempOrderResponse } from 'src/pages/payments/_type/type';
import { useTempOrderStore, usePlanStore } from 'src/store/paymentStore';

export default function PaymentTest() {
  const [plan, setPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const { setTempOrderId, setTempAmount } = useTempOrderStore();
  const { setPlanId, setPlanType, setAmount } = usePlanStore();

  const { data: planData } = useQueryGet<PlanResponse>('getPlan', `${USER_URL.PLANS}/${plan}`, {
    enabled: !!plan,
  });

  const { mutate } = useMutationPost(`${USER_URL.PAYMENTS}/temp-order`, {
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
      setTempAmount(data?.totalAmount);
      navigate('/payments');
    },
  });

  const handleSelectPlanClick = (id: number) => {
    setPlan(id);
    setPlanId(id);
  };

  const handlePaymentClick = () => {
    if (planData) {
      const tempOrder: TempOrderRequest = {
        orderName: planData.type,
        totalAmount: planData.price,
      };

      setPlanType(planData.type);
      setAmount(planData.price);

      console.log(tempOrder);
      mutate(tempOrder);
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
