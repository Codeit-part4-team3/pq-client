import styled from 'styled-components';
import { useId } from 'react';
import { ServerItemProps } from '../_types/props';

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

export default function ServerItem({ data, ...rest }: ServerItemProps) {
  const lid = useId();

  return (
    <Button key={`${lid}-${data.id}`} {...rest}>
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

  border: none;
  border-radius: 10px;
  background-color: #d8980e;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  overflow: hidden;
  white-space: nowrap;

  &:hover {
    outline: 3px solid #d9d9d9;
    cursor: pointer;
  }

  > * {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-size: cover;
  }
`;
