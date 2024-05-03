import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

/**
 * 서버 초대 링크를 확인하는 페이지
 *
 * secretKey는 암호화된 서버ID를 의미합니다.
 */
export default function Invite() {
  const location = useLocation();
  const secretKey = location.pathname.split('/')[2];
  console.log(secretKey);

  return (
    <Area>
      <h1>초대 링크를 확인중입니다.</h1>
      <h2>잠시만 기다려주세요...</h2>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
