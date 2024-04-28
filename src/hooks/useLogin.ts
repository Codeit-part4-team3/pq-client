import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutationUserLogin } from 'src/apis/service/userService';
import { ERROR_MESSAGES } from 'src/constants/error';
import { FormValues } from 'src/pages/signup/_types/type';

interface UseLoginProps {
  setError: UseFormSetError<FormValues>;
}

export const useLogin = ({ setError }: UseLoginProps) => {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutationUserLogin();

  const onSubmit = async (data: FormValues) => {
    if (isLoading) {
      return;
    }

    const userData = {
      email: data.email,
      password: data.password,
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
        return;
      }

      console.log(e);
      alert(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
      throw Error;
    }
  };

  return { onSubmit };
};
