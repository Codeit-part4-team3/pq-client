import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutationEmailVerify } from 'src/apis/service/userService';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';

interface UseCheckEmailProps {
  setError: UseFormSetError<FormValues>;
}

export const useCheckEmail = ({ setError }: UseCheckEmailProps) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutationEmailVerify({
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
      navigate('/login');
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (isLoading) {
      return;
    }

    const verificationCode = Object.values(data).join('');
    const email = localStorage.getItem('email'); // 임시

    const EmailVerifyData = {
      email: email as string,
      code: verificationCode,
    };

    mutate(EmailVerifyData);
  };

  return { onSubmit };
};
