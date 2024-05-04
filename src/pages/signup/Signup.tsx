import SocialButtons from './_components/SocialButtons';
import EmailSignup from './EmailSignup';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Line from 'src/components/sign/Line';
import Header from 'src/components/sign/Header';
import { Area, Container, Button, Prompt } from 'src/components/sign/CommonStyles';
import { USER_URL } from 'src/constants/apiUrl';

import axiosInstance from 'src/apis/instance/axiosInstance';
import { AxiosError } from 'axios';

export default function Signup() {
  const [isEmailSignup, setIsEmailSignup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      console.log('시작');
      const code = new URL(window.location.href).searchParams.get('code');
      if (!code) {
        return;
      }
      try {
        const res = await axiosInstance.get(`${USER_URL.AUTH}/kakao/signup?code=${code}`);
        //이메일 넣기
        const email = res.data.email;
        console.log(email);
        navigate('/checkEmail');
      } catch (error) {
        const e = error as AxiosError;
        console.log(e);
        if (e.response?.status === 409) {
          alert('이미 가입된 회원입니다.');
          navigate('/login');
          return;
        }
        navigate('/signup');
      }
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
