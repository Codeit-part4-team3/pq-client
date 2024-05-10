import styled, { keyframes } from 'styled-components';
import ChatMessages from 'src/pages/server/channel/chatChannel/_components/ChatMessages';
import UtilityButton from './_components/UtilityButton';
import useChatChannel from './_hook/ChatChannel.hook';

/**@Todo Channel 컴포넌트로 부터 channel date를 prop로 받고 데이터 바인딩 예정
 * 유저 데이터들 처리하는 로직 짜야함
 */
export default function ChatChannel() {
  const {
    serverUserData,
    messages,
    messageInputRef,
    isNoMoreMessages,
    chatContainerRef,
    infiniteScrollTriggerRef,
    lastKey,
    editinMessageInputRef,
    currentEditingMessageId,
    messageMaxLength,
    isClickedUtilityButton,
    handleUiilityButtonClick,
    handleSendMessageKeyDown,
    handleUpdateMessageClick,
    handleDeleteMessageClick,
    handleUpdateMessageKeyDown,
    handleUpdateMessageCancelClick,
  } = useChatChannel();
  return (
    <Wrapper>
      <ChatContainer ref={chatContainerRef}>
        {/* flex: column-reverse상태 */}
        {/* 가장 아래쪽 */}
        <ChatMessages
          serverUserData={serverUserData}
          messages={messages}
          editinMessageInputRef={editinMessageInputRef}
          currentEditingMessageId={currentEditingMessageId}
          onUpdateMessageClick={handleUpdateMessageClick}
          onDeleteMessageClick={handleDeleteMessageClick}
          onUpdateMessageKeyDown={handleUpdateMessageKeyDown}
          onUpdateMessageCancelClick={handleUpdateMessageCancelClick}
        />
        {/* 채팅 가져오고 더이상 가져올 채팅이 없으면 보여주게 하면될듯, 채널 데이터 필요 */}
        {isNoMoreMessages ? (
          <ChatChannelIntro>
            <ChannelName>{'# 채팅 채널1'}의 첫 시작 부분이에요</ChannelName>
            <CreationDate>생성일 : {'2024년 04월 11일'}</CreationDate>
          </ChatChannelIntro>
        ) : null}
        {/* 무한 스크롤 로딩 스피너 */}
        {lastKey ? (
          <>
            <ChatLoadingSpinner ref={infiniteScrollTriggerRef}>
              <Spinner delay='0s' />
              <Spinner delay='0.2s' />
              <Spinner delay='0.4s' />
            </ChatLoadingSpinner>
          </>
        ) : null}
        {/* 가장 위쪽 */}
      </ChatContainer>
      {/* 채팅 input */}
      <ChatInputBox>
        <ChatInput
          type='text'
          placeholder={`${'#채팅방 이름'}에 메시지 보내기`}
          ref={messageInputRef}
          onKeyDown={handleSendMessageKeyDown}
          maxLength={messageMaxLength}
        />
        <UtilityButton
          isClickedUtilityButton={isClickedUtilityButton}
          handleUiilityButtonClick={handleUiilityButtonClick}
        />
      </ChatInputBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;

const ChatContainer = styled.div`
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

const ChatChannelIntro = styled.div`
  margin-top: 495px;
  padding-left: 20px;
`;

const ChannelName = styled.h1`
  color: var(--black_000000);
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%; /* 32px */
  margin: 0;
`;

const CreationDate = styled.p`
  color: var(--gray_666666);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  margin: 0;
`;

const ChatInputBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  position: relative;
  margin-left: 20px;
  margin-right: 20px;
`;

const ChatInput = styled.input`
  border-radius: 10px;
  border: 1px solid var(--gray_CCCCCC);
  width: 100%;
  height: 48px;

  flex-shrink: 0;
  background: var(--white_FFFFFF);
  padding-left: 16px;
  padding-right: 12px;

  &:focus {
    outline: none;
    border: 1px solid #00bb83;
  }
`;

const ChatLoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const Spinner = styled.div<{ delay: string }>`
  margin: 8px;
  width: 12px;
  height: 12px;
  background-color: var(--black_000000);
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  animation-delay: ${(props) => props.delay};
`;
