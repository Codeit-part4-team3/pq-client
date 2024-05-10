import styled from 'styled-components';

interface ChannelHeaderProps {
  title: string;
  onClickMembers: () => void;
}

// voiceChannel, chatChannel 공통
// @ToDo 채널 이름, 채널 설명, 채널 참여자 수를 서버에서 받아와서 렌더링
export default function ChannelHeader({ title, onClickMembers }: ChannelHeaderProps) {
  const MockChannelDescription = '채팅방 이름1을 소개하는 설명입니다.';
  const MockChannelParticipants = '5명';

  return (
    <Wrapper>
      <LeftBox>
        <ChannelName>
          <TagImage />
          <span>{title}</span>
        </ChannelName>
        <ChannelDescription>{MockChannelDescription}</ChannelDescription>
      </LeftBox>
      <RightBox>
        <ChannelParticipants type='button' onClick={onClickMembers}>
          <GroupImage />
          <span>{MockChannelParticipants}</span>
        </ChannelParticipants>
      </RightBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid var(--gray_CCCCCC);
  width: 100%;
  height: 48px;

  background-color: var(--landing_background_color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 12px;
`;

const ChannelName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--black_000000);
`;

const ChannelDescription = styled.div`
  color: var(--gray_666666);
`;

const RightBox = styled.div`
  margin-right: 9px;
`;

const ChannelParticipants = styled.button`
  border-radius: 4px;
  border: 1px solid var(--gray_CCCCCC);
  width: 66px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--white_FFFFFF);
  color: var(--gray_666666);
  font-size: 14px;

  cursor: pointer;
`;

const TagImage = styled.div`
  width: 24px;
  height: 24px;

  background-image: url('/images/tag.svg');
  background-size: cover;
  background-position: center;
`;

const GroupImage = styled.div`
  width: 20px;
  height: 20px;

  background-image: url('/images/group.svg');
  background-size: cover;
  background-position: center;
`;
