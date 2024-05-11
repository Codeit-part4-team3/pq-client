import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SignHeaderProps {
  children?: ReactNode;
}

export default function SignHeader({ children }: SignHeaderProps) {
  return (
    <Header>
      <Link to='/'>
        <Logo src='/images/logo.png' alt='pq 메인 로고' />
      </Link>
      {children}
    </Header>
  );
}

const Header = styled.h1`
  font-size: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const Logo = styled.img`
  width: 150px;
  font-style: normal;
`;
