import SocialButtons from './_components/SocialButtons';
import EmailSignup from './EmailSignup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Line from 'src/components/sign/Line';
import Header from 'src/components/sign/Header';
import { Area, Container, Button, Prompt } from 'src/components/sign/CommonStyles';
import { USER_URL } from 'src/constants/apiUrl';
import { useOauth } from 'src/hooks/useOauth';

export default function Signup() {
  const [isEmailSignup, setIsEmailSignup] = useState(false);
  useOauth({
    googleUrl: `${USER_URL.AUTH}/google/signup`,
    kakaoUrl: `${USER_URL.AUTH}/kakao/signup`,
    redirectUri: '/signup',
  });

  const renderContent = () => {
    if (isEmailSignup) {
      return <EmailSignup />;
    }

    return (
      <Container>
        <Header>회원가입</Header>
        <SocialButtons />
        <Line />
        <Button onClick={() => setIsEmailSignup(true)}>이메일로 가입하기</Button>
        <Prompt>
          이미 계정이 있으신가요? <Link to='/login'>로그인 하러가기</Link>
        </Prompt>
      </Container>
    );
  };

  return <Area>{renderContent()}</Area>;
}
