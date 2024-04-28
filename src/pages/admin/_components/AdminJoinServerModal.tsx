import { useState } from 'react';
import JoinServerModal from '../../../components/modal/contents/JoinServerModal';

export default function AdminJoinServerModal() {
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 관리
  const openModal = () => {
    setIsOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsOpen(false); // 모달 닫기
  };
  return (
    <div>
      <button onClick={openModal} type='button'>
        서버 참가하기
      </button>
      <JoinServerModal closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
}
