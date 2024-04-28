import styled from 'styled-components';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import SignInput from 'src/components/sign/input/SignInput';
import { FormValues } from 'src/pages/signup/_types/type';
import { useNavigate } from 'react-router-dom';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { AxiosError } from 'axios';

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = () => {
    // if (isPending) {
    //   return;
    // }

    try {
      // const { accessToken, refreshToken } = data;
      // Cookies.set('accessToken', accessToken, { expires: 1 });
      // Cookies.set('refreshToken', refreshToken, { expires: 7 });
      navigate('/checkEmail');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 400) {
        setError('email', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.EMAIL_CHECK_FAILED,
        });
        setError('password', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.PASSWORD_CHECK_FAILED,
        });
        return;
      }
      alert(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
      throw Error;
    }
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
