import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  ctaText: string;
  closeClick?: () => void;
  closeText?: string;
  $bgColor?: string;
}

export default function ModalButtons({ ctaText, closeClick, closeText = '취소', ...rest }: Props) {
  return (
    <Area>
      <CloseButton type='button' onClick={closeClick}>
        {closeText}
      </CloseButton>
      <CtaButton $bgColor='#258dff' {...rest}>
        {ctaText}
      </CtaButton>
    </Area>
  );
}

const Area = styled.div`
  display: flex;
  gap: 16px;
`;

const CloseButton = styled.button`
  display: flex;
  width: 100%;
  padding: 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  background: #fff;

  &:hover {
    cursor: pointer;
    background: #d9d9d9;
  }
`;

const CtaButton = styled.button<{ $bgColor: string }>`
  color: #fff;
  display: flex;
  width: 100%;
  padding: 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${(props) => props.$bgColor};
  border: 1px solid ${(props) => props.$bgColor};
  outline: none;

  &:hover {
    cursor: pointer;
    background: #0056b3;
  }
`;
