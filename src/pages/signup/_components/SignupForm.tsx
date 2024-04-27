import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TermOfUse from './TermOfUse';
import { SubmitButton } from '../../../components/Button/SignSubmitButton';
import SignInput from '../../../components/Input/SignInput';

export default function SignupForm() {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    navigate('/checkEmail');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputContainer>
        <SignInput id='email' type='text' placeholder='이메일을 입력해주세요' label='이메일' />
        <SignInput id='password' type='password' placeholder='비밀번호를 다시 입력해주세요' label='비밀번호 확인' />
        <SignInput id='passwordConfirm' type='password' placeholder='이메일을 입력해주세요' label='이메일' />
        <SignInput id='nickname' type='text' placeholder='사용자명을 입력해주세요' label='사용자명' />
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
