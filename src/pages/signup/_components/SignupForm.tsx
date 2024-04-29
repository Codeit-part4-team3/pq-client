import styled from 'styled-components';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import TermOfUse from './TermOfUse';
import { FormValues } from '../_types/type';
import SignInput from 'src/components/sign/input/SignInput';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constants/regex';
import { useSignup } from 'src/hooks/useSignup';

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const { onSubmit } = useSignup({ setError });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <EmailInput control={control} errors={errors} />
        <PasswordInput control={control} errors={errors} />
        <PasswordConfirmInput control={control} errors={errors} watch={watch} />
        <NicknameInput control={control} errors={errors} />
      </InputContainer>
      <TermOfUse />
      <SubmitButton>새로운 계정 생성</SubmitButton>
    </form>
  );
}

interface InputProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  watch?: (field: keyof FormValues) => string;
}

const EmailInput = ({ control, errors }: InputProps) => {
  return (
    <Controller
      control={control}
      name='email'
      rules={{
        required: ERROR_MESSAGES.AUTH.EMAIL_REQUIRED,
        pattern: {
          value: EMAIL_REGEX,
          message: ERROR_MESSAGES.AUTH.INVALID_EMAIL,
        },
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
        pattern: {
          value: PASSWORD_REGEX,
          message: ERROR_MESSAGES.AUTH.INVALID_PASSWORD,
        },
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

const PasswordConfirmInput = ({ control, errors, watch }: InputProps) => {
  return (
    <Controller
      control={control}
      name='passwordConfirm'
      rules={{
        required: ERROR_MESSAGES.AUTH.PASSWORD_CONFIRM_REQUIRED,
        validate: (value) => {
          const password = watch ? watch('password') : '';
          return value === password || ERROR_MESSAGES.AUTH.INVALID_PASSWORD_CONFIRM;
        },
      }}
      render={({ field }) => (
        <SignInput
          {...field}
          id='passwordConfirm'
          type='password'
          label='비밀번호 확인'
          placeholder={ERROR_MESSAGES.AUTH.PASSWORD_CONFIRM_REQUIRED}
          errors={errors}
        />
      )}
    />
  );
};

const NicknameInput = ({ control, errors }: InputProps) => {
  return (
    <Controller
      control={control}
      name='nickname'
      rules={{
        required: ERROR_MESSAGES.AUTH.NICKNAME_REQUIRED,
      }}
      render={({ field }) => (
        <SignInput
          {...field}
          id='nickname'
          type='text'
          label='사용자명'
          placeholder={ERROR_MESSAGES.AUTH.NICKNAME_REQUIRED}
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
`;
