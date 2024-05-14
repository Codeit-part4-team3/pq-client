import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import useSocket from 'src/hooks/useSocket';
import { User } from '../../chatChannel/_types/type';

interface MeetingNoteProps {
  roomName: string;
  userId: number;
  serverUserData: User[] | undefined;
  meetingNoteId: string | null;
  recognizedTexts: { userId: number; text: string }[];
  setRecognizedTexts: React.Dispatch<React.SetStateAction<{ userId: number; text: string }[]>>;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export default function MeetingNote({
  roomName,
  userId,
  serverUserData,
  meetingNoteId,
  recognizedTexts,
}: MeetingNoteProps) {
  // 소켓
  const socketRef = useSocket();
  const SpeechContainerRef = useRef<HTMLDivElement>(null);

  // 음성 인식 객체 생성
  const SpeechRecognition = new window.webkitSpeechRecognition();
  // 한국어로 설정
  SpeechRecognition.lang = 'ko-KR';
  // 음성 인식을 계속해서 유지
  SpeechRecognition.continuous = true;

  useEffect(() => {
    // 음성 인식 시작
    SpeechRecognition.start();

    // 음성 인식이 시작되면 발생하는 이벤트
    SpeechRecognition.onstart = () => {
      console.log('음성 인식이 시작되었습니다.');
    };

    // 음성 인식이 끝나면 텍스트를 출력
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      if (socketRef.current) {
        socketRef.current.emit('update_meeting_note', { roomName, meetingNoteId, transcript, userId });
      }
    };

    // 에러가 발생했을 때
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition.onerror = (event: any) => {
      console.log('에러가 발생했습니다. : ', event.error);
      console.log('에러 메시지 : ', event.message);
    };

    // 음성 인식이 끝났을 때
    SpeechRecognition.onend = () => {
      console.log('음성 인식이 종료되었습니다.');
    };

    // 컴포넌트가 언마운트 되면 음성 인식 종료
    return () => {
      // 이벤트 제거
      SpeechRecognition.onstart = null;
      SpeechRecognition.onresult = null;
      SpeechRecognition.onerror = null;
      SpeechRecognition.onend = null;
    };
  }, []);

  useEffect(() => {
    console.log(recognizedTexts);
    // 스코롤을 맨 아래로 내림
    SpeechContainerRef.current?.scrollTo(0, SpeechContainerRef.current.scrollHeight);
  }, [recognizedTexts]);

  //

  return (
    <Wrapper>
      <Header>
        <Title>회의록</Title>
        <CreatedAt>2024년 4월 26일의 회의</CreatedAt>
      </Header>
      <RecognizedTextContainer ref={SpeechContainerRef}>
        {recognizedTexts.map((recognizedText, index) => {
          const nickname = serverUserData?.find((user) => user.id === recognizedText.userId)?.nickname;
          return (
            <RecognizedText key={index}>
              <Nickname>{nickname}</Nickname>
              <Text>{recognizedText.text}</Text>
            </RecognizedText>
          );
        })}
      </RecognizedTextContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-left: 0.5px solid var(--gray-666666, #666);
  flex-grow: 1;
  width: min(100%, 350px);
  height: calc(100vh - 48px);

  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: var(--landing_background_color);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px 16px 0 16px;
  color: black;
`;

const Header = styled.div`
  width: 100%;
  height: 48px;
  border: 1px solid var(--text_gray);
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: var(--white_FFFFFF);
  padding-left: 16px;
`;

const Title = styled.div`
  border-right: 1px solid var(--gray-999999, #999);
  color: #3d3d3d;
  font-family: Pretendard;
  font-size: 14px;
  padding-right: 10px;
`;

const CreatedAt = styled.div`
  color: var(--gray-999999, #999);
  font-family: Pretendard;
  font-size: 14px;
`;

const RecognizedTextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
`;

const RecognizedText = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Nickname = styled.div`
  border-radius: 10px;
  font-weight: 600;
  color: var(--black_000000);
  display: flex;
  flex-shrink: 0;
`;

const Text = styled.div`
  border: 1px solid var(--text_gray);
  border-radius: 10px;
  width: 100%;
  border-radius: 10px;
  background: var(--white_FFFFFF);
  color: var(--background_light_gray);
  padding: 12px;

  margin-top: 18px;
`;
