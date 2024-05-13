import Modal from '../modal';
import { DeleteParagraph, ModalContainer, ModalTitle } from '../CommonStyles';
import ModalButtons from '../button/ModalButtons';
import { ModalProps } from 'src/types/modalType';

interface Props extends ModalProps {
  channelName: string;
  channelId: number;
}

export default function DeleteChannelModal({ channelName, closeModal, isOpen, channelId }: Props) {
  const onDelete = () => {
    // 로직 추가 예정
    console.log(channelId);
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>채널 삭제하기</ModalTitle>
        <DeleteParagraph>
          {channelName}의 모든 내용이 삭제되며, 복원할 수 없습니다. 정말로 삭제하시겠습니까?
        </DeleteParagraph>
        <ModalButtons closeClick={closeModal} onClick={onDelete} ctaText='삭제' $bgColor='#BA1A1A' />
      </ModalContainer>
    </Modal>
  );
}
