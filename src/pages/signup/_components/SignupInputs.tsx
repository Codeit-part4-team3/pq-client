import SignInput from 'src/components/sign/input/SignInput';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constants/regex';
import { FormValues } from '../_types/type';

interface InputProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  watch?: (field: keyof FormValues) => string;
}

export const EmailInput = ({ control, errors }: InputProps) => {
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

export const PasswordInput = ({ control, errors }: InputProps) => {
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

export const PasswordConfirmInput = ({ control, errors, watch }: InputProps) => {
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

export const NicknameInput = ({ control, errors }: InputProps) => {
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
