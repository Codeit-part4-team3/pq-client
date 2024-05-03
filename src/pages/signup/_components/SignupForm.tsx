import styled from 'styled-components';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import TermOfUse from './TermOfUse';
import { FormValues, SignupRequest, SignupResponse } from '../_types/type';
import { useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { EmailInput, PasswordConfirmInput, PasswordInput, NicknameInput } from './SignupInputs';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'src/store/userStore';

export default function SignupForm() {
  const navigate = useNavigate();
  const { setEmail } = useUserStore();

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

  const { mutate, isPending } = useMutationPost<SignupResponse, SignupRequest>(`${USER_URL.AUTH}/signup`, {
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
      navigate('/check-email', { replace: true });
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
    setEmail(data.email);
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
