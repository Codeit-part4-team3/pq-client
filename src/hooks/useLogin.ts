import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';
import Cookies from 'js-cookie';
import { useMutationPost } from 'src/apis/service/service';
import { URL } from 'src/constants/apiUrl';
import { LoginRequest, LoginResponse, LoginResponseBody } from 'src/pages/login/_type/type';

export const useLogin = (setError: UseFormSetError<FormValues>) => {
  const navigate = useNavigate();

  const { data, mutate, isPending } = useMutationPost<LoginResponse, LoginRequest>(`${URL.AUTH}/login`, {
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
      const { token } = data;
      const { accessToken, refreshToken } = token;

      if (accessToken && refreshToken) {
        Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' }); // TODO: 상태관리 라이브러리로 변경 예정
        Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
        navigate('/server');
        return;
      }
      throw new Error('토큰이 존재하지 않습니다.');
    },
  });

  return { data, mutate, isPending };
};
