import styled from 'styled-components';
import { SubmitButton } from '../../../components/signButton/SubmitButton';

export default function LoginForm() {
  return (
    <form>
      <InputContainer>
        <Label htmlFor='email'>
          이메일<Span>*</Span>
        </Label>
        <Input type='text' placeholder='이메일을 입력해주세요.' id='email' />
        <Label htmlFor='password'>
          비밀번호<Span>*</Span>
        </Label>
        <Input type='password' placeholder='비밀번호를 입력해주세요' id='password' />
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

const Label = styled.label`
  font-size: 12px;
`;

const Span = styled.span`
  color: #258dff;
`;

const Input = styled.input`
  width: 440px;
  height: 36px;
  padding: 7px 12px;
  margin-top: 8px;

  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  transition: 0.2s;
  white-space: nowrap;
`;
