import { ReactNode } from 'react';
import styled from 'styled-components';

interface SignHeaderProps {
  children?: ReactNode;
}

export default function SignHeader({ children }: SignHeaderProps) {
  return (
    <Header>
      <Logo src='src/assets/images/logo.svg' />
      {children}
    </Header>
  );
}

const Header = styled.h1`
  font-size: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
`;

const Logo = styled.img`
  padding: 8px 12px;

  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  font-style: normal;
`;
