import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import SubscriptionButton from 'src/pages/payments/_components/RegistCardButton';
import {
  CancelOrderRequest,
  CancelOrderResponse,
  PaymentResponse,
  PlanData,
  PlansResponse,
  TempOrderRequest,
  TempOrderResponse,
} from 'src/pages/payments/_type/type';
import { useTempOrderStore, usePlanStore } from 'src/store/paymentStore';

export default function PaymentTest() {
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [isRecurring, setIsRecurring] = useState(false); // 정기 결제 체크박스 상태
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();
  const { setTempOrderId, setTempAmount } = useTempOrderStore();
  const { setPlanId, setPlanType, setAmount } = usePlanStore();
  const orderId = 'fXXIpV=cIcpO3tdLD2mvi1ONW'; // TODO: 임시

  const { data: plans, refetch: getAllPlans } = useQueryGet<PlansResponse>('getPlan', `${USER_URL.PLANS}/all`);
  const { data: paymentData } = useQueryGet<PaymentResponse>('getPayment', `${USER_URL.PAYMENTS}/${orderId}`, {
    enabled: !!orderId,
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
        alert('환불되었습니다.');
      },
    },
  );

  useEffect(() => {
    getAllPlans();
  }, []);

  const handlePlanButtonClick = (id: number) => {
    const selectedPlan = plans?.find((plan) => plan.id === id);

    if (selectedPlan) {
      setSelectedPlan(selectedPlan);
      return;
    }

    console.error('선택된 플랜이 없습니다.');
    throw new Error('선택된 플랜이 없습니다.');
  };

  const handlePayButtonClick = () => {
    if (!plans) throw new Error('플랜 정보가 없습니다.');

    if (!selectedPlan) return alert('선택된 플랜이 없습니다.');

    const tempOrder: TempOrderRequest = {
      orderName: selectedPlan.type,
      totalAmount: selectedPlan.price,
    };

    setPlanId(selectedPlan.id);
    setPlanType(selectedPlan.type);
    setAmount(selectedPlan.price);

    createTempOrder(tempOrder);
  };

  const handleCancelButtonClick = () => {
    if (!orderId) {
      console.error('주문번호를 찾을 수 없습니다.');
      return;
    }

    if (!paymentData) {
      console.error('결제 정보가 없습니다.');
      return;
    }

    if (!cancelReason) {
      alert('취소 사유를 선택해 주세요.');
      return;
    }

    const cancelData = {
      orderId: orderId,
      cancelReason,
    };

    cancelOrder(cancelData);
  };

  return (
    <div>
      <div>
        <h3>구독권 선택</h3>
        <button onClick={() => handlePlanButtonClick(1)}>베이직 30000원</button>
        <button onClick={() => handlePlanButtonClick(2)}>프리미엄 50000원</button>
      </div>
      <button onClick={handlePayButtonClick}>결제하기</button>

      <div>
        <h3>정기 결제</h3>
        <input
          type='checkbox'
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          id='recurringCheckbox'
        />
        <label htmlFor='recurringCheckbox'>정기 결제 활성화</label>
        <SubscriptionButton isRecurring={isRecurring} />
      </div>

      <h3>결제 취소</h3>
      <select
        id='cancelReason'
        name='cancelReason'
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
      >
        <option value=''>취소 사유를 선택해 주세요.</option>
        <option>단순 변심</option>
        <option>계정 탈퇴</option>
        <option>실수로 결제함</option>
      </select>
      <button onClick={handleCancelButtonClick}>결제 취소</button>
    </div>
  );
}
