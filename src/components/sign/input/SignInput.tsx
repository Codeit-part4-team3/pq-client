import { HTMLInputTypeAttribute, forwardRef, useState } from 'react';
import styled from 'styled-components';
import { InputNormal } from 'src/GlobalStyles';
import { FieldErrors } from 'react-hook-form';
import { FormValues } from 'src/pages/signup/_types/type';

interface Props {
  id: keyof FormValues;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  errors?: FieldErrors<FormValues>;
}

const SignInput = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type = 'text', placeholder, errors, ...field }, ref) => {
    const [value, setValue] = useState('');
    const [inputTypeValue, setInputTypeValue] = useState(type);
    const [eyeIconSrc, setEyeIconSrc] = useState('');

    const handleEyeIconClick = () => {
      if (inputTypeValue === 'password') {
        setInputTypeValue('text');
        setEyeIconSrc('src/assets/images/eye-open.png');
        return;
      }
      setInputTypeValue('password');
      setEyeIconSrc('src/assets/images/eye-close.svg');
    };

    const visibilityToggleIcon = () => {
      if (id === 'password' || id === 'passwordConfirm') {
        return <EyeIcon src={eyeIconSrc} onClick={handleEyeIconClick} />;
      }
      return null;
    };

    return (
      <InputBox>
        <Label htmlFor={id}>
          {label}
          <Span>*</Span>
        </Label>
        <Input
          {...field}
          ref={ref}
          type={inputTypeValue}
          placeholder={placeholder}
          id={id}
          $error={errors?.[id]}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        {visibilityToggleIcon()}
        {errors?.[id]?.message && <ErrorMessage>{errors[id]?.message}</ErrorMessage>}
      </InputBox>
    );
  },
);

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 160%;
  margin-left: 4px;
`;

const Span = styled.span`
  color: #258dff;
`;

const Input = styled(InputNormal)<{ $error?: FieldErrors<FormValues> | undefined }>`
  // 수정: error 속성 추가
  width: 440px;
  height: 36px;
  padding: 7px 12px;
  margin-top: 8px;
  border: 1px solid ${(props) => (props.$error ? '#ff5b56' : '#eee')};
`;

const EyeIcon = styled.img`
  width: 18.333px;
  height: 15px;

  position: absolute;
  top: 0;
  right: 0;
`;

const ErrorMessage = styled.p`
  color: #ff5b56;
  font-size: 12px;
  margin: 0 0 0 4px;
`;

export default SignInput;
