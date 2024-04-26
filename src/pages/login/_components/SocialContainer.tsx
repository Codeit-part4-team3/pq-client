import styled from 'styled-components';
import SocialButton from '../../../components/Button/SocialButton';

export default function SocialButtons() {
  return (
    <SocialContainer>
      <SocialButton type='google' icon='src/assets/images/google.png' size='L'>
        구글로 로그인하기
      </SocialButton>
      <SocialButton type='kakao' icon='src/assets/images/kakao.png' size='L'>
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
