import CreateChannelModal from 'src/components/modal/contents/CreateChannelModal';
import CreateCategoryModal from '../../../components/modal/contents/CreateCategoryModal';
import CreateServerModal from '../../../components/modal/contents/CreateServerModal';
import { useOpenModal } from '../../../hooks/useOpenModal';

export default function AdminServerModal() {
  const { isOpen, openModal, closeModal } = useOpenModal();
  const { isOpen: isCategoryOpen, openModal: openCategory, closeModal: closeCategory } = useOpenModal();
  const { isOpen: isChennelOpen, openModal: openChannel, closeModal: closeChannel } = useOpenModal();
  return (
    <div>
      <button onClick={openModal} type='button'>
        서버 생성
      </button>
      <CreateServerModal closeModal={closeModal} isOpen={isOpen} />
      <button onClick={openCategory} type='button'>
        카테고리 생성
      </button>
      <CreateCategoryModal closeModal={closeCategory} isOpen={isCategoryOpen} />
      <button onClick={openChannel} type='button'>
        채널 생성
      </button>
      <CreateChannelModal closeModal={closeChannel} isOpen={isChennelOpen} />
    </div>
  );
}
