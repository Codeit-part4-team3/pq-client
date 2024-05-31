import styled from 'styled-components';

import ChatMessages from './ChatMessages';
import ChatChannelIntro from './ChatChannelIntro';
import MessageLoadingSpinner from './MessageLoadingSpinner';
import useChatContainer from '../_hooks/useChatContainer';

export default function ChatContainer() {
  const {
    messages,
    editingMessage,
    setEditingMessage,
    currentEditingMessageId,
    handleUpdateMessageClick,
    handleDeleteMessageClick,
    handleUpdateMessageKeyDown,
    handleUpdateMessageCancelClick,
    handleEditingMessageChange,
    isNoMoreMessages,
    containerRef,
    infiniteScrollTriggerRef,
    lastKey,
  } = useChatContainer();

  return (
    <>
      <Container ref={containerRef}>
        {/* flex: column-reverse상태 */}
        {/* 가장 아래쪽 */}
        <ChatMessages
          messages={messages}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          currentEditingMessageId={currentEditingMessageId}
          onUpdateMessageClick={handleUpdateMessageClick}
          onDeleteMessageClick={handleDeleteMessageClick}
          onUpdateMessageKeyDown={handleUpdateMessageKeyDown}
          onUpdateMessageCancelClick={handleUpdateMessageCancelClick}
          onEditingMessageChange={handleEditingMessageChange}
        />
        {/* 채팅 가져오고 더이상 가져올 채팅이 없으면 보여주게할 컴포넌트 */}
        <ChatChannelIntro isNoMoreMessages={isNoMoreMessages} />
        {/* 무한 스크롤 로딩스피너 */}
        <MessageLoadingSpinner infiniteScrollTriggerRef={infiniteScrollTriggerRef} lastKey={lastKey} />
        {/* 가장 위쪽 */}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: calc(100%-1px);
  height: 100%;

  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;

  margin-left: 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;
