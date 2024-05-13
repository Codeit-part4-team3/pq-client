import { FormEventHandler, useState } from 'react';
import { ModalContainer, ModalForm } from '../CommonStyles';
import Modal from '../modal';
import { ModalProps } from 'src/types/modalType';
import { USER_URL } from 'src/constants/apiUrl';
import { useNavigate } from 'react-router-dom';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import {
  CancelOrderRequest,
  CancelOrderResponse,
  Plan,
  SubscriptionResponse,
  TempOrderRequest,
  TempOrderResponse,
} from 'src/types/subscriptionType';
import { useTempOrderStore, usePlanStore } from 'src/store/paymentStore';
import SubscriptionContainer from './SubscriptionModal/SubscriptionContainer';
import CancelContainer from './SubscriptionModal/CancelContainer';
import ModalButtons from '../button/ModalButtons';
import { PaymentResponse } from 'src/pages/payments/_type/type';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ERROR_MESSAGES } from 'src/constants/error';

export default function SubscriptionModal({ closeModal, isOpen }: ModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>(undefined);
  const [isCancelSelected, setIsCancelSelected] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentResponse | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setTempOrderId, setTempAmount } = useTempOrderStore();
  const { setPlanId, setPlanType, setAmount } = usePlanStore();

  const { data: subscription } = useQueryGet<SubscriptionResponse>(
    'getSubscription',
    `${USER_URL.PAYMENTS}/subscription`,
  );

  const { mutate: createTempOrder, isPending: isCreating } = useMutationPost<TempOrderResponse, TempOrderRequest>(
    `${USER_URL.PAYMENTS}/temp-order`,
    {
      onError: () => {
        alert(ERROR_MESSAGES.PAYMENT.FAILED);
        throw new Error(ERROR_MESSAGES.TEMP_ORDER.FAILED);
      },

      onSuccess: (data: TempOrderResponse) => {
        if (!data?.tempOrderId) {
          alert(ERROR_MESSAGES.PAYMENT.FAILED);
          throw new Error(ERROR_MESSAGES.TEMP_ORDER.NO_TEMP_ORDER_ID);
        }

        setTempOrderId(data?.tempOrderId);
        setTempAmount(data?.totalAmount);
        navigate('/payments');
      },
    },
  );

  const { mutate: cancelOrder, isPending: isCanceling } = useMutationPost<CancelOrderResponse, CancelOrderRequest>(
    `${USER_URL.PAYMENTS}/cancel`,
    {
      onError: (err: unknown) => {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data?.message || 'Unknown error occurred';
          return alert(`환불 실패: ${message}`);
        }

        alert(ERROR_MESSAGES.PAYMENT.CANCEL_FAILED);
        console.error(err);
      },

      onSuccess: () => {
        alert(ERROR_MESSAGES.PAYMENT.CANCEL_SUCCESS);
        queryClient.invalidateQueries({ queryKey: ['getAllPayments'], exact: true });
        queryClient.invalidateQueries({ queryKey: ['getSubscription'], exact: true });
      },
    },
  );

  const handleSubscribe = () => {
    if (isCreating) return;
    if (!selectedPlan) return alert(ERROR_MESSAGES.PAYMENT.NO_SELECTED_PLAN);

    const tempOrder: TempOrderRequest = {
      orderName: selectedPlan.type,
      totalAmount: selectedPlan.price,
    };

    createTempOrder(tempOrder);

    setPlanId(selectedPlan.id);
    setPlanType(selectedPlan.type);
    setAmount(selectedPlan.price);
  };

  const handleCancel = () => {
    if (isCanceling) return;
    if (!selectedPayment) return alert(ERROR_MESSAGES.PAYMENT.SELECT_PAYMENT);
    if (!selectedPayment.orderId) return console.error(ERROR_MESSAGES.PAYMENT.NO_ORDER_ID);
    if (subscription && selectedPayment.planId < subscription?.planId)
      return alert(ERROR_MESSAGES.PAYMENT.REFUND_NOT_ALLOWED);

    const cancelData = {
      orderId: selectedPayment.orderId,
      cancelReason,
    };

    cancelOrder(cancelData);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (isCancelSelected) {
      handleCancel();
      return;
    }

    handleSubscribe();
  };

  const renderContent = () => {
    if (isCancelSelected) {
      return (
        <>
          <CancelContainer
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            cancelReason={cancelReason}
            setCancelReason={setCancelReason}
          />
          <ModalButtons
            ctaText='환불 신청'
            onClick={onSubmit}
            closeClick={() => {
              setSelectedPlan(undefined);
              setIsCancelSelected(false);
              setSelectedPayment(null);
            }}
            $bgColor='red'
            $hoverColor='#BA1A1A'
          />
        </>
      );
    }

    return (
      <>
        <SubscriptionContainer
          subscription={subscription}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          setIsCancelSelected={setIsCancelSelected}
        />
        <ModalButtons
          ctaText='구독하기'
          closeClick={() => {
            setSelectedPlan(undefined);
            closeModal();
          }}
        />
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedPlan(undefined);
        closeModal();
      }}
    >
      <ModalContainer>
        <ModalForm onSubmit={onSubmit}>{renderContent()}</ModalForm>
      </ModalContainer>
    </Modal>
  );
}
