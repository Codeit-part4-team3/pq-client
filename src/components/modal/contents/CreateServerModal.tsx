import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import Modal from '../modal';
import styled from 'styled-components';
import ImageUploadBox from '../input/ImageUploadBox';
import ModalButtons from '../button/ModalButtons';
import { ModalProps } from '../../../types/modalType';
import { ModalContainer, ModalForm, ModalInputBox, ModalTitle } from './../CommonStyles';
import EssentialInput from '../input/EssentialInput';

export default function CreateServerModal({ closeModal, isOpen }: ModalProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [serverName, setServerName] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleImageChange: ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();

    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <ModalTitle>서버 생성하기</ModalTitle>
        <ModalForm onSubmit={handleSubmit}>
          <ModalInputBox>
            <ServerSpan>서버 대표 이미지</ServerSpan>
            <ImageUploadBox imagePreviewUrl={imagePreviewUrl} onChange={handleImageChange} />
          </ModalInputBox>
          <ModalInputBox>
            <EssentialInput labelName='서버이름' state={serverName} setState={setServerName} />
          </ModalInputBox>
          <ModalButtons closeClick={closeModal} ctaText='생성' type='submit' />
        </ModalForm>
      </ModalContainer>
    </Modal>
  );
}

const ServerSpan = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
