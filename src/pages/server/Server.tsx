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
import AddServerButton from './_components/AddServerButton';
import ChannelGroup from './_components/ChannelGroup';
import ChannelItem from './_components/ChannelItem';
import CalendarContainer from './_components/CalendarContainer';
import { useQueryGet } from 'src/apis/service/service';
import { useOpenModal } from 'src/hooks/useOpenModal';
import CreateServerModal from 'src/components/modal/contents/CreateServerModal';
import ServerMenu from './_components/ServerMenu';

import { useGetUserInfo } from 'src/hooks/useGetUserInfo';

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
  const userInfo = useGetUserInfo();

  const userId = userInfo.id || 0;

  const { refetch: serverRefetch, data: serverData } = useQueryGet<ServerResponse[]>(
    'getAllServers',
    `/chat/v1/server/all?userId=${userId}`,
  );
  const { refetch: channelRefetch, data: channelData } = useQueryGet<ChannelResponse[]>(
    'getAllChannels',
    `/chat/v1/server/${serverId}/channel/all?userId=${userId}`,
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
  const onClickServer = (e: React.PointerEvent<HTMLElement>) => {
    const serverId = (e.target as HTMLElement).dataset.serverid;

    if (serverId) {
      setServerId(Number(serverId));
    }
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
            <ServerContainer onClick={onClickServer}>
              {createServerItemList(serverList)}
              <AddServerButton onClick={openModal} />
              <CreateServerModal isOpen={isOpen} closeModal={closeModalHandler} />
            </ServerContainer>
            <ChannelContainer>
              <ServerMenu serverName={serverName} />
              <CalendarContainer />
              {createChannelGroupList(channelGroupList)}
            </ChannelContainer>
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
  background-color: #ffffff;
`;

const ServerContainer = styled.aside`
  width: 68px;
  height: 100%;

  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  background-color: #bedeff;
`;

const ChannelContainer = styled.aside`
  width: 260px;
  height: 100vh;

  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  background-color: #f1f8ff;
`;
