export interface TempOrderData {
  orderName: string;
  totalAmount: number;
}

export interface TempOrderResponsebody extends TempOrderData {
  tempOrderId: string;
}

export type TempOrderRequest = TempOrderData;
export type TempOrderResponse = TempOrderResponsebody | null;

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

interface PlanData {
  id: number;
  type: string;
  price: number;
  duration: number;
}

export type PlanResponse = PlanData | null;
interface PaymentData {
  id: number;
  userId: number;
  planId: number;
  subscriptionId: number;
  amount: number;
  status: string;
  createdAt: string;
}

export interface ConfirmResponseBody {
  title: string;
  paymentMethod: string;
  payment: PaymentData;
  data: object;
}

export interface ErrorResponse {
  statusCode: number;
  code: string;
  message: string;
}

export interface ConfirmRequest {
  userId: number | null;
  planId: number | null;
  orderId: string | null;
  amount: number | null;
  paymentKey: string | null;
}

export type ConfirmResponse = ConfirmResponseBody | null;
