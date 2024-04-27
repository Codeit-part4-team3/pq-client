import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../../../components/signButton/SubmitButton';

export default function FindPasswordForm() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    navigate('/changePassword');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor='email'>
        이메일<Span>*</Span>
        <Input type='text' placeholder='이메일을 입력해주세요.' id='email' />
      </Label>

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
