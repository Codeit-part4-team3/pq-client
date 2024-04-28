import { FormEventHandler, useState } from 'react';
import { ModalProps } from '../../../types/modalType';
import ModalButtons from '../button/ModalButtons';
import EssentialInput from '../input/EssentialInput';
import Modal from '../modal';
import { ModalContainer, ModalForm, ModalInputBox, ModalTitle } from './../CommonStyles';
import styled from 'styled-components';

export default function JoinServerModal({ closeModal, isOpen }: ModalProps) {
  const [link, setLink] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // 임시 링크
    if (link == '링크') {
      setIsSuccess(true);
      return;
    }
    // 예외 처리
  };

  const handleClick = () => {
    console.log('참가 완료~');
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>서버 참가하기</ModalTitle>
        {isSuccess ? (
          <>
            <Image src='/public/images/plus.svg' alt='서버 이미지' />
            <ServerName>서버명입니다.</ServerName>
            <ModalButtons closeClick={closeModal} ctaText='참가' type='button' onClick={handleClick} />
          </>
        ) : (
          <ModalForm onSubmit={handleSubmit}>
            <ModalInputBox>
              <EssentialInput labelName='초대 링크' state={link} setState={setLink} />
            </ModalInputBox>
            <ModalButtons closeClick={closeModal} ctaText='다음' type='submit' />
          </ModalForm>
        )}
      </ModalContainer>
    </Modal>
  );
}

const Image = styled.img`
  margin: 0 auto;
  width: 100px;
  height: 100px;
`;

const ServerName = styled.span`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 476px;
`;
