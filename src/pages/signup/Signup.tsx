import styled from 'styled-components';
import SocialButtons from './_components/SocialButtons';
import EmailSignup from './EmailSignup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonNormal } from '../../GlobalStyles';

export default function Signup() {
  const [isEmailSignup, setIsEmailSignup] = useState(false);

  if (isEmailSignup) {
    return <EmailSignup />;
  }

  return (
    <Area>
      <Container>
        <Header>
          <Logo src='src/assets/images/logo.svg' />
          회원가입
        </Header>

        <SocialButtons />

        <Line>
          <img src='/images/line.svg' />
          <span>or</span>
          <img src='/images/line.svg' />
        </Line>

        <Button
          onClick={() => {
            setIsEmailSignup(true);
          }}
        >
          이메일로 가입하기
        </Button>
        <Prompt>
          이미 계정이 있으신가요? <Link to='/login'>로그인 하러가기</Link>
        </Prompt>
      </Container>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  font-weight: 400;
  font-family: 'Inter', 'Pretendard', sans-serif;
  line-height: 160%;

  background-color: #fff;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Header = styled.h1`
  font-size: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
`;

const Logo = styled.img`
  padding: 8px 12px;

  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  font-style: normal;
`;

const Line = styled.div`
  font-size: 12px;

  display: flex;
  gap: 16px;
  margin: 50px 0px;
`;

const Prompt = styled.p`
  font-size: 14px;
  margin: 20px 0 0 0;
`;

const Button = styled(ButtonNormal)`
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
