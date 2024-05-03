import styled from 'styled-components';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import TermOfUse from './TermOfUse';
import { FormValues, SignupRequest, SignupResponse } from '../_types/type';
import { useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { EmailInput, PasswordConfirmInput, PasswordInput, NicknameInput } from './SignupInputs';
import { useMutationPost } from 'src/apis/service/service';
import { URL } from 'src/constants/apiUrl';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

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

  const { mutate, isPending } = useMutationPost<SignupResponse, SignupRequest>(`${URL.AUTH}/signup`, {
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      const status = axiosError?.response?.status;

      if (status === 400) {
        setError('email', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.EMAIL_CHECK_FAILED,
        });
        setError('password', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.PASSWORD_CHECK_FAILED,
        });
        setError('passwordConfirm', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.PASSWORD_CONFIRM_CHECK_FAILED,
        });
        return;
      }

      if (status === 409) {
        setError('email', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.DUPLICATE_EMAIL,
        });
        return;
      }

      alert(ERROR_MESSAGES.AUTH.SIGN_UP_FAILED);
    },

    onSuccess: () => {
      location.replace('/check-email');
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isPending) return;

    const userData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };

    mutate(userData);
    Cookies.set('email', data.email, { expires: 1, secure: true, sameSite: 'strict' });
  };

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
