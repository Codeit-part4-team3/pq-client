export interface TempOrderData {
  orderName: string;
  totalAmount: number;
}

export interface TempOrderResponsebody extends TempOrderData {
  tempOrderId: string;
}

export type TempOrderRequest = TempOrderData;
export type TempOrderResponse = TempOrderResponsebody | null;

interface CancelOrderRequestBody {
  paymentId: number;
  cancelReason: string;
}
interface CancelOrderResponseBody {
  message: string;
  refund: {
    paymentId: number;
    amount: number;
    status: string;
    createdAt: Date;
  };
}

export type CancelOrderRequest = CancelOrderRequestBody;
export type CancelOrderResponse = CancelOrderResponseBody | null;

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
  userId: number;
  planId: number;
  orderId: string;
  amount: number;
  paymentKey: string;
}

export type ConfirmResponse = ConfirmResponseBody | null;

interface RegistCardData {
  userId: number;
  customerKey: string;
  authKey: string;
}

interface RegistCardResponseBody {
  response: object;
}

export type RegistCardRequest = RegistCardData;
export type RegistCardResponse = RegistCardResponseBody | null;
