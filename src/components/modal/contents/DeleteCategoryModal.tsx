import { ModalProps } from 'src/types/modalType';
import Modal from '../modal';
import { DeleteParagraph, ModalContainer, ModalTitle } from '../CommonStyles';

import ModalButtons from '../button/ModalButtons';

interface Props extends ModalProps {
  categoryName: string;
  channelId: number;
}

export default function DeleteCategoryModal({ closeModal, isOpen, categoryName, channelId }: Props) {
  const onDelete = () => {
    console.log(channelId);
    // 로직 추가예정
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>카테고리 삭제하기</ModalTitle>
        <DeleteParagraph>
          {categoryName}의 모든 채널이 삭제되며, 복원할 수 없습니다. 정말로 삭제하시겠습니까?
        </DeleteParagraph>
        <ModalButtons closeClick={closeModal} onClick={onDelete} ctaText='삭제' $bgColor='#BA1A1A' />
      </ModalContainer>
    </Modal>
  );
}
