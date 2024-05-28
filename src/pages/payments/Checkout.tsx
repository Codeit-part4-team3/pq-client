import { useEffect, useRef, useState } from 'react';
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import useUserStore from 'src/store/userStore';
import { usePlanStore, useTempOrderStore } from 'src/store/paymentStore';
import { PaymentMethodsWidget } from './_type/type';
import styled from 'styled-components';
import { CtaButton } from 'src/GlobalStyles';
import { ERROR_MESSAGES } from 'src/constants/error';
import { useNavigate } from 'react-router-dom';

const widgetClientKey = import.meta.env.VITE_APP_TOSS_CLIENT_KEY;

/**
 * 토스 페이먼츠 결제 요청
 *
 * 공식 문서
 * https://docs.tosspayments.com/guides/learn/payment-flow
 * https://docs.tosspayments.com/guides/payment-widget/integration
 */
export default function Checkout() {
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget | null>(null);
  const { userInfo } = useUserStore();
  const { tempOrderId } = useTempOrderStore();
  const { planId, amount, planType } = usePlanStore();
  const navigate = useNavigate();

  // 결제 위젯 불러오기
  useEffect(() => {
    if (!userInfo.email) {
      console.error(ERROR_MESSAGES.PAYMENT.NO_USER_INFO);
      navigate(`/order-fail?code=404&message=데이터가 유실되었습니다. 다시 시도해주세요.`);
      return;
    }

    const customerKey = userInfo.email;
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error('결제 위젯 불러오기 실패:', error);
      }
    };

    fetchPaymentWidget();
  }, [userInfo.email]);

  // 결제 수단 선택 UI, 이용약관 UI 렌더링
  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // 결제 수단 선택 UI 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: amount },
      { variantKey: 'DEFAULT' },
    );

    // 이용약관 UI 렌더링
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, amount]);

  // 결제 금액 업데이트
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(amount);
  }, [amount]);

  // 결제 요청
  const handlePaymentRequest = async () => {
    const paymentRequestData = {
      orderId: tempOrderId,
      orderName: planType,
      customerEmail: userInfo.email,
      customerName: userInfo.nickname,
    };

    try {
      const response = await paymentWidget?.requestPayment(paymentRequestData);

      const userId = userInfo.id;
      const paymentKey = response?.paymentKey ?? '';
      const amount = response?.amount;
      const orderId = response?.orderId ?? '';
      const paymentType = response?.paymentType ?? '';

      navigate(
        `/order-approval?userId=${userId}&planId=${planId}&paymentKey=${encodeURIComponent(paymentKey)}&amount=${amount}&orderId=${encodeURIComponent(orderId)}&paymentType=${encodeURIComponent(paymentType)}`,
      );
    } catch (error) {
      console.error('Error requesting payment:', error);
      navigate(`/order-fail?code=500&message=결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.`);
    }
  };

  return (
    <Area>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id='payment-widget' />
      <div id='agreement' />
      {/* 결제하기 버튼 */}
      <ButtonBox>
        <Button onClick={handlePaymentRequest}>결제</Button>
      </ButtonBox>
    </Area>
  );
}

const Area = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(CtaButton)`
  width: 30%;
`;
