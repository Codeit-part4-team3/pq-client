import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { SubmitButton } from 'src/components/sign/button/SignSubmitButton';
import { ButtonNormal } from 'src/GlobalStyles';
import AuthInput from 'src/components/sign/input/AuthInput';
import { FormValues } from '../_types/type';
import { useMutationPost } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from 'src/constants/error';
import useUserStore from 'src/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function EmailCheckForm() {
  const navigate = useNavigate();
  const { email } = useUserStore();

  useEffect(() => {
    if (email === '') {
      navigate('/login');
    }
  }, []);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const resentCodeMutation = useMutationPost(`${USER_URL.AUTH}/signup/resend`, {});

  const { mutate, isPending } = useMutationPost(`${USER_URL.AUTH}/signup/confirm`, {
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

  const onSubmit = (data: FormValues) => {
    if (isPending) {
      return;
    }

    const verificationCode = Object.values(data).join('');

    const EmailVerifyData = {
      email: email,
      code: verificationCode,
    };

    mutate(EmailVerifyData);
  };

  const onResend = () => {
    resentCodeMutation.mutate({ email });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput control={control} getValues={getValues} setValue={setValue} errors={errors} />
      </InputContainer>
      <SubmitButton type='submit'>인증하기</SubmitButton>
      <PromptButton onClick={onResend} type='button'>
        메일 재전송
      </PromptButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
`;

const PromptButton = styled(ButtonNormal)`
  height: 22px;
  margin-top: 20px;
  border: none;
  font-size: 14px;
  background-color: transparent;
`;
