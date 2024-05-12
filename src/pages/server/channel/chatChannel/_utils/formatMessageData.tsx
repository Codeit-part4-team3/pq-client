import addZero from 'src/utils/addZero';
import extractDate from 'src/utils/extractDate';
import { FormatMessageDataProps } from '../_types/props';

export const formatMessageData = ({
  serverUserData,
  messages,
  messageItem,
  index,
  isDifferentUserRef,
}: FormatMessageDataProps) => {
  // 현재 메시지에 해당하는 유저를 찾음
  const user = serverUserData?.find((user) => user.id === messageItem.userId);

  // 다음 메시지의 유저와 현재 메시지의 유저가 다르면 true로 변경
  isDifferentUserRef.current = messages[index + 1]?.userId !== messageItem.userId;

  // createdAt에서 날짜 데이터 추출
  const { year, month, day, hour, minute } = extractDate(messageItem.createdAt);
  //2024.04.22. 오후 09:31 형태
  const messageCreatedAt = `${year}.${addZero(month)}.${addZero(day)}. ${hour >= 12 ? '오후' : '오전'} ${hour % 12}:${addZero(minute)}`;

  // 다음 날짜와 현재 날짜가 다르다면 ChatDayDivider를 보여준다
  const { day: nextDay } = extractDate(messages[index + 1]?.createdAt);
  const isDifferentDay = nextDay !== day;
  // 다음 날짜와 현재 날짜가 다르면 isDifferentUser를 true로 변경해서 사용자 프로필 이미지를 보여준다

  if (isDifferentDay) {
    isDifferentUserRef.current = true;
  }

  // 2024년 04월 22일 (화) 헝태
  const ChatDayDividerDay = `${year}년 ${addZero(month)}월 ${addZero(day)}일 (${'일월화수목금토'[new Date(`${year}-${month}-${day}`).getDay()]})`;

  return {
    user,
    messageCreatedAt,
    isDifferentDay,
    ChatDayDividerDay,
    isDifferentUserRef,
  };
};
