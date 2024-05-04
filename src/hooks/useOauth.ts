import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/apis/instance/axiosInstance';

interface OauthProps {
  googleUrl: string;
  kakaoUrl: string;
  redirectUri: string;
}

export function useOauth({ googleUrl, kakaoUrl, redirectUri }: OauthProps) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const state = new URL(window.location.href).searchParams.get('state');

      if (!code || !state) {
        return;
      }

      try {
        let res;
        if (state === 'kakao') {
          res = await axiosInstance.get(`${kakaoUrl}?code=${code}`);
          console.log(res);
        }

        if (state === 'google') {
          res = await axiosInstance.get(`${googleUrl}?code=${code}`);
          console.log(res);
        }

        // 로그인 성공
        if (res?.status === 200) {
          // 데이터 가공

          navigate('/server');
          return;
        }

        // 회원가입 성공
        if (res?.status === 201) {
          console.log(res);
          const email = res.data;
          console.log(email);
          // 이메일 저장할 수 있도록 어딘가에 저장
          localStorage.setItem('email', email);
          navigate('/checkEmail');
        }
      } catch (error) {
        const e = error as AxiosError;

        // 이메일 인증 필요
        if (e.response?.status === 403) {
          const email = (e.response.data as { email: string })['email'];
          console.log(email);

          localStorage.setItem('email', email);
          alert('인증해주세요.');
          navigate('/checkEmail');
          return;
        }

        // 존재하지 않는 유저
        if (e.response?.status === 404) {
          alert('존재하지 않는 유저입니다.');
        }

        // 이미 가입된 유저
        if (e.response?.status === 409) {
          alert('이미 가입된 회원입니다.');
          navigate('/login');
          return;
        }

        navigate(redirectUri);
      }
    })();
  }, []);
}
