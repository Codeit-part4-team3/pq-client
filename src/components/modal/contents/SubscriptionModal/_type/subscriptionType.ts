export interface TempOrderData {
  orderName: string;
  totalAmount: number;
}

export interface TempOrderResponsebody extends TempOrderData {
  tempOrderId: string;
}

export interface Plan {
  id: number;
  type: string;
  price: number;
  duration: number;
}

export interface Subscription {
  isSubscribed: boolean;
  planId: number;
}

interface SubscriptionRequestBody {
  id: number;
  userId: number;
  planId: number;
  plan: Plan;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
}

interface SubscriptionResponseBody {
  id: number;
  userId: number;
  planId: number;
  plan: Plan;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

interface CancelOrderRequestBody {
  orderId: string;
  cancelReason: string;
}
interface CancelOrderResponseBody {
  message: string;
  refund: {
    id: number;
    orderId: string;
    amount: number;
    status: string;
    createdAt: Date;
  };
}

interface RegistCard {
  userId: number;
  customerKey: string;
  authKey: string;
}

interface RegistCardResponseBody {
  response: object;
}

interface EventResponseBody {
  id: number;
  amount: number;
  createdAt: Date;
}

export type TempOrderRequest = TempOrderData;
export type TempOrderResponse = TempOrderResponsebody | null;

export type PlanType = 'BASIC' | 'PREMIUM' | 'NONE';

export type PlansResponse = Plan[] | null;

export type SubscriptionRequest = SubscriptionRequestBody | null;
export type SubscriptionResponse = SubscriptionResponseBody | null;

export type CancelOrderRequest = CancelOrderRequestBody;
export type CancelOrderResponse = CancelOrderResponseBody | null;

export type RegistCardRequest = RegistCard;
export type RegistCardResponse = RegistCardResponseBody | null;

export type MessageMaxLength = 150 | 500 | 1000;

export type EventResponse = EventResponseBody | null;
