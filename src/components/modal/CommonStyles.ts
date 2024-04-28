import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
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
