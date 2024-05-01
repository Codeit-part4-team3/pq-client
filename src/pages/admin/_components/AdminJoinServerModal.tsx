import JoinServerModal from '../../../components/modal/contents/JoinServerModal';
import { useOpenModal } from '../../../hooks/useOpenModal';

export default function AdminJoinServerModal() {
  const { isOpen, openModal, closeModal } = useOpenModal();
  return (
    <div>
      <button onClick={openModal} type='button'>
        서버 참가하기
      </button>
      <JoinServerModal closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
}
