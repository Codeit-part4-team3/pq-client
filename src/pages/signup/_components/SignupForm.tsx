import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TermOfUse from './TermOfUse';
import { SubmitButton } from '../../../components/signButton/SubmitButton';

export default function SignupForm() {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    navigate('/checkEmail');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputContainer>
        <Label htmlFor='email'>
          이메일<Span>*</Span>
          <Input type='text' placeholder='이메일을 입력해주세요.' id='email' />
        </Label>
        <Label htmlFor='password'>
          비밀번호<Span>*</Span>
          <Input type='password' placeholder='비밀번호를 입력해주세요.' id='password' />
        </Label>
        <Label htmlFor='passwordConfirm'>
          비밀번호 확인<Span>*</Span>
          <Input type='password' placeholder='비밀번호를 다시 입력해주세요.' id='passwordConfirm' />
        </Label>
        <Label htmlFor='nickname'>
          사용자명<Span>*</Span>
          <Input type='text' placeholder='사용자명을 입력해주세요.' id='nickname' />
        </Label>
      </InputContainer>

      <TermOfUse />

      <SubmitButton>새로운 계정 생성</SubmitButton>
    </form>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
