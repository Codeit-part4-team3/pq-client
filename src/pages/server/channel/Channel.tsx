import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQueryGet } from 'src/apis/service/service';

import { ChannelResponse, UserResponse } from '../_types/type';
import { ProfileImage, ProfileImageWrapper } from 'src/GlobalStyles';
import VoiceChannel from './voiceChannel/VoiceChannel';
import ChatChannel from './chatChannel/ChatChannel';
import ChannelHeader from 'src/pages/server/channel/_conponents/ChannelHeader';

export default function Channel() {
  const [isShowMembers, setIsShowMembers] = useState(true);
  const { serverId, channelId } = useParams();

  const { data, refetch } = useQueryGet<ChannelResponse>(
    'getChannel',
    `/chat/v1/server/${serverId}/channel/${channelId}`,
  );

  const { data: userData, refetch: userRefetch } = useQueryGet<UserResponse[]>(
    'getUsers',
    `/chat/v1/server/${serverId}/users`,
  );

  const handleMembers = () => {
    setIsShowMembers(!isShowMembers);
  };

  useEffect(() => {
    refetch();
  }, [channelId]);

  useEffect(() => {
    userRefetch();
  }, [serverId]);

  return (
    <Area>
      <ChannelHeader title={data?.name ?? '없음'} userCount={userData?.length ?? 0} onClickMembers={handleMembers} />
      <Container>
        {data?.isVoice ? <VoiceChannel /> : <ChatChannel />}
        {isShowMembers && (
          <MembersContainer>
            {userData?.map((user) => {
              if (!user) return null;
              return (
                <Member key={user.id}>
                  <ProfileImageWrapper>
                    <ProfileImage imageUrl={undefined} />
                  </ProfileImageWrapper>
                  <span>{user.nickname}</span>
                </Member>
              );
            })}
          </MembersContainer>
        )}
      </Container>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 48px);

  background-color: var(--landing_background_color);
  display: flex;
  flex-direction: row;

  position: relative;
`;

const MembersContainer = styled.div`
  width: 180px;
  height: 100%;

  background-color: var(--landing_background_color);
  border-left: 1px solid var(--gray_CCCCCC);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & > * {
    padding: 10px;
  }
`;

const Member = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  gap: 10px;
`;
