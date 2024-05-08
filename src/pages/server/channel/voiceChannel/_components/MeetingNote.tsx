import styled from 'styled-components';

import profileImage from '../../../../../../public/images/minji-profile-image.png';

export default function MeetingNote() {
  return (
    <Wrapper>
      <Header>
        <Title>회의록</Title>
        <Date>2024년 4월 26일의 회의</Date>
      </Header>
      <Note>
        <Speech>
          <ProfileImage src={profileImage} alt='profile' />
          <Content></Content>
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

  background: var(--white-FFFFFF, #fff);

  padding: 8px 8px 0 8px;
`;

const Header = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 10px;
  background: #f1f8ff;
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
