import { Control, Controller, FieldErrors } from 'react-hook-form';
import SignInput from 'src/components/sign/input/SignInput';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';

interface InputProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

export const EmailInput = ({ control, errors }: InputProps) => {
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

export const PasswordInput = ({ control, errors }: InputProps) => {
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
