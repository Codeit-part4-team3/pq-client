import SocialButtons from './_components/SocialButtons';
import { useState } from 'react';
import EmailLogin from './EmailLogin';
import { Link } from 'react-router-dom';
import Line from 'src/components/sign/Line';
import Header from 'src/components/sign/Header';
import { Area, Container, Button, Prompt } from 'src/components/sign/CommonStyles';

export default function Login() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  if (isEmailLogin) {
    return <EmailLogin />;
  }

  return (
    <Area>
      <Container>
        <Header>로그인</Header>
        <SocialButtons />
        <Line />
        <Button
          type='button'
          onClick={() => {
            setIsEmailLogin(true);
          }}
        >
          이메일로 로그인하기
        </Button>
        <Prompt>
          아직 계정이 없으신가요? <Link to='/signup'>회원가입 하러가기</Link>
        </Prompt>
      </Container>
    </Area>
  );
}
