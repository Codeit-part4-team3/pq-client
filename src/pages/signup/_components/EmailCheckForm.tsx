import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../../../components/sign/button/SignSubmitButton';
import { ButtonNormal } from '../../../GlobalStyles';
import AuthInput, { FormValues } from '../../../components/sign/input/AuthInput';

export default function EmailCheckForm() {
  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    const verificationCode = Object.values(data).join('');
    console.log(verificationCode);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput control={control} getValues={getValues} setValue={setValue} />
      </InputContainer>
      <SubmitButton type='submit'>인증하기</SubmitButton>
      <PromptButton type='button'>메일 재전송</PromptButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
`;

const PromptButton = styled(ButtonNormal)`
  height: 22px;
  margin-top: 20px;
  border: none;
  font-size: 14px;
`;
