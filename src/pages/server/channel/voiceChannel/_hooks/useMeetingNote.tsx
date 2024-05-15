import { useEffect, useRef } from 'react';
import { SOCKET_EMIT } from 'src/constants/common';
import useSocket from 'src/hooks/useSocket';
import extractDate from 'src/utils/extractDate';

export interface UseMeetingNoteProps {
  roomName: string;
  userId: number;
  meetingNoteId: string | null;
  recognizedTexts: { userId: number; text: string }[];
}

export default function useMeetingNote({ roomName, userId, meetingNoteId, recognizedTexts }: UseMeetingNoteProps) {
  // 소켓
  const socketRef = useSocket();
  const SpeechContainerRef = useRef<HTMLDivElement>(null);
  // 음성 인식 객체 생성
  const SpeechRecognition = new window.webkitSpeechRecognition();
  // 한국어로 설정
  SpeechRecognition.lang = 'ko-KR';
  // 음성 인식을 계속해서 유지
  SpeechRecognition.continuous = true;
  // 오늘 날짜, 2024년 4월 26일 형태
  const { year, month, day } = extractDate(Date.now());
  const formattedDate = `${year}년 ${month}월 ${day}일`;

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
        socketRef.current.emit(SOCKET_EMIT.UPDATE_MEETING_NOTE, { roomName, meetingNoteId, transcript, userId });
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

  // 인식된 메시지가 추가 될 때 마다 스크롤을 맨 아래로 내림
  useEffect(() => {
    SpeechContainerRef.current?.scrollTo(0, SpeechContainerRef.current.scrollHeight);
  }, [recognizedTexts]);

  return {
    SpeechRecognition,
    formattedDate,
    SpeechContainerRef,
  };
}
