import { useNavigate, useSearchParams } from 'react-router-dom';
import { CtaButton } from 'src/GlobalStyles';
import styled from 'styled-components';

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Area className='result wrapper'>
      <Container className='box_section'>
        <img src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png' width='120' height='120' />
        <h2>결제 완료</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get('amount')).toLocaleString()}원`}</p>
        <Button onClick={() => navigate('/server')}>처음으로 돌아가기</Button>
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
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled(CtaButton)`
  width: 30%;
  margin-top: 20px;
`;
