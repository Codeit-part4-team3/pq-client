import styled from 'styled-components';
import BaseButton from './Button';
import { ReactNode } from 'react';
import { ButtonSize, SocialVariant } from '../../types/buttonType';

interface Props {
  type: SocialVariant;
  icon?: string;
  children?: ReactNode;
  size: ButtonSize;
}

export default function SocialButton({ type, icon, children, size }: Props) {
  return (
    <Button type='button' variant='custom' size={size} icon={<SocialLogo src={icon} />} socialType={type}>
      {children}
    </Button>
  );
}

const Button = styled(BaseButton)<{ socialType: SocialVariant }>`
  color: #000;
  background: ${({ socialType }) => (socialType === 'kakao' ? '#FFE812' : '#fff')};
  border: 1px solid #f4f4f4;
`;

const SocialLogo = styled.img`
  width: 24px;
  height: 24px;
`;
