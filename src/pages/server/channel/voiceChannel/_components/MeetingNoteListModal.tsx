import { ModalContainer, ModalTitle } from 'src/components/modal/CommonStyles';
import Modal from 'src/components/modal/modal';
import styled from 'styled-components';
import MeetingNoteImage from '../../../../../../public/images/meeting_note.png';
import extractDate from 'src/utils/extractDate';
import { useState } from 'react';
import MeetingNoteDocument from './MeetingNoteDocument';
import { MeetingNoteListModalProps } from '../_types/props';
import { IMeetingNote } from '../_types/type';

export default function MeetingNoteListModal({
  isOpenMeetingNoteList,
  onClose,
  meetingNoteList,
  serverUserData,
}: MeetingNoteListModalProps) {
  const [isOpenMeetingNote, setIsOpenMeetingNote] = useState<boolean>(false);
  const [selectedMeetingNote, setSelectedMeetingNote] = useState<IMeetingNote | null>(null);

  const handleMeetingNoteOpen = (meetingNote: IMeetingNote) => {
    setIsOpenMeetingNote(true);
    setSelectedMeetingNote(meetingNote);
  };

  return (
    <Modal isOpen={isOpenMeetingNoteList} onClose={onClose}>
      <ModalContainer>
        <ModalTitle>회의록 목록</ModalTitle>
        <List>
          <Description>회의록을 선택해주세요</Description>
          {meetingNoteList.map((meetingNote) => {
            // 2024년 04월 22일 형태로 날짜 포매팅
            const { year, month, day } = extractDate(meetingNote.createdAt);
            const formattedDate = `${year}년 ${month}월 ${day}일`;

            return (
              <Item key={meetingNote.id}>
                <Title>
                  <img src={MeetingNoteImage} alt='회의록 이미지' width={16} height={16} />
                  {meetingNote.name}
                </Title>
                <RightBox>
                  <Date>{formattedDate}</Date>
                  <ItemButton
                    type='button'
                    $bgColor='#258dff'
                    $hoverColor='#0056b3'
                    onClick={() => {
                      handleMeetingNoteOpen(meetingNote);
                    }}
                  >
                    열기
                  </ItemButton>
                </RightBox>
              </Item>
            );
          })}
        </List>
        <CloseButton type='button' onClick={onClose}>
          닫기
        </CloseButton>
      </ModalContainer>
      {isOpenMeetingNote ? (
        <MeetingNoteDocument
          data={selectedMeetingNote}
          isOpen={isOpenMeetingNote}
          setIsOpenMeetingNote={setIsOpenMeetingNote}
          serverUserData={serverUserData}
        />
      ) : null}
    </Modal>
  );
}

const Description = styled.div`
  color: #000;
  font-family: Pretendard;
  font-weight: 600;

  margin-bottom: 8px;
`;

const List = styled.ul`
  height: 300px;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-left: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  list-style: none;
  padding: 4px 24px;
  transition: 0.3s;

  &:hover {
    background-color: var(--light_blue_0);
  }
`;

const Title = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: var(--black-1a1a1a, #1a1a1a);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const RightBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  color: var(--gray-666666, #666);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ItemButton = styled.button<{ $bgColor: string; $hoverColor: string }>`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => props.$bgColor};
  border: 1px solid ${(props) => props.$bgColor};
  outline: none;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.$hoverColor};
  }
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
