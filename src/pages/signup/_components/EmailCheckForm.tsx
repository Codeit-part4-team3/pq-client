import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { ChangeEvent, useRef } from 'react';
import { SubmitButton } from '../../../components/signButton/SubmitButton';
import { ButtonNormal } from '../../../GlobalStyles';

export default function EmailCheckForm() {
  const { control, handleSubmit, getValues, setValue } = useForm();
  const onSubmit = (data: { [key: string]: string }) => {
    const verificationCode = Object.values(data).join('');
    console.log(verificationCode);
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 입력받도록 제한
    if (value === '' || /^[0-9]$/.test(value)) {
      const newFieldValues = { ...getValues() };
      newFieldValues[`digit-${index}`] = value;
      setValue(`digit-${index}`, value);

      // 만약 입력값이 최대 길이에 도달했으면 다음 인풋으로 이동
      if (index < 5 && value.length >= e.target.maxLength) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Label htmlFor='emailCheck'>
          인증번호 입력<Span>*</Span>
        </Label>
        <AuthInputContainer>
          {Array.from({ length: 6 }, (_, index) => (
            <Controller
              key={index}
              control={control}
              name={`digit-${index}`}
              defaultValue=''
              render={({ field }) => (
                <AuthInput
                  {...field}
                  ref={(el) => (inputRefs.current[index] = el)}
                  id={`emailCheck-${index}`}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  pattern='\d*'
                  onChange={handleInputChange(index)}
                />
              )}
            />
          ))}
        </AuthInputContainer>
      </InputContainer>
      <SubmitButton type='submit'>인증하기</SubmitButton>
      <PromptButton type='button'>메일 재전송</PromptButton>
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

const Label = styled.label`
  font-size: 12px;
  color: #666;
`;

const Span = styled.span`
  color: #258dff;
`;

const AuthInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const AuthInput = styled.input`
  width: 64px;
  height: 72px;
  padding: 18px 25px;
  margin-top: 8px;

  font-size: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  transition: 0.2s;
  white-space: nowrap;
`;

const PromptButton = styled(ButtonNormal)`
  height: 22px;
  margin-top: 20px;
  border: none;
  font-size: 14px;
`;
