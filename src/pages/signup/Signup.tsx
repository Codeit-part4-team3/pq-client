import SocialButtons from './_components/SocialButtons';
import EmailSignup from './EmailSignup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Line from '/components/sign/Line';
import Header from '/components/sign/Header';
import { Area, Container, Button, Prompt } from '/components/sign/CommonStyles';

export default function Signup() {
  const [isEmailSignup, setIsEmailSignup] = useState(false);

  if (isEmailSignup) {
    return <EmailSignup />;
  }

  return (
    <Area>
      <Container>
        <Header>회원가입</Header>
        <SocialButtons />
        <Line />
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
