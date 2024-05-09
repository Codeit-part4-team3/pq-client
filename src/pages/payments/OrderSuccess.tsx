import { useSearchParams } from 'react-router-dom';

export function OrderSuccess() {
  const [searchParams] = useSearchParams();

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <img src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png' width='120' height='120' />
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get('amount')).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
      </div>
    </div>
  );
}
