import styled from 'styled-components';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import { FormValues } from 'src/pages/signup/_types/type';
import { useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { EmailInput, PasswordInput } from './LoginInputs';
import useUserStore from 'src/store/userStore';
import { AxiosError } from 'axios';
import { useMutationPost } from 'src/apis/service/service';
import { LoginRequest, LoginResponse, LoginResponseBody } from '../_type/type';
import { USER_URL } from 'src/constants/apiUrl';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAccessToken } = useUserStore();

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

  const { mutate, isPending } = useMutationPost<LoginResponse, LoginRequest>(`${USER_URL.AUTH}/login`, {
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
        alert(ERROR_MESSAGES.AUTH.INVALID_LOGIN);
        return;
      }

      alert(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
    },

    onSuccess: (data: LoginResponseBody) => {
      const { accessToken, refreshToken } = data.token;

      if (!accessToken || !refreshToken) {
        alert(ERROR_MESSAGES.AUTH.NO_TOKEN);
        throw new Error(ERROR_MESSAGES.AUTH.NO_TOKEN);
      }

      setAccessToken(accessToken);
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      navigate('/server');
    },
  });

  const onSubmit = (data: FormValues) => {
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;
