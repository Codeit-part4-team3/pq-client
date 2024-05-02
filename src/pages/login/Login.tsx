import SocialButtons from './_components/SocialButtons';
import { useEffect, useState } from 'react';
import EmailLogin from './EmailLogin';
import { Link } from 'react-router-dom';
import Line from 'src/components/sign/Line';
import Header from 'src/components/sign/Header';
import { Area, Container, Button, Prompt } from 'src/components/sign/CommonStyles';
import axios from 'axios';
import { USER_URL } from 'src/constants/apiUrl';

export default function Login() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  useEffect(() => {
    (async () => {
      console.log('시작');
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) {
        return;
      }
      const res = await axios.get(`${USER_URL.BASE}${USER_URL.AUTH}/kakao/login?code=${code}`);
      console.log(res);
      // 여기에 이제 카카오 로그인 되었을 때 처리 (상태관리, 리다이렉트 등등)
    })();
  }, []);

  const renderContent = () => {
    if (isEmailLogin) {
      return <EmailLogin />;
    }

    return (
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
    );
  };

  return <Area>{renderContent()}</Area>;
}
