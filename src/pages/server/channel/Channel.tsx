import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutationPut, useQueryGet } from 'src/apis/service/service';

import { ChannelResponse, IUser } from '../_types/type';
import { ProfileImage, ProfileImageWrapper } from 'src/GlobalStyles';
import VoiceChannel from './voiceChannel/VoiceChannel';
import ChatChannel from './chatChannel/ChatChannel';
import ChannelHeader from 'src/pages/server/channel/_conponents/ChannelHeader';
import { Status } from 'src/components/MyState';
import useUserStore from 'src/store/userStore';
import { ReponseUserState, RequestUserState } from 'src/types/userType';
import { USER_URL } from 'src/constants/apiUrl';

export default function Channel() {
  const [isShowMembers, setIsShowMembers] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<IUser[]>([]);
  const { serverId, channelId } = useParams();

  const { data, refetch } = useQueryGet<ChannelResponse>(
    'getChannel',
    `/chat/v1/server/${serverId}/channel/${channelId}`,
  );

  const { data: userData, refetch: userRefetch } = useQueryGet<IUser[]>(
    'getUsers',
    `/chat/v1/server/${serverId}/users`,
    {
      refetchInterval: 10000,
    },
  );

  const handleMembers = () => {
    setIsShowMembers(!isShowMembers);
  };

  const { userInfo, setUserInfo } = useUserStore();
  const { mutate } = useMutationPut<ReponseUserState, RequestUserState>(`${USER_URL.USER}/me/state/update`, {
    onSuccess: async (data: ReponseUserState) => {
      if (data.name !== '오프라인') {
        setUserInfo({ ...userInfo, state: data.name });
      }
    },
  });

  useEffect(() => {
    mutate({ state: '온라인' });
  }, []);

  useEffect(() => {
    refetch();
  }, [channelId]);

  useEffect(() => {
    userRefetch();
  }, [serverId]);

  useEffect(() => {
    if (!userData) return;
    setOnlineUsers(userData.filter((user) => user.state === '온라인' || user.state === '자리비움'));
    setOfflineUsers(userData.filter((user) => user.state === '오프라인'));
  }, [userData]);

  return (
    <Area>
      <ChannelHeader title={data?.name ?? '없음'} userCount={userData?.length ?? 0} onClickMembers={handleMembers} />
      <Container>
        {data?.isVoice ? <VoiceChannel /> : <ChatChannel />}
        <MembersWrapper $isShow={isShowMembers}>
          <MembersContainer $isShow={isShowMembers}>
            {onlineUsers.length > 0 ? <div>온라인 </div> : null}
            {onlineUsers?.map((user) => {
              if (!user) return null;
              return (
                <Member key={user.id}>
                  <ProfileWrapper>
                    <ProfileImageWrapper>
                      <ProfileImage $imageUrl={user.imageUrl} />
                    </ProfileImageWrapper>
                    <StatusBox>
                      <Status $state={user.state} />
                    </StatusBox>
                  </ProfileWrapper>
                  <span>{user.nickname}</span>
                </Member>
              );
            })}
            {offlineUsers.length > 0 ? <div>오프라인</div> : null}
            {offlineUsers?.map((user) => {
              if (!user) return null;
              return (
                <Member key={user.id}>
                  <ProfileWrapper>
                    <ProfileImageWrapper>
                      <ProfileImage $imageUrl={user.imageUrl} />
                    </ProfileImageWrapper>
                    <StatusBox>
                      <Status $state={user.state} />
                    </StatusBox>
                  </ProfileWrapper>
                  <span>{user.nickname}</span>
                </Member>
              );
            })}
          </MembersContainer>
        </MembersWrapper>
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

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  position: relative;
`;

const StatusBox = styled.div`
  width: 16px;
  height: 16px;

  border-radius: 50%;
  background-color: var(--landing_background_color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: calc(100% - 14px);
  right: 0px;

  & > div {
    width: 70%;
    height: 70%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 48px);

  background-color: var(--landing_background_color);
  display: flex;
  flex-direction: row;

  position: relative;
`;

const MembersWrapper = styled.div<{ $isShow: boolean }>`
  width: ${(props) => (props.$isShow ? '180px' : '0px')};
  height: 100%;

  overflow: hidden;
  transition: 0.3s ease-in-out;
  transform: ${(props) => (props.$isShow ? 'scaleX(1)' : 'scaleX(0)')};
`;

const MembersContainer = styled.div<{ $isShow: boolean }>`
  width: 180px;
  height: 100%;

  background-color: var(--landing_background_color);
  border-left: 1px solid var(--gray_CCCCCC);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.3s ease-in-out;
  transform: ${(props) => (props.$isShow ? 'translateX(0)' : 'translateX(180px)')};

  top: 0;
  right: -180px;

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
  position: relative;
`;
