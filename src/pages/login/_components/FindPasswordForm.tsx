import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import SignInput from 'src/components/sign/input/SignInput';

export default function FindPasswordForm() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    navigate('/changePassword');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SignInput id='email' type='text' placeholder='이메일을 입력해주세요' label='이메일' />
      <SubmitButton type='submit'>인증하기</SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
