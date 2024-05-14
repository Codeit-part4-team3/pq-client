import { ModalContainer, ModalTitle } from 'src/components/modal/CommonStyles';
import ModalButtons from 'src/components/modal/button/ModalButtons';
import Modal from 'src/components/modal/modal';
import styled from 'styled-components';
import meetingNote from '../../../../../../public/images/meeting_note.png';

interface MeetingNoteListModalProps {
  isOpenMeetingNoteList: boolean;
  onClose: () => void;
  channelId: string | null;
}

export default function MeetingNoteListModal({ isOpenMeetingNoteList, onClose, channelId }: MeetingNoteListModalProps) {
  return (
    <Modal isOpen={isOpenMeetingNoteList} onClose={onClose}>
      <ModalContainer>
        <ModalTitle>회의록 목록</ModalTitle>
        <List>
          <Description>회의록을 선택해주세요</Description>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
          <Item>
            <Title>
              <img src={meetingNote} alt='회의록 이미지' width={16} height={16} />
              회의록입니다.
            </Title>
            <Date>2024년 04월 22일</Date>
            <ItemButton type='button' $bgColor='#258dff' $hoverColor='#0056b3'>
              열기
            </ItemButton>
          </Item>
        </List>
        <ModalButtons closeClick={onClose} ctaText={'생성'} type='submit' />
      </ModalContainer>
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
  gap: 16px;
  list-style: none;
  padding: 4px 24px;
  transition: 0.3s;

  cursor: pointer;

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
