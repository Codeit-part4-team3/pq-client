import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import { ButtonNormal } from 'src/GlobalStyles';
import AuthInput from 'src/components/sign/input/AuthInput';
import { FormValues } from '../_types/type';
import { useCheckEmail } from 'src/hooks/useCheckEmail';

export default function EmailCheckForm() {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending } = useCheckEmail(setError);

  const onSubmit = async (data: FormValues) => {
    if (isPending) {
      return;
    }

    const verificationCode = Object.values(data).join('');
    const email = localStorage.getItem('email'); // 임시

    const EmailVerifyData = {
      email: email as string,
      code: verificationCode,
    };

    mutate(EmailVerifyData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput control={control} getValues={getValues} setValue={setValue} errors={errors} />
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
