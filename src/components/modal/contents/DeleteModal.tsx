import Modal from '../modal';
import { DeleteParagraph, ModalContainer, ModalTitle } from '../CommonStyles';
import ModalButtons from '../button/ModalButtons';
import { ModalProps } from 'src/types/modalType';

interface Props extends ModalProps {
  DeleteName: string;
  title: string;
  onDelete: () => void;
}

export default function DeleteModal({ title, DeleteName, closeModal, isOpen, onDelete }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>{title} 삭제하기</ModalTitle>
        <DeleteParagraph>
          {DeleteName}의 모든 내용이 삭제되며, 복원할 수 없습니다. 정말로 삭제하시겠습니까?
        </DeleteParagraph>
        <ModalButtons closeClick={closeModal} onClick={onDelete} ctaText='삭제' $hoverColor='#BA1A1A' $bgColor='red' />
      </ModalContainer>
    </Modal>
  );
}
