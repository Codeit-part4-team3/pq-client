import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <Content>{children}</Content>
      </ModalWrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  /* Add your modal-overlay styles here */
`;

const ModalWrapper = styled.div`
  /* Add your modal styles here */
`;

const CloseButton = styled.button`
  /* Add your modal-close-btn styles here */
`;

const Content = styled.div`
  /* Add your modal-content styles here */
`;

export default Modal;
