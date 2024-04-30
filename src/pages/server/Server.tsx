import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ServerItem from './_components/ServerItem';
import { useEffect, useState } from 'react';
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

/**
 *
 * server 전체 서버리스트 표시
 * server 클릭시 해당 서버의 채널리스트 표시
 * channel 클릭시 해당 체널 내용으로 업데이트
 *
 * 해당 컴포넌트에서 현재 서버 정보 및 체널 정보를 가지고 있어야함
 *
 */

export default function Server() {
  const [isExist, setIsExist] = useState(false);
  const [serverList, setServerList] = useState<ServerData[]>([]);
  const [channelGroupList, setChannelGroupList] = useState<ChannelGroupData[]>([]);
  const [channelItemList, setChannelItemList] = useState<ChannelData[]>([]);

  const { data: serverData } = useQueryGet<ServerResponse[]>('getAllServers', `/chat/v1/server/all?userId=${1}`);
  const { data: channelData } = useQueryGet<ChannelResponse[]>(
    'getAllChannels',
    `/chat/v1/server/${28}/channel/all?userId=${1}`,
  );

  /**
   * 이벤트 버블링으로 하위 버튼 컴포넌트들의 이벤트 처리를
   * 상위 컴포넌트에서 dataset을 사용하여 처리
   */
  const onClickServer = (e: React.PointerEvent<HTMLElement>) => {
    const serverId = (e.target as HTMLElement).dataset.serverid;
    if (serverId) {
      console.log(`${serverId}번 서버 클릭`);
    }
  };

  const createServerItemList = (serverList: ServerData[]) => {
    return serverList.map((server) => <ServerItem data={server} />);
  };

  const createChannelItemList = (groupId: number) => {
    return channelItemList.map((channel) => {
      if (channel.groupId === groupId) return <ChannelItem data={channel} />;
    });
  };

  const createChannelGroupList = (channelGroupList: ChannelGroupData[]) => {
    return channelGroupList.map((group) => {
      return <ChannelGroup data={group}>{createChannelItemList(group.id)}</ChannelGroup>;
    });
  };

  useEffect(() => {
    setIsExist(true);
  }, []);

  useEffect(() => {
    if (serverData) {
      const sData: IServer[] = serverData.filter((item): item is IServer => item !== null);
      setServerList(sData);
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
      <Container>
        <ServerContainer onClick={onClickServer}>
          {createServerItemList(serverList)}
          <AddServerButton />
        </ServerContainer>
        <ChannelContainer>
          <CalendarContainer />
          {createChannelGroupList(channelGroupList)}
        </ChannelContainer>
        {!isExist ? <NotFoundServer /> : <Outlet />}
      </Container>
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
  background-color: #ffe0e0;
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
