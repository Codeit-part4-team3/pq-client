import styled from 'styled-components';
import ChatDayDivider from './ChatDayDivider';
import ContextMenu from './ContextMenu';
import useChatContextMenu from '../_hooks/useChatContextMenu';
import { ChatMessagesProps } from '../_types/props';
import { formatMessageData } from '../_utils/formatMessageData';
import { useRef } from 'react';
import ChatMessageTextEditingBox from './ChatMessageTextEditingBox';
import { handleMessageTextEditingKeyDown } from '../_types/type';

export default function ChatMessages({
  serverUserData,
  messages,
  onUpdateMessageClick,
  onDeleteMessageClick,
  onUpdateMessageKeyDown,
  onUpdateMessageCancelClick,
  editingMessage,
  setEditingMessage,
  onEditingMessageChange,
  currentEditingMessageId,
}: ChatMessagesProps) {
  const { isContextMenuOpen, handleContextMenuOpen } = useChatContextMenu(setEditingMessage);
  // 다음 메시지의 유저와 현재 메시지의 유저가 다르면 true로 변경
  const isDifferentUserRef = useRef(false);

  // input창에서 enter키 또는 esc키 누를 때
  const handleMessageTextEditingKeyDown = ({ e, messageId, createdAt }: handleMessageTextEditingKeyDown) => {
    if (e.key === 'Enter') {
      onUpdateMessageKeyDown({ messageId, createdAt });
    } else if (e.key === 'Escape') {
      onUpdateMessageCancelClick({ messageId });
    }
  };

  if (!messages || messages.length === 0) return null;
  return (
    <>
      {messages.map((messageItem, index) => {
        const { user, messageCreatedAt, isDifferentDay, ChatDayDividerDay } = formatMessageData({
          serverUserData,
          messages,
          messageItem,
          index,
          isDifferentUserRef,
        });
        return (
          <>
            {isContextMenuOpen.isOpen ? (
              <ContextMenu
                {...isContextMenuOpen}
                onUpdateMessageClick={onUpdateMessageClick}
                onDeleteMessageClick={onDeleteMessageClick}
              />
            ) : null}
            {isDifferentUserRef ? (
              <>
                <ChatMessageWrapper
                  key={messageItem.messageId}
                  onContextMenu={handleContextMenuOpen(
                    messageItem.messageId,
                    messageItem.message,
                    messageItem.createdAt,
                  )}
                  isOnEdit={currentEditingMessageId === messageItem.messageId}
                >
                  <UserProfileImage>
                    <Image profileImage={user?.profileImage ? user.profileImage : '/images/minji-profile-image.png'} />
                  </UserProfileImage>
                  <ChatMessageContent>
                    <ChatMessageContentHeader>
                      <ChatMessageSender>{user?.nickname}</ChatMessageSender>
                      <ChatMessageCreatedAt>{messageCreatedAt}</ChatMessageCreatedAt>
                    </ChatMessageContentHeader>
                    {messageItem.status === 'editing' ? (
                      <ChatMessageTextEditingBox
                        messageItem={messageItem}
                        editingMessage={editingMessage}
                        onEditingMessageChange={onEditingMessageChange}
                        onUpdateKeyDown={onUpdateMessageKeyDown}
                        onUpdateCancelClick={onUpdateMessageCancelClick}
                        onKeyDown={handleMessageTextEditingKeyDown}
                      />
                    ) : (
                      <ChatMessageText>{messageItem.message}</ChatMessageText>
                    )}
                  </ChatMessageContent>
                </ChatMessageWrapper>
              </>
            ) : (
              <>
                {messageItem.status === 'editing' ? (
                  <SameUserMessage isOnEdit={currentEditingMessageId === messageItem.messageId}>
                    <ChatMessageTextEditingBox
                      messageItem={messageItem}
                      editingMessage={editingMessage}
                      onEditingMessageChange={onEditingMessageChange}
                      onUpdateKeyDown={onUpdateMessageKeyDown}
                      onUpdateCancelClick={onUpdateMessageCancelClick}
                      onKeyDown={handleMessageTextEditingKeyDown}
                    />
                  </SameUserMessage>
                ) : (
                  <SameUserMessage
                    key={messageItem.messageId}
                    onContextMenu={handleContextMenuOpen(
                      messageItem.messageId,
                      messageItem.message,
                      messageItem.createdAt,
                    )}
                    isOnEdit={currentEditingMessageId === messageItem.messageId}
                  >
                    <ChatMessageText>{messageItem.message}</ChatMessageText>
                  </SameUserMessage>
                )}
              </>
            )}
            {isDifferentDay ? <ChatDayDivider ChatDayDividerDay={ChatDayDividerDay} /> : null}
          </>
        );
      })}
    </>
  );
}

const ChatMessageWrapper = styled.div<{ isOnEdit: boolean }>`
  width: 100%;
  display: flex;
  gap: 12px;

  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;

  background-color: ${({ isOnEdit }) => (isOnEdit ? 'var(--light_blue_0)' : 'transparent')};

  &:hover {
    background-color: var(--light_blue_0);
  }
`;

const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img<{ profileImage: string }>`
  width: 100%;
  height: 100%;

  background-size: cover;
  background-image: url(${({ profileImage }) => (profileImage ? profileImage : '/images/minji-profile-image.png')});

  &:hover {
    cursor: pointer;
  }
`;

const ChatMessageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatMessageContentHeader = styled.div`
  display: flex;
  gap: 8px;
`;

const ChatMessageSender = styled.div`
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;

const ChatMessageCreatedAt = styled.div`
  color: var(--gray_666666);
  font-family: Pretendard;
  font-size: 10px;
  line-height: 160%; /* 16px */

  display: flex;
  align-items: center;
`;

const ChatMessageText = styled.p`
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 16px;
  line-height: 160%; /* 25.6px */
  margin: 0;
`;

const SameUserMessage = styled.div<{ isOnEdit: boolean }>`
  display: flex;
  padding-left: 72px;
  background-color: ${({ isOnEdit }) => (isOnEdit ? 'var(--light_blue_0)' : 'transparent')};

  &:hover {
    background-color: var(--light_blue_0);
  }
`;
