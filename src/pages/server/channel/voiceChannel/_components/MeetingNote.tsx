import styled from 'styled-components';
import { MeetingNoteProps } from '../_types/props';
import useMeetingNote from '../_hooks/useMeetingNote';
import useUserStore from 'src/store/userStore';

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
  const { formattedDate, SpeechContainerRef } = useMeetingNote({
    roomName,
    userId,
    meetingNoteId,
    recognizedTexts,
  });

  const { userInfo } = useUserStore();
  const { id: myId, nickname: myNickname } = userInfo;

  return (
    <Wrapper>
      <Header>
        <Title>회의록</Title>
        <CreatedAt>{`${formattedDate}의 회의`}</CreatedAt>
      </Header>
      <RecognizedTextContainer ref={SpeechContainerRef}>
        {recognizedTexts.map((recognizedText, index) => {
          const nickname = serverUserData?.find((user) => user.id === recognizedText.userId)?.nickname;
          const isMine = recognizedText.userId === myId;

          if (isMine) {
            return (
              <MyRecognizedText key={index}>
                <Nickname>{myNickname}</Nickname>
                <Text>{recognizedText.text}</Text>
              </MyRecognizedText>
            );
          }
          return (
            <OtherRecognizedText key={index}>
              <Nickname>{nickname}</Nickname>
              <Text>{recognizedText.text}</Text>
            </OtherRecognizedText>
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
  gap: 24px;
  overflow-y: scroll;
`;

const RecognizedText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MyRecognizedText = styled(RecognizedText)`
  align-items: flex-start;
`;

const OtherRecognizedText = styled(RecognizedText)`
  align-items: flex-end;
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
  width: 70%;
  border-radius: 10px;
  background: var(--white_FFFFFF);
  color: var(--background_light_gray);
  padding: 12px;
`;
