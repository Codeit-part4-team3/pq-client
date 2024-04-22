import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Server() {
  return (
    <ServerArea>
      <NavBar>
        <strong>Server Page</strong>
      </NavBar>
      <ContentsArea>
        <SideBar></SideBar>
        <Outlet />
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
  display: flex;
  align-items: center;
  background-color: #ffc0c0;
  padding: 0 15px;
`;

const ContentsArea = styled.main`
  height: 100%;
  display: flex;
  background-color: #00fff0;
`;

const SideBar = styled.aside`
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  padding: 15px;
`;
