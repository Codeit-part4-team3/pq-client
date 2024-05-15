import { Dispatch, SetStateAction, memo } from 'react';
import { USER_URL } from 'src/constants/apiUrl';
import { useQueryGet } from 'src/apis/service/service';
import { ModalTitle } from '../../CommonStyles';
import { AllPaymentsResponse, PaymentResponse } from 'src/pages/payments/_type/type';
import styled from 'styled-components';
import { formatTime } from 'src/utils/extractDate';
import { translatePaymentStatus } from 'src/utils/translatePaymentStatus';
import { ERROR_MESSAGES } from 'src/constants/error';

interface CancelProps {
  selectedPayment: PaymentResponse | null;
  setSelectedPayment: Dispatch<SetStateAction<PaymentResponse | null>>;
  cancelReason: string;
  setCancelReason: Dispatch<SetStateAction<string>>;
}

export default function CancelContainer({
  selectedPayment,
  setSelectedPayment,
  cancelReason,
  setCancelReason,
}: CancelProps) {
  const { data: allPayments } = useQueryGet<AllPaymentsResponse>('getAllPayments', `${USER_URL.PAYMENTS}/all`);
  const sortedPayments = allPayments?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSelectPayment = (payment: PaymentResponse) => {
    if (!payment) return alert(ERROR_MESSAGES.PAYMENT.NO_PAYMENT);

    setSelectedPayment(payment);
  };

  return (
    <Contatiner>
      <ModalTitle>구독 취소 & 환불</ModalTitle>
      <Header>결제 내역</Header>
      <Menu>
        <p>주문번호</p>
        <p>가격</p>
        <p>결제 상태</p>
        <p>결제 일시</p>
      </Menu>
      <List>
        {sortedPayments?.map((payment) => (
          <ItemContainer
            key={payment.orderId}
            title={payment.orderId}
            onClick={() => handleSelectPayment(payment)}
            $isSelected={selectedPayment?.orderId === payment.orderId}
          >
            <Item>{payment.orderId}</Item>
            <Item>₩{payment.amount}</Item>
            <Item>{translatePaymentStatus(payment.status)}</Item>
            <Item>{formatTime(payment.createdAt)}</Item>
          </ItemContainer>
        ))}
      </List>

      <Select
        id='cancelReason'
        name='cancelReason'
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        required
      >
        <option value=''>취소 사유를 선택해 주세요.</option>
        <option>단순 변심</option>
        <option>계정 탈퇴</option>
        <option>실수로 결제함</option>
      </Select>
    </Contatiner>
  );
}

const Contatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 600px;
`;

const Header = styled.h3`
  margin-left: 4px;
`;

const List = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  height: 40px;
  padding: 10px 20px;
  background-color: #f3f3f3;
  font-weight: bold;
  border: 1px solid var(--text_gray);
  border-radius: 8px;

  p {
    flex: 1;
    text-align: center;
    margin: 0 5px;
  }
`;

const ItemContainer = memo(styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => (props.$isSelected ? '#e8f4ff' : '#fff')};
  border: 1px solid ${(props) => (props.$isSelected ? '#007BFF' : 'var(--text_gray)')};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  cursor: pointer;

  p {
    flex: 1;
    color: #333;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
  }

  p:nth-child(1) {
    text-align: left;
  }
`);

const Item = styled.p`
  margin: 0;
  padding: 0 5px;
  color: #333;
  font-size: 14px;
  overflow-wrap: break-word;
`;

const Select = styled.select`
  width: 100%;
  padding: 6px;
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
`;
