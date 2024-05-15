export interface PaymentMethodsWidget {
  updateAmount: (amount: number, reason?: string | string[]) => void;
  UPDATE_REASON: {
    COUPON: string;
    POINT: string;
  };
  on: (eventName: string, callback: (selectedPaymentMethod: string) => unknown) => void;
  getSelectedPaymentMethod: () => {
    type: 'NORMAL' | 'BRANDPAY' | 'KEYIN' | 'CUSTOM';
    method?: string;
    easyPay?: {
      provider: string;
    };
    paymentMethodKey?: string;
  };
}

interface Payment {
  orderId: string;
  userId: number;
  planId: number;
  subscriptionId: number;
  amount: number;
  status: string;
  createdAt: Date;
}

export interface ConfirmResponseBody {
  title: string;
  paymentMethod: string;
  payment: Payment;
  data: object;
}

export interface ErrorResponse {
  statusCode: number;
  code: string;
  message: string;
}
export interface ConfirmRequest {
  userId: number;
  planId: number;
  orderId: string;
  amount: number;
  paymentKey: string;
}

export type PaymentResponse = Payment | null;
export type AllPaymentsResponse = Payment[] | null;
export type EventPaymentsResponse = Payment[] | null;

export type ConfirmResponse = ConfirmResponseBody | null;
