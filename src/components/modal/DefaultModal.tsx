import { ModalProps } from 'src/types/modalType';
import styled from 'styled-components';
import ModalButtons from './button/ModalButtons';
import { ModalContainer } from './CommonStyles';
import Modal from './modal';

interface Props extends ModalProps {
  title: string;
  desc: string;
  okClick?: () => void;
}

export default function DefaultModal({ okClick, closeModal, isOpen, title, desc }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <Body>
          <strong>{title}</strong>
          <span>{desc}</span>

          <ModalButtons ctaText='확인' okClick={okClick} closeClick={closeModal} />
        </Body>
      </ModalContainer>
    </Modal>
  );
}

const Body = styled.div`
  width: 416px;

  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
