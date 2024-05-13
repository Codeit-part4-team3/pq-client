import styled from 'styled-components';
import UtilityButton from './UtilityButton';
import { ChatInputBoxProps } from '../../_types/props';

export default function ChatInputBox({
  messageInputRef,
  handleSendMessageKeyDown,
  messageMaxLength,
  isClickedUtilityButton,
  handleUiilityButtonClick,
}: ChatInputBoxProps) {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
