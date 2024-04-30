import { useNavigate } from 'react-router-dom';
import { useMutationUserSignup } from 'src/apis/service/userService';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';
import { UseFormSetError } from 'react-hook-form';
import { AxiosError } from 'axios';

interface UseSignupProps {
  setError: UseFormSetError<FormValues>;
}

export const useSignup = ({ setError }: UseSignupProps) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutationUserSignup({
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
      navigate('/checkEmail');
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isLoading) return;

    const userData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };

    localStorage.setItem('email', data.email); // 임시
    mutate(userData);
  };

  return { onSubmit, isLoading };
};
