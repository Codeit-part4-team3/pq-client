import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import SubscriptionButton from 'src/pages/payments/_components/RegistCardButton';
import {
  CancelOrderRequest,
  CancelOrderResponse,
  PlanResponse,
  TempOrderRequest,
  TempOrderResponse,
} from 'src/pages/payments/_type/type';
import { useTempOrderStore, usePlanStore } from 'src/store/paymentStore';

export default function PaymentTest() {
  const [plan, setPlan] = useState<number | null>(null);
  const [isRecurring, setIsRecurring] = useState(false); // 정기 결제 체크박스 상태
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();
  const { setTempOrderId, setTempAmount } = useTempOrderStore();
  const { setPlanId, setPlanType, setAmount } = usePlanStore();
  const paymentId = 3; // 임시

  const { data: planData, refetch } = useQueryGet<PlanResponse>('getPlan', `${USER_URL.PLANS}/${plan}`, {
    enabled: !!plan,
  });
  const { data: paymentData } = useQueryGet<PlanResponse>('getPayment', `${USER_URL.PAYMENTS}/${paymentId}`, {
    enabled: !!paymentId,
  });

  const { mutate: createTempOrder } = useMutationPost<TempOrderResponse, TempOrderRequest>(
    `${USER_URL.PAYMENTS}/temp-order`,
    {
      onError: () => {
        alert('결제에 실패했습니다. 잠시 후 다시 시도해주세요.');
        throw new Error('가주문 요청 실패');
      },

      onSuccess: (data: TempOrderResponse) => {
        if (!data?.tempOrderId) {
          alert('결제에 실패했습니다. 잠시 후 다시 시도해주세요.');
          throw new Error('가주문 ID가 없습니다.');
        }

        setTempOrderId(data?.tempOrderId);
        setTempAmount(data?.totalAmount);
        navigate('/payments');
      },
    },
  );

  const { mutate: cancelOrder } = useMutationPost<CancelOrderResponse, CancelOrderRequest>(
    `${USER_URL.PAYMENTS}/cancel`,
    {
      onError: () => {
        alert('결제 취소에 실패했습니다. 잠시 후 다시 시도해주세요.');
        throw new Error('결제 취소 요청 실패');
      },

      onSuccess: () => {
        alert('결제가 취소되었습니다.');
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [plan]);

  const handleSelectPlanClick = (id: number) => {
    setPlan(id);
    setPlanId(id);
  };

  const handlePaymentClick = () => {
    if (!planData) throw new Error('플랜 정보가 없습니다.');

    const tempOrder: TempOrderRequest = {
      orderName: planData.type,
      totalAmount: planData.price,
    };

    setPlanType(planData.type);
    setAmount(planData.price);

    createTempOrder(tempOrder);
  };

  const handleCancelClick = () => {
    if (!paymentData) throw new Error('결제 정보가 없습니다.');

    if (!cancelReason) {
      alert('취소 사유를 선택해 주세요.');
      return;
    }

    const cancelData = {
      paymentId: paymentData.id,
      cancelReason,
    };

    cancelOrder(cancelData);
  };

  return (
    <div>
      <button onClick={() => handleSelectPlanClick(1)}>베이직 30000원</button>
      <button onClick={() => handleSelectPlanClick(2)}>프리미엄 50000원</button>
      <input
        type='checkbox'
        checked={isRecurring}
        onChange={(e) => setIsRecurring(e.target.checked)}
        id='recurringCheckbox'
      />
      <label htmlFor='recurringCheckbox'>정기 결제 활성화</label>
      <SubscriptionButton isRecurring={isRecurring} />
      <button onClick={handlePaymentClick}>결제하기</button>

      <select
        id='cancelReason'
        name='cancelReason'
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
      >
        <option value=''>취소 사유를 선택해 주세요.</option>
        <option>단순 변심</option>
        <option>불량</option>
      </select>
      <button onClick={handleCancelClick}>결제 취소</button>
    </div>
  );
}
