import styled from 'styled-components';
import { InputNormal } from 'src/GlobalStyles';
import { ChangeEvent, useRef } from 'react';
import { Control, Controller, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormValues } from 'src/pages/signup/_types/type';

interface AuthInputProps {
  control: Control<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export default function AuthInput({ control, getValues, setValue }: AuthInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 입력받도록 제한
    if (value === '' || /^[0-9]$/.test(value)) {
      const newFieldValues = { ...getValues() };
      newFieldValues[`digit-${index}` as keyof FormValues] = value;
      setValue(`digit-${index}` as keyof FormValues, value);

      // 만약 입력값이 최대 길이에 도달했으면 다음 인풋으로 이동
      if (index < 5 && value.length >= e.target.maxLength) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    // 백스페이스를 눌렀을 때 이전 인풋으로 이동
    if (e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === 'deleteContentBackward') {
      if (index > 0) {
        setValue(`digit-${index}` as keyof FormValues, '');
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <AuthInputContainer>
      <Label htmlFor='emailCheck'>
        인증번호 입력<Span>*</Span>
      </Label>
      <AuthInputBox>
        {Array.from({ length: 6 }, (_, index) => (
          <Controller
            key={index}
            control={control}
            name={`digit-${index}` as keyof FormValues}
            defaultValue=''
            render={({ field }) => (
              <Input
                {...field}
                value={field.value}
                ref={(el) => {
                  inputRefs.current[index] = el;
                  field.ref(el);
                }}
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #666;
`;

const Span = styled.span`
  color: #258dff;
`;

const Input = styled(InputNormal)`
  width: 64px;
  height: 72px;
  padding: 18px 25px;
  font-size: 20px;
`;
