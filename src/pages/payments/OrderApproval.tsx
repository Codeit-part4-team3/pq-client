import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConfirmRequest, ConfirmResponse } from './_type/type';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import useUserStore from 'src/store/userStore';
import { UserInfo } from 'src/types/userType';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

/**
 * 결제 요청 승인 후 실제 결제 진행
 */
export function OrderApproval() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 결제 정보
  const paymentData = {
    userId: Number(searchParams.get('userId')),
    planId: Number(searchParams.get('planId')),
    orderId: searchParams.get('orderId') ?? '',
    amount: Number(searchParams.get('amount')),
    paymentKey: searchParams.get('paymentKey') ?? '',
  };

  const { setUserInfo } = useUserStore();
  const { data: userData, isLoading } = useQueryGet<UserInfo | null>('getUserData', `${USER_URL.USER}/me`);
  const { mutate } = useMutationPost<ConfirmResponse, ConfirmRequest>(`${USER_URL.PAYMENTS}/confirm`, {
    onSuccess: () => {
      navigate(
        `/order-success?orderId=${paymentData.orderId}&amount=${paymentData.amount}&paymentKey=${paymentData.paymentKey}`,
      );
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'Unknown error occurred';
        navigate(`/order-fail?code=${err.code}&message=${encodeURIComponent(message)}`);
        return;
      }

      console.error(err);
    },
  });

  // 유저 정보 및 토큰 업데이트 후 결제 진행
  useEffect(() => {
    if (isLoading) return;

    if (userData) {
      setUserInfo(userData);
    }

    mutate(paymentData);
  }, [userData, setUserInfo]);

  return (
    <Area className='result wrapper'>
      <Container className='box_section'>
        <h2>결제 중 입니다.</h2>
        <Spinner delay='0s' />
      </Container>
    </Area>
  );
}

const Area = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const Spinner = styled.div<{ delay: string }>`
  margin: 8px;
  width: 12px;
  height: 12px;
  background-color: var(--black_000000);
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  animation-delay: ${(props) => props.delay};
`;
