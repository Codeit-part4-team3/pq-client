import styled from 'styled-components';
import { useId } from 'react';
import { ServerButtonProps } from '../_types/props';

/**
 *
 * @param param0
 * interface ComponentProps { // 컴포넌트명Props의 interface 정의
 *  data: ServerItem;         // data속성은 서버에서 받아온 데이터
 *  etc: any;                 // etc속성은 기타 속성
 *  etc2: any;
 *  etc3: any;
 * }
 *
 */

export default function ServerButton({ data }: ServerButtonProps) {
  const lid = useId();

  return (
    //
    <Button key={`${lid}-${data.id}`}>
      {data.imageUrl ? (
        <img src={data.imageUrl} alt='img' data-serverid={data.id} />
      ) : (
        <strong data-serverid={data.id}>{data.name}</strong>
      )}
    </Button>
  );
}

const Button = styled.button`
  width: 48px;
  height: 48px;

  border: 1px solid #cccccc;
  border-radius: 25%;
  background-color: #f1f8ff;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  overflow: hidden;
  transition: 0.2s;
  white-space: nowrap;

  &:hover {
    scale: 1.1;
    cursor: pointer;
  }

  > strong {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
