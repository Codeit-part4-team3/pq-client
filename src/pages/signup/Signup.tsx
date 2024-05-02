import SocialButtons from './_components/SocialButtons';
import EmailSignup from './EmailSignup';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Line from 'src/components/sign/Line';
import Header from 'src/components/sign/Header';
import { Area, Container, Button, Prompt } from 'src/components/sign/CommonStyles';
import { USER_URL } from 'src/constants/apiUrl';
import axios from 'axios';

export default function Signup() {
  const [isEmailSignup, setIsEmailSignup] = useState(false);
  useEffect(() => {
    (async () => {
      console.log('시작');
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) {
        return;
      }
      const res = await axios.get(`${USER_URL.BASE}${USER_URL.AUTH}/kakao/signup?code=${code}`);
      console.log(res);
      // 여기에 이제 카카오 로그인 되었을 때 처리 (상태관리, 리다이렉트 등등)
    })();
  }, []);

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
