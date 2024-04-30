import styled from 'styled-components';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import SignInput from 'src/components/sign/input/SignInput';
import { FormValues } from 'src/pages/signup/_types/type';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { useLogin } from 'src/hooks/useLogin';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useLogin(setError);

  const onSubmit = async (data: FormValues) => {
    if (isPending) {
      return;
    }

    const userData = {
      email: data.email,
      password: data.password,
    };

    mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <EmailInput control={control} errors={errors} />
        <PasswordInput control={control} errors={errors} />
      </InputContainer>

      <SubmitButton type='submit'>로그인</SubmitButton>
    </form>
  );
}

interface InputProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const EmailInput = ({ control, errors }: InputProps) => {
  return (
    <Controller
      control={control}
      name='email'
      rules={{
        required: ERROR_MESSAGES.AUTH.EMAIL_REQUIRED,
      }}
      render={({ field }) => (
        <SignInput
          {...field}
          id='email'
          type='text'
          placeholder={ERROR_MESSAGES.AUTH.EMAIL_REQUIRED}
          label='이메일'
          errors={errors}
        />
      )}
    />
  );
};

const PasswordInput = ({ control, errors }: InputProps) => {
  return (
    <Controller
      control={control}
      name='password'
      rules={{
        required: ERROR_MESSAGES.AUTH.PASSWORD_REQUIRED,
      }}
      render={({ field }) => (
        <SignInput
          {...field}
          id='password'
          type='password'
          label='비밀번호'
          placeholder={ERROR_MESSAGES.AUTH.PASSWORD_REQUIRED}
          errors={errors}
        />
      )}
    />
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;
