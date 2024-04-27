import styled from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { SocialVariant } from '../../types/buttonType';
import { ButtonNormal } from '../../GlobalStyles';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: SocialVariant;
  src?: string;
  children?: ReactNode;
}

export default function SocialButton({ variant, src, children }: SocialButtonProps) {
  return (
    <Button type='button' variant={variant}>
      <SocialLogo src={src} />
      {children}
      <span></span>
    </Button>
  );
}

const Button = styled(ButtonNormal)<{ variant: SocialVariant }>`
  width: 440px;
  height: 40px;
  font-size: 14px;

  background: ${({ variant }) => (variant === 'kakao' ? '#FFE812' : '#fff')};
  border: 1px solid #f4f4f4;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialLogo = styled.img`
  width: 24px;
  height: 24px;
`;
