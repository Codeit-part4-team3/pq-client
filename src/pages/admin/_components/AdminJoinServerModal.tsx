import DeleteCategoryModal from 'src/components/modal/contents/DeleteCategoryModal';
import JoinServerModal from '../../../components/modal/contents/JoinServerModal';
import { useOpenModal } from '../../../hooks/useOpenModal';
import DeleteChannelModal from 'src/components/modal/contents/DeleteChannelModal';

export default function AdminJoinServerModal() {
  const { isOpen, openModal, closeModal } = useOpenModal();
  const { isOpen: isDC, openModal: openDC, closeModal: closeDC } = useOpenModal();
  return (
    <div>
      <button onClick={openModal} type='button'>
        서버 참가하기
      </button>
      <button onClick={openDC} type='button'>
        채널 삭제하기
      </button>
      <JoinServerModal closeModal={closeModal} isOpen={isOpen} />
      <DeleteChannelModal channelId={1} channelName='테스트  ' closeModal={closeDC} isOpen={isDC} />
    </div>
  );
}
