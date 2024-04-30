import CreateCategoryModal from '../../../components/modal/contents/CreateCategoryModal';
import CreateServerModal from '../../../components/modal/contents/CreateServerModal';
import { useOpenModal } from '../../../hooks/useOpenModal';

export default function AdminServerModal() {
  const { isOpen, openModal, closeModal } = useOpenModal();
  const { isOpen: isCategoryOpen, openModal: openCategory, closeModal: closeCategory } = useOpenModal();
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
    </div>
  );
}
