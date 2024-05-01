import styled from 'styled-components';
import { scaleAnim } from 'src/GlobalStyles';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AddServerButton({ ...rest }: Props) {
  return (
    <Button {...rest} type='button'>
      <strong>+</strong>
    </Button>
  );
}

const Button = styled.button`
  width: 48px;
  height: 48px;

  border: 1px solid #cccccc;
  border-radius: 25%;
  background-color: #f1f8ff;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  transition: 0.2s;
  white-space: nowrap;

  &:hover {
    animation: 0.5s ease-in-out infinite alternate ${scaleAnim};
    cursor: pointer;
  }
`;
