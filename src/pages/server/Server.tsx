import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ServerItem from './_components/ServerItem';
import React, { useEffect, useState } from 'react';
import NotFoundServer from './_components/NotFoundServer';
import {
  ServerData,
  ChannelGroupData,
  ChannelData,
  ServerResponse,
  ChannelResponse,
  IServer,
  IChannel,
} from './_types/type';
import ChannelGroup from './_components/ChannelGroup';
import ChannelItem from './_components/ChannelItem';
import CalendarContainer from './_components/CalendarContainer';
import { useQueryGet } from 'src/apis/service/service';
import { useOpenModal } from 'src/hooks/useOpenModal';
import CreateServerModal from 'src/components/modal/contents/CreateServerModal';
import ServerMenu from './_components/ServerMenu';
import { useGetUserInfo } from 'src/hooks/useGetUserInfo';
import useUserStore from 'src/store/userStore';
import MyProfile from './_components/MyProfile';

/**
 *
 * server 전체 서버리스트 표시
 * server 클릭시 해당 서버의 채널리스트 표시
 * channel 클릭시 해당 체널 내용으로 업데이트
 *
 * 해당 컴포넌트에서 현재 서버 정보 및 체널 정보를 가지고 있어야함
 *
 */

export const ServerIdContext = React.createContext<number>(0);
export const UserIdContext = React.createContext<number>(0);

export default function Server() {
  const [isExist, setIsExist] = useState(false);
  const [serverId, setServerId] = useState<number>(0);
  const [serverList, setServerList] = useState<ServerData[]>([]);
  const [channelGroupList, setChannelGroupList] = useState<ChannelGroupData[]>([]);
  const [channelItemList, setChannelItemList] = useState<ChannelData[]>([]);
  const [serverName, setServerName] = useState<string>('');

  const navigate = useNavigate();

  const { userInfo } = useUserStore();
  const userId = userInfo.id;

  const { refetch: serverRefetch, data: serverData } = useQueryGet<ServerResponse[]>(
    'getAllServers',
    `/chat/v1/server/all?userId=${userId}`,
    {
      staleTime: 5000,
    },
  );
  const { refetch: channelRefetch, data: channelData } = useQueryGet<ChannelResponse[]>(
    'getAllChannels',
    `/chat/v1/server/${serverId}/channel/all`,
    {
      staleTime: 5000,
    },
  );

  const { isOpen, openModal, closeModal } = useOpenModal();

  const closeModalHandler = () => {
    closeModal();
    serverRefetch();
  };

  /**
   * 이벤트 버블링으로 하위 버튼 컴포넌트들의 이벤트 처리를
   * 상위 컴포넌트에서 dataset을 사용하여 처리
   */
  const onClickServer = (e: React.MouseEvent<HTMLElement>) => {
    const sId = (e.target as HTMLElement).dataset.serverid;

    if (sId) setServerId(Number(sId));
  };

  const createServerItemList = (serverList: ServerData[]) => {
    return serverList.map((server) => <ServerItem key={server.id} data={server} />);
  };

  const createChannelItemList = (groupId: number) => {
    return channelItemList.map((channel) => {
      if (channel.groupId === groupId) return <ChannelItem key={channel.id} data={channel} />;
    });
  };

  const createChannelGroupList = (channelGroupList: ChannelGroupData[]) => {
    return channelGroupList.map((group) => {
      return (
        <ChannelGroup key={group.id} data={group}>
          {createChannelItemList(group.id)}
        </ChannelGroup>
      );
    });
  };

  useEffect(() => {
    if (serverId) {
      navigate(`/server/${serverId}`);
      channelRefetch();
      setServerName(serverData?.find((server) => server?.id === serverId)?.name || '');
    }
  }, [serverId]);

  useEffect(() => {
    if (serverData) {
      const sData: IServer[] = serverData.filter((item): item is IServer => item !== null);
      setServerList(sData);

      setIsExist(sData.length > 0 ? true : false);
      setServerId(sData.length > 0 ? sData[0].id : 0);
    }
  }, [serverData]);

  useEffect(() => {
    if (channelData) {
      const cData: IChannel[] = channelData.filter((item): item is IChannel => item !== null);
      const groupList = cData.filter((item) => item.groupId === null);
      const channelList = cData.filter((item) => item.groupId !== null);
      setChannelGroupList(groupList);
      setChannelItemList(channelList);
    }
  }, [channelData]);

  return (
    <Area>
      <ServerIdContext.Provider value={serverId}>
        <UserIdContext.Provider value={userId}>
          <Container>
            <LeftContainer>
              <ServerContainer onClick={onClickServer}>
                {createServerItemList(serverList)}
                <ServerFuncButton onClick={openModal}>+</ServerFuncButton>
                <CreateServerModal isOpen={isOpen} closeModal={closeModalHandler} />
              </ServerContainer>
              <ChannelContainer>
                <ChannelBox>
                  <ServerMenu serverName={serverName} />
                  <CalendarContainer />
                  {createChannelGroupList(channelGroupList)}
                </ChannelBox>
                <MyProfile />
              </ChannelContainer>
            </LeftContainer>
            {!isExist ? (
              <NotFoundServer
                closeCreateServer={closeModalHandler}
                isCreateServer={isOpen}
                openCreateServer={openModal}
              />
            ) : (
              <Outlet />
            )}
          </Container>
        </UserIdContext.Provider>
      </ServerIdContext.Provider>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  backdrop-filter: blur(10px);
  background: var(--primary_basic_color);
  background-size: cover;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ServerContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  background: transparent;
  padding: 10px;
`;

const ServerFuncButton = styled.button`
  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  transition: 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
  }
`;

const ChannelContainer = styled.div`
  width: 260px;
  height: 100%;

  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  background-color: var(--primary_light_color);
`;

const ChannelBox = styled.div`
  height: 100%;

  color: white;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  transform-origin: 0 0;
`;
