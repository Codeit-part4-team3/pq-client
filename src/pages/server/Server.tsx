import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ServerItem from './_components/ServerItem';
import { useEffect, useState } from 'react';
import NotFoundServer from './_components/NotFoundServer';
import { ServerData, ChannelGroupData, ChannelData } from './_types/type';
import MemberButton from './_components/MemberButton';
import { channelItemMock, channelGroupMock, serverMock } from './_test/server.mock';
import AddServerButton from './_components/AddServerButton';
import ChannelGroup from './_components/ChannelGroup';
import ChannelItem from './_components/ChannelItem';
import CalendarContainer from './_components/CalendarContainer';

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

  const fetchChannelList = async () => {
    setChannelItemList(channelItemMock);
    setChannelGroupList(channelGroupMock);
  };

  const fetchServerList = async () => {
    fetchChannelList();

    setServerList(serverMock);
  };

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
    fetchServerList();

    setIsExist(true);
  }, []);

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
        <MemberContainer>
          <MemberButton />
          <MemberButton />
          <MemberButton />
        </MemberContainer>
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

const MemberContainer = styled.aside`
  width: 200px;

  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  background-color: #bedeff;
`;
