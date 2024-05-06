import { useEffect, useRef, useState } from 'react';
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import useUserStore from 'src/store/userStore';
import usePaymentStore from 'src/store/paymentStore';
import { PaymentMethodsWidget } from './_type/type';
import { Outlet } from 'react-router-dom';

const widgetClientKey = import.meta.env.VITE_APP_TOSS_CLIENT_KEY;
const customerKey = 'pIXRyIQovcExXgOPApWUP';

export default function Checkout() {
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget | null>(null);
  const { amount } = usePaymentStore();

  const { email } = useUserStore();
  const { tempOrderId } = usePaymentStore();

  // 결제 위젯 불러오기
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    };

    fetchPaymentWidget();
  }, []);

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
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: tempOrderId,
        orderName: '프리미엄 월간 구독권',
        customerName: '김토스',
        customerEmail: email,
        successUrl: window.location.origin + '/payments/success' + window.location.search,
        failUrl: window.location.origin + '/payments/fail' + window.location.search,
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return (
    <>
      <div>
        {/* 결제 UI, 이용약관 UI 영역 */}
        <div id='payment-widget' />
        <div id='agreement' />
        {/* 결제하기 버튼 */}
        <button onClick={handlePaymentRequest}>결제하기</button>
        <Outlet />
      </div>
    </>
  );
}
