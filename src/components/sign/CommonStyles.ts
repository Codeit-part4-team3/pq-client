import styled from 'styled-components';
import { ButtonNormal } from 'src/GlobalStyles';

export const Area = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  font-weight: 400;
  font-family: 'Inter', 'Pretendard', sans-serif;
  line-height: 160%;

  background-color: #fff;
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px 0 263px 0;
`;

export const Button = styled(ButtonNormal)`
  width: 440px;
  height: 40px;
  font-size: 14px;

  background: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Prompt = styled.p`
  font-size: 14px;
  margin: 20px 0 0 0;
`;
