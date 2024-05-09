import { useEffect, useState } from 'react';
import { useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { PlanType, SubscriptionResponse } from 'src/types/subscriptionType';

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [planType, setPlanType] = useState<PlanType>('NONE');

  const { data } = useQueryGet<SubscriptionResponse>('getSubscription', `${USER_URL.PAYMENTS}/subscription`);

  useEffect(() => {
    if (!data) {
      return console.log('구독 정보를 불러올 수 없습니다.');
    }

    setIsSubscribed(data.isActive);

    switch (data.planId) {
      case 1:
        setPlanType('BASIC');
        break;
      case 2:
        setPlanType('PREMIUM');
        break;
      default:
        setPlanType('NONE');
        break;
    }
  }, [data]);

  return { isSubscribed, planType };
};
