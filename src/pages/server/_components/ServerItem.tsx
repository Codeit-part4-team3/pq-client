import styled from 'styled-components';
import { useId } from 'react';
import { ServerItemProps } from '../_types/props';
import { ProfileImage } from 'src/GlobalStyles';

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
        <ProfileImage imageUrl={data.imageUrl} data-serverid={data.id} />
      ) : (
        <strong data-serverid={data.id}>{data.name}</strong>
      )}
    </Button>
  );
}

// const Image = styled.img`
//   transition: transform 0.3s ease-in-out;

//   &:hover {
//     transform: scale(1.2);
//   }
// `;

const Button = styled.button`
  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;
  background-color: #d8980e;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  overflow: hidden;

  &:hover {
    border: 3px solid #d9d9d9;
    cursor: pointer;
  }
`;
