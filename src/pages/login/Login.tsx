import SocialButtons from './_components/SocialButtons';
import { useEffect, useState } from 'react';
import EmailLogin from './EmailLogin';
import { Link, useNavigate } from 'react-router-dom';
import Line from 'src/components/sign/Line';
import Header from 'src/components/sign/Header';
import { Area, Container, Button, Prompt } from 'src/components/sign/CommonStyles';

import { USER_URL } from 'src/constants/apiUrl';
import axiosInstance from 'src/apis/instance/axiosInstance';
import { AxiosError } from 'axios';

export default function Login() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log('시작');
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) {
        return;
      }
      try {
        const res = await axiosInstance.get(`${USER_URL.AUTH}/kakao/login?code=${code}`);
        console.log(res);
        navigate('/server');
      } catch (error) {
        const e = error as AxiosError;
        if (e.response?.status === 403) {
          const email = (e.response.data as { email: string })['email'];
          console.log(email);
          // 이메일 상태 관리 하기
          localStorage.setItem('email', email);
          alert('인증해주세요.');
          navigate('/checkEmail');
          return;
        }
        if (e.response?.status === 404) {
          alert('존재하지 않는 유저입니다.');
          return;
        }
        navigate('/login');
      }

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
