import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';
import { InputNormal } from '/GlobalStyles';

interface Props {
  id: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}

export default function SignInput({ id, label, type, placeholder, onChange, onBlur, value }: Props) {
  return (
    <InputBox>
      <Label htmlFor={id}>
        {label}
        <Span>*</Span>
      </Label>
      <Input type={type} placeholder={placeholder} id={id} onChange={onChange} onBlur={onBlur} value={value} />
    </InputBox>
  );
}

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 160%;
  margin-left: 3px;
`;

const Span = styled.span`
  color: #258dff;
`;

const Input = styled(InputNormal)`
  width: 440px;
  height: 36px;
  padding: 7px 12px;
  margin-top: 8px;
`;
