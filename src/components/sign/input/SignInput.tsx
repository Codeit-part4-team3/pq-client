import { HTMLInputTypeAttribute, forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputNormal } from 'src/GlobalStyles';
import { FieldErrors } from 'react-hook-form';
import { FormValues } from 'src/pages/signup/_types/type';

interface SignInputProps {
  id: keyof FormValues;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  errors?: FieldErrors<FormValues>;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, label, type = 'text', placeholder, errors, ...field }, ref) => {
    const [inputTypeValue, setInputTypeValue] = useState(type);
    const [isPassword, setIsPassword] = useState(false);
    const [eyeIconSrc, setEyeIconSrc] = useState('src/assets/images/eye-close.svg');

    const handleEyeIconClick = () => {
      setInputTypeValue(inputTypeValue === 'password' ? 'text' : 'password');
      setEyeIconSrc(
        inputTypeValue === 'password' ? 'src/assets/images/eye-open.png' : 'src/assets/images/eye-close.svg',
      );
    };

    useEffect(() => {
      if (type === 'password') {
        setIsPassword(true);
        return;
      }
      setIsPassword(false);
    }, []);

    return (
      <InputBox>
        <Label htmlFor={id}>
          {label}
          <Span>*</Span>
        </Label>
        <Box>
          <Input {...field} ref={ref} type={inputTypeValue} placeholder={placeholder} id={id} $error={!!errors?.[id]} />
          {isPassword && <EyeIcon src={eyeIconSrc} onClick={handleEyeIconClick} />}
        </Box>
        {errors?.[id]?.message && <ErrorMessage>{errors[id]?.message}</ErrorMessage>}
      </InputBox>
    );
  },
);

export default SignInput;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 160%;
  margin-left: 4px;
`;

const Span = styled.span`
  color: #258dff;
`;

const Box = styled.div`
  position: relative;
`;

const Input = styled(InputNormal)<{ $error?: boolean }>`
  width: 440px;
  height: 36px;
  padding: 7px 12px;
  margin-top: 8px;
  border: 1px solid ${({ $error }) => ($error ? '#ff5b56' : '#eee')};
`;

const EyeIcon = styled.img`
  width: 18.333px;
  height: 15px;

  position: absolute;
  bottom: 10px;
  right: 13px;
`;

const ErrorMessage = styled.p`
  color: #ff5b56;
  font-size: 12px;
  margin: 0 0 0 4px;
`;
