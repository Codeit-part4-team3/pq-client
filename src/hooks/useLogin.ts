import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';
import Cookies from 'js-cookie';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { LoginRequest, LoginResponse, LoginResponseBody } from 'src/pages/login/_type/type';

export const useLogin = (setError: UseFormSetError<FormValues>) => {
  const { data, mutate, isPending } = useMutationPost<LoginResponse, LoginRequest>(`${USER_URL.AUTH}/login`, {
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

      Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      location.replace('/server');
    },
  });

  return { data, mutate, isPending };
};
