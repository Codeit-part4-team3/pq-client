import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutationUserSignup } from 'src/apis/service/userService';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';

interface UseSignupProps {
  setError: UseFormSetError<FormValues>;
}

export const useSignup = ({ setError }: UseSignupProps) => {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutationUserSignup();

  const onSubmit = async (data: FormValues) => {
    if (isLoading) {
      return;
    }

    const userData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };

    try {
      const res = await signup(userData);
      console.log(res);
      navigate('/checkEmail');
    } catch (e) {
      const axiosError = e as AxiosError;
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

      console.log(e);
      alert(ERROR_MESSAGES.AUTH.SIGN_UP_FAILED);
      throw Error;
    }
  };

  return { onSubmit };
};
