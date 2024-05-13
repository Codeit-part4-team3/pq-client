import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
  background-color: var(--landing_background_color);
`;

export const ModalForm = styled.form`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ModalTitle = styled.h3`
  margin: 0 auto;
  color: #000;
  text-align: center;
  font-size: 24px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
`;

export const ModalInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const ModalInputLabel = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const NameInput = styled.input`
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

export const EssentialSpan = styled.span`
  color: #258dff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DeleteParagraph = styled.p`
  margin: 0;
  max-width: 480px;
  color: var(--black-1a1a1a, #1a1a1a);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;
