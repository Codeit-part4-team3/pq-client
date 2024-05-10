// import { useState } from 'react';

import styled from 'styled-components';

// import ChatChannel from './chatChannel/ChatChannel';

import { useParams } from 'react-router-dom';
import VoiceChannel from './voiceChannel/VoiceChannel';
import ChatChannel from './chatChannel/ChatChannel';
import { useEffect, useState } from 'react';
import ChannelHeader from 'src/pages/server/channel/_conponents/ChannelHeader';
import { useQueryGet } from 'src/apis/service/service';
import { ChannelResponse, UserResponse } from '../_types/type';
import { ProfileImage, ProfileImageWrapper } from 'src/GlobalStyles';

export default function Channel() {
  const [isShowMembers, setIsShowMembers] = useState(true);
  const { serverId, channelId } = useParams();
  console.log('serverId:', serverId, 'channelId:', channelId);

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

  console.log('data:', JSON.stringify(userData));

  /**@ToDo channel 데이터의 onVoice의 boolean에 따라 ChatChannel을 보여줄지 VoiceChannel을 보여줄지 생각 */
  // const [onVoice] = useState('false');
  return (
    <Area>
      <ChannelHeader title={data?.name ?? '없음'} userCount={userData?.length ?? 0} onClickMembers={handleMembers} />
      <Container>
        {Number(channelId) % 2 === 0 ? <ChatChannel /> : <VoiceChannel />}
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
