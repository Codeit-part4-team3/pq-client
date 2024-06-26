import styled from 'styled-components';
import ChatDayDivider from './ChatDayDivider';
import ContextMenu from './ContextMenu';
import { ChatMessagesProps } from '../_types/props';
import { formatMessageData } from '../_utils/formatMessageData';
import ChatMessageTextEditingBox from './ChatMessageTextEditingBox';
import useChatMessages from '../_hooks/useChatMessages';
import { ProfileImage, ProfileImageWrapper } from 'src/GlobalStyles';

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
  const { isContextMenuOpen, handleContextMenuOpen, isDifferentUserRef, handleMessageTextEditingKeyDown } =
    useChatMessages({
      onUpdateMessageKeyDown,
      onUpdateMessageCancelClick,
      setEditingMessage,
    });

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
                  <ProfileImageWrapper>
                    <ProfileImage $imageUrl={user?.imageUrl ? user.imageUrl : '/images/landing.webp'} />
                  </ProfileImageWrapper>
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
                      <ChatMessageText>
                        {messageItem.message}
                        {messageItem.notReadCount > 0 && <div>{messageItem.notReadCount}</div>}
                      </ChatMessageText>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  margin: 0;

  & > div {
    height: 12px;
    min-width: 12px;

    padding: 1px;
    border-radius: 4px;
    background-color: var(--primary_basic_color);
    font-size: 10px;
    color: var(--light_blue_0);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SameUserMessage = styled.div<{ isOnEdit: boolean }>`
  display: flex;
  padding-left: 72px;
  background-color: ${({ isOnEdit }) => (isOnEdit ? 'var(--light_blue_0)' : 'transparent')};

  &:hover {
    background-color: var(--light_blue_0);
  }
`;
