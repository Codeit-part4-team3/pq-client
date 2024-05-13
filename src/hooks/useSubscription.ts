import { useEffect, useState } from 'react';
import { useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import {
  MessageMaxLength,
  PlanType,
  SubscriptionResponse,
} from 'src/components/modal/contents/SubscriptionModal/_type/subscriptionType';

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [planType, setPlanType] = useState<PlanType>('NONE');
  const [messageMaxLength, setMessageMaxLength] = useState<MessageMaxLength>(150);

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

  useEffect(() => {
    const calculateMaxLength = () => {
      if (!isSubscribed) return 150;

      switch (planType) {
        case 'PREMIUM':
          return 1000;
        case 'BASIC':
          return 500;
        default:
          return 150;
      }
    };

    setMessageMaxLength(calculateMaxLength());
  }, [isSubscribed, planType]);

  return { isSubscribed, planType, messageMaxLength };
};
