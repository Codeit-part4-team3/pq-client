import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import Modal from '../modal';
import styled from 'styled-components';
import ImageUploadBox from '../input/ImageUploadBox';
import ModalButtons from '../button/ModalButtons';

interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

export default function CreateServerModal({ closeModal, isOpen }: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

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
      <Container>
        <Title>서버 생성하기</Title>
        <Form onSubmit={handleSubmit}>
          <InputBox>
            <ServerSpan>서버 대표 이미지</ServerSpan>
            <ImageUploadBox imagePreviewUrl={imagePreviewUrl} onChange={handleImageChange} />
          </InputBox>
          <InputBox>
            <Label>
              서버 이름
              <EssentialSpan>*</EssentialSpan>
            </Label>
            <NameInput />
          </InputBox>
          <ModalButtons closeClick={closeModal} ctaText='생성' type='submit' />
        </Form>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`;
const Title = styled.h3`
  margin: 0 auto;
  color: #000;
  text-align: center;
  font-size: 24px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
`;

const Form = styled.form`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const ServerSpan = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Label = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const EssentialSpan = styled.span`
  color: #258dff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 16px;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
  background: #fff;
  &:focus {
    outline: none;
    border: 1px solid #258dff;
  }
`;
