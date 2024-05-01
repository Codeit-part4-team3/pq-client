import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useMutationPost } from 'src/apis/service/service';
import { URL } from 'src/constants/apiUrl';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';

export const useCheckEmail = (setError: UseFormSetError<FormValues>) => {
  const { mutate, isPending } = useMutationPost(`${URL.AUTH}/signup/confirm`, {
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      const status = axiosError?.response?.status;

      if (status === 400) {
        setError('otp', {
          type: 'custom',
          message: ERROR_MESSAGES.AUTH.EMAIL_VERIFY_CHECK_FAILED,
        });

        return;
      }

      setError('otp', {
        type: 'custom',
        message: ERROR_MESSAGES.AUTH.EMAIL_VERIFY_FAILED,
      });
      alert(ERROR_MESSAGES.AUTH.EMAIL_VERIFY_FAILED);
    },

    onSuccess: () => {
      location.replace('/login');
    },
  });

  return { mutate, isPending };
};
