import styled from 'styled-components';
import profileImage from '../../../../../../public/images/minji-profile-image.png';
import { MessageItem } from '../_types/type';
import extractDate from 'src/utils/extractDate';
import ChatDayDivider from './ChatDayDivider';
import addZero from 'src/utils/addZero';
import { useState } from 'react';
import ContextMenu from './ContextMenu';

interface ChatMessagesProps {
  messages: MessageItem[];
  onUpdateMessageClick: ({ messageId }: { messageId: string }) => void;
  onDeleteMessageClick: ({ messageId }: { messageId: string }) => void;
}

// 오른쪽 클릭시 메뉴창 뜨게하기
// update, delete 기능 추가
// id를 어떻게 받을 것인가?

interface ContextMenu {
  isOpen: boolean;
  positionX: number;
  positionY: number;
  messageId: string;
}

export default function ChatMessages({ messages, onUpdateMessageClick, onDeleteMessageClick }: ChatMessagesProps) {
  // 마우스 오른쪽 클릭시 메뉴창 뜨게 하기
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<ContextMenu>({
    isOpen: false,
    positionX: 0,
    positionY: 0,
    messageId: '',
  });

  const handleContextMenuOpen = (messageId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('right click');
    e.preventDefault();
    setIsContextMenuOpen((prev) => {
      return {
        ...prev,
        isOpen: !isContextMenuOpen.isOpen,
        positionX: e.clientX,
        positionY: e.clientY,
        messageId,
      };
    });
  };

  let isDifferentUser = false;

  if (!messages || messages.length === 0) return null;
  return (
    <>
      {isContextMenuOpen.isOpen ? (
        <ContextMenu
          {...isContextMenuOpen}
          onUpdateMessageClick={onUpdateMessageClick}
          onDeleteMessageClick={onDeleteMessageClick}
        />
      ) : null}
      {messages.map((messageItem, index) => {
        // 다음 메시지의 유저와 현재 메시지의 유저가 다르면 true로 변경
        isDifferentUser = messages[index + 1]?.userId !== messageItem.userId;

        // createdAt에서 날짜 데이터 추출
        const { year, month, day, hour, minute } = extractDate(messageItem.createdAt);
        //2024.04.22. 오후 09:31 형태
        const messageCreatedAt = `${year}.${addZero(month)}.${addZero(day)}. ${hour >= 12 ? '오후' : '오전'} ${hour % 12}:${addZero(minute)}`;

        // 다음 날짜와 현재 날짜가 다르다면 ChatDayDivider를 보여준다
        const { day: nextDay } = extractDate(messages[index + 1]?.createdAt);
        const isDifferentDay = nextDay !== day;
        // 다음 날짜와 현재 날짜가 다르면 isDifferentUser를 true로 변경해서 사용자 프로필 이미지를 보여준다
        if (isDifferentDay) {
          isDifferentUser = true;
        }

        // 2024년 04월 22일 (화) 헝태
        const ChatDayDividerDay = `${year}년 ${addZero(month)}월 ${addZero(day)}일 (${'일월화수목금토'[new Date(`${year}-${month}-${day}`).getDay()]})`;

        return (
          <>
            {isDifferentUser ? (
              <>
                <ChatMessageWrapper
                  key={messageItem.messageId}
                  onContextMenu={handleContextMenuOpen(messageItem.messageId)}
                >
                  <UserProfileImage>
                    <img src={profileImage} alt='유저 프로필 이미지' />
                  </UserProfileImage>
                  <ChatMessageContent>
                    <ChatMessageContentHeader>
                      <ChatMessageSender>{messageItem.userId}</ChatMessageSender>
                      <ChatMessageCreatedAt>{messageCreatedAt}</ChatMessageCreatedAt>
                    </ChatMessageContentHeader>
                    <ChatMessageText>{messageItem.message}</ChatMessageText>
                  </ChatMessageContent>
                </ChatMessageWrapper>
              </>
            ) : (
              <SameUserMessage key={messageItem.messageId} onContextMenu={handleContextMenuOpen(messageItem.messageId)}>
                <ChatMessageText>{messageItem.message}</ChatMessageText>
              </SameUserMessage>
            )}
            {isDifferentDay ? <ChatDayDivider ChatDayDividerDay={ChatDayDividerDay} /> : null}
          </>
        );
      })}
    </>
  );
}

const ChatMessageWrapper = styled.div`
  display: flex;
  gap: 12px;

  margin-top: 20px;

  &:hover {
    background-color: #fafafa;
  }
`;

const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;

  img {
    border-radius: 4px;
    border: 1px solid var(--gray_EEEEEE);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChatMessageContent = styled.div`
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

const SameUserMessage = styled.div`
  display: flex;
  padding-left: 52px;

  &:hover {
    background-color: #fafafa;
  }
`;
