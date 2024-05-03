import styled from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { SocialVariant } from 'src/types/buttonType';
import { ButtonNormal } from 'src/GlobalStyles';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: SocialVariant;
  src?: string;
  children?: ReactNode;
}

export default function SocialButton({ variant, src, children, ...rest }: SocialButtonProps) {
  return (
    <Button type='button' $variant={variant} {...rest}>
      <SocialLogo src={src} alt={`${variant} 아이콘`} />
      {children}
      <span></span>
    </Button>
  );
}

const Button = styled(ButtonNormal)<{ $variant: SocialVariant }>`
  width: 440px;
  height: 40px;
  font-size: 14px;

  background: ${({ $variant }) => ($variant === 'kakao' ? '#FFE812' : '#fff')};
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
