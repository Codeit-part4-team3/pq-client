import styled from 'styled-components';
import SocialButton from '/components/sign/button/SocialButton';

export default function SocialButtons() {
  return (
    <SocialContainer>
      <SocialButton variant='google' src='src/assets/images/google.png'>
        구글로 로그인하기
      </SocialButton>
      <SocialButton variant='kakao' src='src/assets/images/kakao.png'>
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
