import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ServerButton from './_components/ServerButton';
import { useEffect, useState } from 'react';
import NotFoundServer from './_components/NotFoundServer';
import ChannelButton from './_components/ChannelButton';

/**
 *
 * @TODO
 * server 전체 서버리스트 표시
 * server 클릭시 해당 서버의 채널리스트 표시
 * channel 클릭시 해당 체널 내용으로 업데이트
 *
 * 해당 컴포넌트에서 현재 서버 정보 및 체널 정보를 가지고 있어야함
 */

export default function Server() {
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    setIsExist(true);
  }, []);

  return (
    <ServerArea>
      <NavBar>
        <strong>Server Page</strong>
      </NavBar>
      <ContentsArea>
        <Menu>
          <ServerButton />
          <ServerButton />
          <ServerButton />
        </Menu>
        <ChannelList>
          <ChannelButton />
          <ChannelButton />
          <ChannelButton />
        </ChannelList>
        {!isExist && <NotFoundServer />}
        <Outlet />
        <ChannelList>
          <ChannelButton />
          <ChannelButton />
          <ChannelButton />
        </ChannelList>
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

const NavBar = styled.header`
  height: 40px;

  padding: 0 15px;
  display: flex;
  align-items: center;

  background-color: #cccccc;
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

const ChannelList = styled.aside`
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
