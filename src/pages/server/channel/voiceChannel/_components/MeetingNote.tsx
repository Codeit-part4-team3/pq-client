import styled from 'styled-components';

import profileImage from '../../../../../../public/images/minji-profile-image.png';
import useSocket from 'src/hooks/useSocket';
import { useEffect, useState } from 'react';

export default function MeetingNote() {
  const socketRef = useSocket();

  // 음성 인식
  // 인식된 텍스트
  const [recognizedText, setRecognizedText] = useState<string>('');
  // 음성 인식 중인지 여부
  const [isListening, setIsListening] = useState<boolean>(false);

  const SpeechRecognition = new window.webkitSpeechRecognition();
  SpeechRecognition.lang = 'ko-KR';

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
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      console.log('대화 : ', transcript);
    };

    // 에러가 발생했을 때
    SpeechRecognition.onerror = (event) => {
      console.log('에러가 발생했습니다. : ', event.error);
      console.log('에러 메시지 : ', event.message);
    };

    // 음성 인식이 끝나면 다시 시작
    SpeechRecognition.onend = () => {
      // 음성 인식이 끝나면 다시 시작
      SpeechRecognition.start();
    };

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

  return (
    <Wrapper>
      <Header>
        <Title>회의록</Title>
        <Date>2024년 4월 26일의 회의</Date>
      </Header>
      <Note>
        <Speech>
          <ProfileImage src={profileImage} alt='profile' />
          <Content>{recognizedText ? recognizedText : '음성 인식 중입니다.'}</Content>
        </Speech>
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

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 50%;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 10px;
  background: var(--gray-FAFAFA, #fafafa);

  margin-top: 18px;
`;
