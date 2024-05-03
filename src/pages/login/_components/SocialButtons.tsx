import styled from 'styled-components';
import SocialButton from 'src/components/sign/button/SocialButton';
import { KAKAO_CLIENT_ID } from 'src/constants/apiKey';
import { LOGIN_REDIRECT } from 'src/constants/apiUrl';

export default function SocialButtons() {
  const handleKakaoLogin = () => {
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${LOGIN_REDIRECT}&response_type=code`;
    console.log('kakao login');
    window.location.href = kakaoUrl;
  };

  return (
    <SocialContainer>
      <SocialButton variant='google' src='/images/google.png'>
        구글로 로그인하기
      </SocialButton>
      <SocialButton onClick={handleKakaoLogin} variant='kakao' src='/images/kakao.png'>
        카카오로 로그인하기
      </SocialButton>
    </SocialContainer>
  );
}

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
