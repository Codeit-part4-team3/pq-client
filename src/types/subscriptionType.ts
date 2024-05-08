export interface Subscription {
  isSubscribed: boolean;
  planId: number;
}

interface SubscriptionResponseBody {
  id: number;
  userId: number;
  planId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export type SubscriptionResponse = SubscriptionResponseBody | null;

export type PlanType = 'BASIC' | 'PREMIUM' | 'NONE';
