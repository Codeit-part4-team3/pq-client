import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutationUserLogin } from 'src/apis/service/userService';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';
import Cookies from 'js-cookie';

interface UseLoginProps {
  setError: UseFormSetError<FormValues>;
}

export const useLogin = ({ setError }: UseLoginProps) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutationUserLogin({
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
      }

      alert(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
    },

    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' }); // TODO: 상태관리 라이브러리로 변경 예정
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      navigate('/server');
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (isLoading) {
      return;
    }

    const userData = {
      email: data.email,
      password: data.password,
    };

    mutate(userData);
  };

  return { onSubmit };
};
