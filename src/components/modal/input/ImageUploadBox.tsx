import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  imagePreviewUrl: string;
  onChange: ChangeEventHandler;
}

export default function ImageUploadBox({ imagePreviewUrl, onChange }: Props) {
  return (
    <ImageLabel htmlFor='image-upload'>
      {imagePreviewUrl ? <ImagePreview src={imagePreviewUrl} alt='이미지 프리뷰' /> : <div>+</div>}

      <ImageInput type='file' id='image-upload' accept='image/*' onChange={onChange} />
    </ImageLabel>
  );
}

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  display: flex;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer; /* 커서 모양 변경 */
  border-radius: 10px;
  border: 1px solid #b3b3b3;
  background: #fff;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  width: 100%; /* 라벨 크기에 맞춤 */
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하면서 라벨 크기에 맞춤 */
`;
