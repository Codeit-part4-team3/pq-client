import styled from 'styled-components';

interface Props {
  type?: string;
  placeholder?: string;
  id: string;
  label?: string;
}

export default function FormInput({ type = 'text', placeholder, id, label }: Props) {
  return (
    <Label htmlFor={id}>
      {label}
      <Input type={type} placeholder={placeholder} id={id} />
    </Label>
  );
}

const Label = styled.label`
  font-size: 12px;
`;

const Input = styled.input`
  width: 440px;
  height: 36px;
  padding: 7px 12px;
  margin-top: 8px;

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
