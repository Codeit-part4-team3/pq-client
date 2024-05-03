import styled from 'styled-components';
import profileImage from '../../../../../../public/images/videoProfile.jfif';
import { MessageItem } from '../_types/type';
import extractDate from 'src/utils/extractDate';
import ChatDayDivider from './ChatDayDivider';

interface ChatMessagesProps {
  messages: MessageItem[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  let isDifferentUser = false;
  if (!messages || messages.length === 0) return null;
  return (
    <>
      {messages.map((messageItem, index) => {
        // 이전 유저와 현재 유저가 같다면 메시지만 렌더링한다
        isDifferentUser = messages[index - 1]?.message.userId !== messageItem.message.userId;

        // createdAt에서 날짜 데이터 추출
        const { year, month, day, hour, minute } = extractDate(messageItem.message.createdAt);
        //2024.04.22. 오후 9:31 형태
        const messageCreatedAt = `${year}.${month}.${day}. ${hour >= 12 ? '오후' : '오전'} ${hour % 12}:${minute}`;

        // 이전 날짜와 현재 날짜가 다르다면 날짜를 표시해주는 ChatDayDivider를 ChatMessageWrapper위에 렌더링
        const { day: prevDay } = extractDate(messages[index - 1]?.message.createdAt);
        const isDifferentDay = prevDay !== day;
        // 이전 날짜와 현재 날짜가 다르다면 isDifferentUser을 true로 변경하고 다시 프로필 사진들을 보여준다
        if (isDifferentDay) {
          isDifferentUser = true;
        }

        //2024년 04월 22일 형태
        const ChatDayDividerDay = `${year}년 ${month}월 ${day}일`;

        return (
          <>
            {isDifferentDay ? <ChatDayDivider ChatDayDividerDay={ChatDayDividerDay} /> : null}
            {isDifferentUser ? (
              <>
                <ChatMessageWrapper>
                  <UserProfileImage>
                    <img src={profileImage} alt='유저 프로필 이미지' />
                  </UserProfileImage>
                  <ChatMessageContent>
                    <ChatMessageContentHeader>
                      <ChatMessageSender>{messageItem.message.userId}</ChatMessageSender>
                      <ChatMessageCreatedAt>{messageCreatedAt}</ChatMessageCreatedAt>
                    </ChatMessageContentHeader>
                    <ChatMessageText>{messageItem.message.message}</ChatMessageText>
                  </ChatMessageContent>
                </ChatMessageWrapper>
              </>
            ) : (
              <SameUserMessage>
                <ChatMessageText>{messageItem.message.message}</ChatMessageText>
              </SameUserMessage>
            )}
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
`;

const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
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
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;

const ChatMessageCreatedAt = styled.div`
  color: #666;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 16px */

  display: flex;
  align-items: center;
`;

const ChatMessageText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  margin: 0;
`;

const SameUserMessage = styled.div`
  display: flex;
  padding-left: 52px;
`;
