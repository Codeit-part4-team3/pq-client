import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  ctaText: string;
  closeClick?: () => void;
  closeText?: string;
}

export default function ModalButtons({ ctaText, closeClick, closeText = '취소', ...rest }: Props) {
  return (
    <Container>
      <CloseButton type='button' onClick={closeClick}>
        {closeText}
      </CloseButton>
      <CtaButton {...rest}>{ctaText}</CtaButton>
    </Container>
  );
}

const Container = styled.div`
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
  cursor: pointer;
`;

const CtaButton = styled.button`
  color: #fff;
  display: flex;
  width: 100%;
  padding: 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #258dff;
  border: 1px solid #258dff;
  outline: none;
  cursor: pointer;
`;
