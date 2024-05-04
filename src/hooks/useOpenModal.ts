import { useState } from 'react';

export const useOpenModal = () => {
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 관리
  const openModal = () => {
    setIsOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsOpen(false); // 모달 닫기
  };

  return { isOpen, openModal, closeModal };
};
