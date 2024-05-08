import { useEffect, useRef, useState } from 'react';
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import useUserStore from 'src/store/userStore';
import { usePlanStore, useTempOrderStore } from 'src/store/paymentStore';
import { PaymentMethodsWidget } from './_type/type';

const widgetClientKey = import.meta.env.VITE_APP_TOSS_CLIENT_KEY;

export default function Checkout() {
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget | null>(null);
  const { userInfo } = useUserStore();
  const { tempOrderId } = useTempOrderStore();
  const { planId, amount, planType } = usePlanStore();

  // 결제 위젯 불러오기
  useEffect(() => {
    if (userInfo.email) {
      const customerKey = userInfo.email;
      const fetchPaymentWidget = async () => {
        try {
          const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
          setPaymentWidget(loadedWidget);
        } catch (error) {
          console.error('Error fetching payment widget:', error);
        }
      };

      fetchPaymentWidget();
    }
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
      successUrl: `${location.origin}/order-approval?userId=${userInfo.id}&planId=${planId}`,
      failUrl: `${location.origin}/order-fail`,
    };

    try {
      await paymentWidget?.requestPayment(paymentRequestData);
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return (
    <div>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id='payment-widget' />
      <div id='agreement' />
      {/* 결제하기 버튼 */}
      <button onClick={handlePaymentRequest}>구독하기</button>
    </div>
  );
}
