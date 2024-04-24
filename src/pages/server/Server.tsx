import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ServerButton from './_components/ServerButton';
import { useEffect, useState } from 'react';
import NotFoundServer from './_components/NotFoundServer';
import ChannelButton from './_components/ChannelButton';
import { ChannelList, ServerItem } from './_types/type';
import MemberButton from './_components/MemberButton';
import { channelMock, serverMock } from './_test/server.mock';
import AddServerButton from './_components/AddServerButton';

/**
 *
 * server 전체 서버리스트 표시
 * server 클릭시 해당 서버의 채널리스트 표시
 * channel 클릭시 해당 체널 내용으로 업데이트
 *
 * 해당 컴포넌트에서 현재 서버 정보 및 체널 정보를 가지고 있어야함
 *
 * 데이터의 계층
 * item -> list -> lists
 *
 */

export default function Server() {
  const [isExist, setIsExist] = useState(false);
  const [serverList, setServerList] = useState<ServerItem[]>([]);
  const [ChannelLists, setChannelLists] = useState<ChannelList[]>([]);

  const fetchChannelLists = async (serverId: number) => {
    setChannelLists(channelMock[serverId]);
  };

  const fetchServerList = async () => {
    fetchChannelLists();

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

  const createServerButton = (serverList: ServerItem[]) => {
    return serverList.map((server) => <ServerButton data={server} />);
  };

  useEffect(() => {
    fetchServerList();

    setIsExist(true);
  }, []);

  return (
    <ServerArea>
      <ContentsArea>
        <Menu onClick={onClickServer}>
          {createServerButton(serverList)}
          <AddServerButton />
        </Menu>
        <ChannelBox>
          <ChannelButton />
          <ChannelButton />
          <ChannelButton />
        </ChannelBox>
        {!isExist && <NotFoundServer />}
        <Outlet />
        <MemberBox>
          <MemberButton />
          <MemberButton />
          <MemberButton />
          <MemberButton />
          <MemberButton />
        </MemberBox>
      </ContentsArea>
    </ServerArea>
  );
}

const ServerArea = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const ContentsArea = styled.main`
  height: 100%;
  display: flex;
  background-color: #ffe0e0;
`;

const Menu = styled.aside`
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

const ChannelBox = styled.aside`
  width: 260px;
  height: 100%;

  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  background-color: #f1f8ff;
`;

const MemberBox = styled.aside`
  width: 200px;
  height: 100%;

  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  background-color: #bedeff;
`;
