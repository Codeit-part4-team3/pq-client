import styled from 'styled-components';

interface ContextMenuProps {
  positionX: number;
  positionY: number;
  messageId: string;
  createdAt: number;
  onDeleteMessageClick: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
  onUpdateMessageClick: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
}

export default function ContextMenu({
  positionX,
  positionY,
  messageId,
  createdAt,
  onDeleteMessageClick,
  onUpdateMessageClick,
}: ContextMenuProps) {
  return (
    <Wrapper positionX={positionX} positionY={positionY}>
      <Item
        onClick={() => {
          onDeleteMessageClick({ messageId, createdAt });
        }}
      >
        메시지 삭제하기
      </Item>
      <Item
        onClick={() => {
          onUpdateMessageClick({ messageId, createdAt });
        }}
      >
        메시지 수정하기
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  positionX: number;
  positionY: number;
}>`
  border: 1px solid var(--text_gray);
  border-radius: 10px;
  width: 220px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;

  position: absolute;
  top: ${({ positionY }) => positionY}px;
  left: ${({ positionX }) => positionX}px;
  cursor: pointer;
`;

const Item = styled.div`
  width: 100%;
  color: var(--gray-666666, #666);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  background-color: var(--white_FFFFFF, #fff);
  padding: 6px 12px;

  &:hover {
    background-color: var(----gray_EEEEEE, #eee);
  }
`;
