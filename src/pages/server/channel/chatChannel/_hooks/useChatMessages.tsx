import { useRef } from 'react';
import { handleMessageTextEditingKeyDown, User } from '../_types/type';
import useChatContextMenu from './useChatContextMenu';
import { useChatMessagesProps } from '../_types/props';
import useUserStore from 'src/store/userStore';
import { useParams } from 'react-router-dom';
import { useQueryGet } from 'src/apis/service/service';

export default function useChatMessages({
  onUpdateMessageKeyDown,
  onUpdateMessageCancelClick,
  setEditingMessage,
}: useChatMessagesProps) {
  // 유저, 서버, 채널 데이터
  const { userInfo } = useUserStore();
  const { id: userId } = userInfo;
  const { serverId } = useParams();

  // 서버내의 모든 유저 데이터
  const { data: serverUserData } = useQueryGet<User[]>('getServerAllUser', `/chat/v1/server/${serverId}/users`, {
    staleTime: 5000,
    refetchInterval: 5000,
    enabled: !!userId,
  });

  // 마우스 오른쪽 버튼 클릭시 나오는 컨텍스트 버튼
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
    serverUserData,
  };
}
