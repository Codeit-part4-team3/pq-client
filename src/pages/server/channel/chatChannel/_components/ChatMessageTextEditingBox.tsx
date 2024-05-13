import styled from 'styled-components';
import { ChatMessageTextEditingBoxProps } from '../_types/props';

export default function ChatMessageTextEditingBox({
  messageItem,
  editingMessage,
  onEditingMessageChange,
  onUpdateKeyDown,
  onUpdateCancelClick,
  onKeyDown,
}: ChatMessageTextEditingBoxProps) {
  return (
    <Wrapper>
      <Input
        value={editingMessage}
        onChange={onEditingMessageChange}
        onKeyDown={(e) => {
          onKeyDown({ e, messageId: messageItem.messageId, createdAt: messageItem.createdAt });
        }}
      />
      <Description>
        ESC 키로
        <button
          onClick={() => {
            onUpdateCancelClick({ messageId: messageItem.messageId });
          }}
        >
          취소
        </button>
        • Enter 키로
        <button
          onClick={() => {
            onUpdateKeyDown({
              messageId: messageItem.messageId,
              createdAt: messageItem.createdAt,
            });
          }}
        >
          저장
        </button>
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 52px;

  margin-top: 6px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 8px;
  font-family: pretendard;
  font-size: 16px;
  outline: none;
  padding: 12px 18px;

  background-color: var(--landing_background_color);
`;

const Description = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  padding-bottom: 6px;

  button {
    background-color: transparent;
    border: none;
    color: var(--light_blue_5);
    font-weight: 700;
    cursor: pointer;
  }
`;
