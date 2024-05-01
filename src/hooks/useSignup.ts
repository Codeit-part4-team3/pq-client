import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues, SignupRequest, SignupResponse } from 'src/pages/signup/_types/type';
import { UseFormSetError } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useMutationPost } from 'src/apis/service/service';
import { URL } from 'src/constants/apiUrl';

export const useSignup = (setError: UseFormSetError<FormValues>) => {
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
      location.replace('/checkEmail');
    },
  });

  return { mutate, isPending };
};
