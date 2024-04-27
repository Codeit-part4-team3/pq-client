import styled from 'styled-components';
import { SubmitButton } from '/components/sign/button/SignSubmitButton';
import SignInput from '/components/sign/input/SignInput';

export default function LoginForm() {
  return (
    <form>
      <InputContainer>
        <SignInput id='email' type='text' placeholder='이메일을 입력해주세요' label='이메일' />
        <SignInput id='password' type='password' placeholder='비밀번호를 다시 입력해주세요' label='비밀번호 확인' />
      </InputContainer>

      <SubmitButton type='submit'>로그인</SubmitButton>
    </form>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;
