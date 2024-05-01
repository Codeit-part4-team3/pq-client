import styled from 'styled-components';
import { ModalInputLabel, NameInput } from '../CommonStyles';
import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

type data = { id: number; name: string; email: string; imageUrl?: string }[];

interface Props {
  // 일단 목데이터 기반 나중에 initialValue로 수정예정
  initialValue: data;
  invitedUsers: string[];
  buttonClick: (email: string) => void;
  initalparticipants?: data;
}
// const mock = [{ id: 10, name: '초대된 유저', email: 'sample@naver.com', imageUrl: '/images/plus.svg' }];

export default function MemberInviteSearchForm({ initialValue, invitedUsers, buttonClick, initalparticipants }: Props) {
  const [serchValue, setSerchValue] = useState('');
  const [participants, setParticipants] = useState(initalparticipants || []);
  const [data, setData] = useState(initialValue);

  const debouncedSearchTerm = useDebounce(serchValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setData(initialValue);
      setParticipants(initalparticipants || []);
    }
    if (debouncedSearchTerm) {
      // 검색 로직을 실행합니다. 예: API 호출 등
      const newData = initialValue.filter((it) => it.email.includes(serchValue) || it.name.includes(serchValue));
      setData(newData);
      const newParticipants = initalparticipants?.filter(
        (it) => it.email.includes(serchValue) || it.name.includes(serchValue),
      );
      setParticipants(newParticipants || []);
    }
  }, [debouncedSearchTerm]);
  return (
    <Area>
      <ModalInputLabel>구성원 추가</ModalInputLabel>
      <NameInput
        placeholder='이름 또는 이메일 검색'
        value={serchValue}
        onChange={(e) => setSerchValue(e.target.value)}
      />
      <UserList>
        {participants.map((user) => (
          <UserContainer key={user.id}>
            <UserInfoBox>
              <UserImage src={user.imageUrl || '/images/logo.svg'} alt='유저 프로필 이미지' />
              <UserNameSpan>{user.name}</UserNameSpan>
            </UserInfoBox>
            <UserEmailSpan>{user.email}</UserEmailSpan>
          </UserContainer>
        ))}
        {data.map((user) => (
          <UserContainer key={user.id}>
            <UserInfoBox>
              <UserImage src={user.imageUrl || '/images/logo.svg'} alt='유저 프로필 이미지' />
              <UserNameSpan>{user.name}</UserNameSpan>
              <UserEmailSpan>{user.email}</UserEmailSpan>
            </UserInfoBox>
            {!invitedUsers.includes(user.email) ? (
              <InviteButton type='button' onClick={() => buttonClick(user.email)}>
                초대
              </InviteButton>
            ) : (
              <InvitedSpan>전송됨</InvitedSpan>
            )}
          </UserContainer>
        ))}
      </UserList>
    </Area>
  );
}

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  height: 250px;
`;

const UserList = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const UserContainer = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: #d9d9d9;
`;

const UserNameSpan = styled.span`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserEmailSpan = styled.span`
  color: #666;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InviteButton = styled.button`
  width: 72px;
  padding: 8px 18px;
  border-radius: 4px;
  border: 1px solid var(--material-theme-source-seed, #007aff);
  color: #50525a;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: #fff;
  &:hover {
    background-color: #007aff;
    color: #fff;
  }
`;

const InvitedSpan = styled.span`
  color: #007aff;
  padding: 8px 18px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
