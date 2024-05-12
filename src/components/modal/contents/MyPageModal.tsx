import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import useUserStore from 'src/store/userStore';
import { ModalContainer, ModalForm, ModalInputBox, ModalInputLabel, ModalTitle, NameInput } from '../CommonStyles';
import ImageUploadBox from '../input/ImageUploadBox';
import Modal from '../modal';
import { ModalProps } from 'src/types/modalType';
import ModalButtons from '../button/ModalButtons';
import axiosInstance from 'src/apis/instance/axiosInstance';
import { USER_URL } from 'src/constants/apiUrl';
import styled from 'styled-components';

export default function MyPageModal({ closeModal, isOpen }: ModalProps) {
  const { userInfo, setUserInfo } = useUserStore();
  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(userInfo.imageUrl || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  //   const [state, setState] = useState<string>(userInfo.state || '');

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.put(
      `${USER_URL.USER}/me/update`,
      { nickname, imageFile },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    if (res.status === 200) {
      setUserInfo(res.data);
    }
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
      setImageFile(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalContainer>
        <Title>마이페이지</Title>
        <ModalForm onSubmit={onSubmit}>
          <InputBox>
            <ModalInputLabel>프로필 이미지</ModalInputLabel>
            <ImageUploadBox imagePreviewUrl={imagePreviewUrl} onChange={handleImageChange} />
          </InputBox>
          <InputBox>
            <ModalInputLabel>닉네임</ModalInputLabel>
            <NickNameInput
              type='text'
              value={nickname}
              placeholder={userInfo.nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </InputBox>
          <ModalButtons ctaText='수정하기' closeClick={closeModal} />
        </ModalForm>
      </ModalContainer>
    </Modal>
  );
}

const InputBox = styled(ModalInputBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(ModalTitle)`
  animation: myAnimation 1s ease-in-out infinite;

  @keyframes myAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const NickNameInput = styled(NameInput)`
  border: 2px solid #ccc;
  padding: 10px;
  font-size: 16px;
  width: 50%;

  &::placeholder {
    color: #999;
  }
`;
