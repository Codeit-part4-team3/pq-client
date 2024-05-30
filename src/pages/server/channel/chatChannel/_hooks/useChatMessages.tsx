import { useRef } from 'react';
import { handleMessageTextEditingKeyDown } from '../_types/type';
import useChatContextMenu from './useChatContextMenu';
import { useChatMessagesProps } from '../_types/props';

export default function useChatMessages({
  onUpdateMessageKeyDown,
  onUpdateMessageCancelClick,
  setEditingMessage,
}: useChatMessagesProps) {
  const { isContextMenuOpen, handleContextMenuOpen } = useChatContextMenu(setEditingMessage);
  // 다음 메시지의 유저와 현재 메시지의 유저가 다르면 true로 변경
  const isDifferentUserRef = useRef(false);

  // input창에서 enter키 또는 esc키 누를 때 사용하는 함수
  const handleMessageTextEditingKeyDown = ({ e, messageId, createdAt }: handleMessageTextEditingKeyDown) => {
    if (e.key === 'Enter') {
      onUpdateMessageKeyDown({ messageId, createdAt });
    } else if (e.key === 'Escape') {
      onUpdateMessageCancelClick({ messageId });
    }
  };
  return {
    isContextMenuOpen,
    handleContextMenuOpen,
    isDifferentUserRef,
    handleMessageTextEditingKeyDown,
  };
}
