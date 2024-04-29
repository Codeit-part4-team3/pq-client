import CreateServerModal from '../../../components/modal/contents/CreateServerModal';
import { useOpenModal } from '../../../hooks/useOpenModal';

export default function AdminServerModal() {
  const { isOpen, openModal, closeModal } = useOpenModal();
  return (
    <div>
      <button onClick={openModal} type='button'>
        서버 생성
      </button>
      <CreateServerModal closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
}
