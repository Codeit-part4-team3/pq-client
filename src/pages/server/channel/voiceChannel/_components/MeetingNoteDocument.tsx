import { ModalTitle } from 'src/components/modal/CommonStyles';
import styled from 'styled-components';
import { MeetingNote } from '../VoiceChannel';
import { User } from '../../chatChannel/_types/type';
import extractDate from 'src/utils/extractDate';

interface MeetingNoteDocumentProps {
  isOpen: boolean;
  data: MeetingNote | null;
  setIsOpenMeetingNote: (isOpen: boolean) => void;
  serverUserData: User[] | undefined;
}

export default function MeetingNoteDocument({
  isOpen,
  data,
  setIsOpenMeetingNote,
  serverUserData,
}: MeetingNoteDocumentProps) {
  if (!data) return null;
  const { year, month, day } = extractDate(data.createdAt);
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const handleClose = () => {
    console.log('close');
    setIsOpenMeetingNote(false);
  };

  return (
    <Wrapper isOpen={isOpen}>
      <ModalTitle>{data?.name}</ModalTitle>
      <Header>
        <Title>회의록</Title>
        <CreatedAt>{`${formattedDate}의 회의`}</CreatedAt>
      </Header>
      <Note>
        {data?.content.map((content, idx) => {
          const nickname = serverUserData?.find((user) => user.id === content.userId)?.nickname || 'Unknown';
          return (
            <>
              <Speech key={idx}>
                <Nickname>{nickname}</Nickname>
                <Text>{content.text}</Text>
              </Speech>
            </>
          );
        })}
      </Note>
      <CloseButton type='button' onClick={handleClose}>
        닫기
      </CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  color: black;
  background-color: var(--landing_background_color);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  position: absolute;
  top: 0;
  left: 0;

  transform: scale(${(props) => (props.isOpen ? 1 : 0)});
  transition: transform 0.3s ease;
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

const Note = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
`;

const Speech = styled.div`
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

const CloseButton = styled.button`
  display: flex;
  width: 100%;
  padding: 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--text_gray);
  background: #fff;

  &:hover {
    cursor: pointer;
    background: var(--text_gray);
  }
`;
