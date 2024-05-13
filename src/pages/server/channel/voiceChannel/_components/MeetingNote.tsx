import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useSocket from 'src/hooks/useSocket';
import { User } from '../../chatChannel/_types/type';

interface MeetingNoteProps {
  roomName: string;
  userId: number;
  serverUserData: User[] | undefined;
  meetingNoteId: string | null;
}

interface RecognizedText {
  userId: number;
  text: string;
}

type RecognizedTexts = RecognizedText[];

export default function MeetingNote({ roomName, userId, serverUserData, meetingNoteId }: MeetingNoteProps) {
  // 소켓
  const socketRef = useSocket();
  // 음성 인식
  // 렌더링할 텍스트
  const [recognizedTexts, setRecognizedTexts] = useState<RecognizedTexts>([]);
  // 음성 인식 중인지 여부
  const [isListening, setIsListening] = useState<boolean>(false);

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
      setIsListening(true);
      console.log('음성 인식이 시작되었습니다.');
    };

    // 음성 인식이 끝나면 텍스트를 출력
    SpeechRecognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      if (socketRef.current) {
        socketRef.current.emit('update_meeting_note', { roomName, meetingNoteId, transcript, userId });
      }
      // 낙관적 업데이트
      setRecognizedTexts((prev) => [...prev, { userId, text: transcript }]);
    };

    // 에러가 발생했을 때
    SpeechRecognition.onerror = (event) => {
      console.log('에러가 발생했습니다. : ', event.error);
      console.log('에러 메시지 : ', event.message);
    };

    // 음성 인식이 끝났을 때
    SpeechRecognition.onend = () => {
      setIsListening(false);
      console.log('음성 인식이 종료되었습니다.');
    };

    socketRef.current?.on('update_meeting_note', ({ transcript, userId }: { transcript: string; userId: number }) => {
      console.log('update_meeting_note 이벤트 발생 : ', transcript, userId);
      setRecognizedTexts((prev) => [...prev, { userId, text: transcript }]);
    });

    // 컴포넌트가 언마운트 되면 음성 인식 종료
    return () => {
      setIsListening(false);
      // 이벤트 제거
      SpeechRecognition.onstart = null;
      SpeechRecognition.onresult = null;
      SpeechRecognition.onerror = null;
      SpeechRecognition.onend = null;
    };
  }, []);

  useEffect(() => {
    console.log(recognizedTexts);
  }, [recognizedTexts]);

  return (
    <Wrapper>
      <Header>
        <Title>회의록</Title>
        <Date>2024년 4월 26일의 회의</Date>
      </Header>
      <Note>
        {recognizedTexts.map((recognizedText, index) => {
          const nickname = serverUserData?.find((user) => user.id === recognizedText.userId)?.nickname;
          return (
            <Speech key={index}>
              <div>{nickname}</div>
              <Content>{recognizedText.text}</Content>
            </Speech>
          );
        })}
      </Note>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-left: 0.5px solid var(--gray-666666, #666);
  flex-grow: 1;
  width: min(100%, 350px);
  height: 100%;

  background: var(--landing_background_color);

  padding: 8px 8px 0 8px;
`;

const Header = styled.div`
  width: 100%;
  height: 48px;
  border: 1px solid var(--text_gray);
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  padding-left: 16px;
`;

const Title = styled.div`
  border-right: 1px solid var(--gray-999999, #999);
  color: #3d3d3d;
  font-family: Pretendard;
  font-size: 14px;
  padding-right: 10px;
`;

const Date = styled.div`
  color: var(--gray-999999, #999);
  font-family: Pretendard;
  font-size: 14px;
`;

const Note = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 69px;
`;

const Speech = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 10px;
  background: var(--gray-FAFAFA, #fafafa);

  margin-top: 18px;
`;
