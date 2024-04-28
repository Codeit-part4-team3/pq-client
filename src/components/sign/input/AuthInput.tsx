import styled from 'styled-components';
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormValues } from 'src/pages/signup/_types/type';
import OTPInput from './OtpInput';

interface AuthInputProps {
  control: Control<FormValues>;
  getValues?: UseFormGetValues<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  errors?: FieldErrors<FormValues>;
}

export default function AuthInput({ control, setValue, errors }: AuthInputProps) {
  const onComplete = (pin: string) => {
    setValue('otp', pin);
  };

  console.log('Errors on otp:', errors?.otp);

  return (
    <AuthInputContainer>
      <Label htmlFor='otp'>
        인증번호 입력<Span>*</Span>
      </Label>
      <AuthInputBox>
        <Controller
          control={control}
          name='otp'
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: ref, ...rest }) => <OTPInput {...rest} length={6} onComplete={onComplete} />}
        />
        {errors?.otp && <ErrorMessage>{errors['otp'].message}</ErrorMessage>}
      </AuthInputBox>
    </AuthInputContainer>
  );
}

const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AuthInputBox = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #666;
`;

const Span = styled.span`
  color: #258dff;
`;

const ErrorMessage = styled.p`
  color: #ff5b56;
  font-size: 12px;
  margin: 0 0 0 4px;
`;
