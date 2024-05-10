import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/apis/instance/axiosInstance';
import { USER_URL } from 'src/constants/apiUrl';
import { ERROR_MESSAGES } from 'src/constants/error';
import useUserStore from 'src/store/userStore';
import { ResponseUserData } from 'src/types/userType';

interface OauthProps {
  googleUrl: string;
  kakaoUrl: string;
  redirectUri: string;
}

export function useOauth({ googleUrl, kakaoUrl, redirectUri }: OauthProps) {
  const navigate = useNavigate();
  const { setEmail, setAccessToken, setUserInfo } = useUserStore();

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
        }

        if (state === 'google') {
          res = await axiosInstance.get(`${googleUrl}?code=${code}`);
        }

        // 로그인 성공
        if (res?.status === 200) {
          // 데이터 가공
          const data: ResponseUserData = res.data;
          setAccessToken(data.token.accessToken);
          setUserInfo(data.userInfo);
          Cookies.set('refreshToken', data.token.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
          axiosInstance.put(`${USER_URL.USER}/me/state/update`, { state: '온라인' });
          navigate('/server');
          return;
        }

        // 회원가입 성공
        if (res?.status === 201) {
          const email = res.data;
          setEmail(email);
          navigate('/check-email', { replace: true });
        }
      } catch (error) {
        const e = error as AxiosError;

        // 이메일 인증 필요
        if (e.response?.status === 403) {
          const email = (e.response.data as { email: string })['email'];
          setEmail(email);
          alert(ERROR_MESSAGES.AUTH.EMAIL_VERIFY_REQUIRED);
          navigate('/check-email', { replace: true });
          return;
        }

        // 존재하지 않는 유저
        if (e.response?.status === 404) {
          alert(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
        }

        // 이미 가입된 유저
        if (e.response?.status === 409) {
          alert(ERROR_MESSAGES.AUTH.DUPLICATE_EMAIL);
          navigate('/login');
          return;
        }

        navigate(redirectUri);
      }
    })();
  }, []);
}
