import { useEffect, useState } from 'react';
import { IContextMenu } from '../../_types/type';

export default function useChatContextMenu(setEditingMessage: React.Dispatch<React.SetStateAction<string>>) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<IContextMenu>({
    isOpen: false,
    positionX: 0,
    positionY: 0,
    messageId: '',
    message: '',
    createdAt: 0,
  });

  // message에 대고 우클릭하면 ContextMenu가 열리게 하기
  const handleContextMenuOpen =
    (messageId: string, message: string, createdAt: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      console.log('right click');
      e.preventDefault();
      setIsContextMenuOpen(() => {
        return {
          isOpen: !isContextMenuOpen.isOpen,
          positionX: e.clientX,
          positionY: e.clientY,
          messageId,
          message,
          createdAt,
        };
      });
      setEditingMessage(message);
    };

  // ContextMenu가 열려있을 때만 handleContextMenuClose 이벤트리스너 추가
  useEffect(() => {
    const handleContextMenuClose = () => {
      setIsContextMenuOpen({
        isOpen: false,
        positionX: 0,
        positionY: 0,
        messageId: '',
        message: '',
        createdAt: 0,
      });
    };

    if (isContextMenuOpen.isOpen) {
      document.addEventListener('click', handleContextMenuClose);
    } else {
      document.removeEventListener('click', handleContextMenuClose);
    }

    // 메모리 누수 방지를 위해 이벤트리스너 제거
    return () => {
      document.removeEventListener('click', handleContextMenuClose);
    };
  }, [isContextMenuOpen]);
  return {
    isContextMenuOpen,
    handleContextMenuOpen,
  };
}
