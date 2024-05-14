import Modal from '../modal';
import { DeleteParagraph, ModalContainer, ModalTitle } from '../CommonStyles';
import ModalButtons from '../button/ModalButtons';
import { ModalProps } from 'src/types/modalType';

interface Props extends ModalProps {
  channelName: string;
  onDelete: () => void;
}

export default function DeleteChannelModal({ channelName, closeModal, isOpen, onDelete }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>채널 삭제하기</ModalTitle>
        <DeleteParagraph>
          {channelName}의 모든 내용이 삭제되며, 복원할 수 없습니다. 정말로 삭제하시겠습니까?
        </DeleteParagraph>
        <ModalButtons closeClick={closeModal} onClick={onDelete} ctaText='삭제' $hoverColor='#BA1A1A' $bgColor='red' />
      </ModalContainer>
    </Modal>
  );
}
