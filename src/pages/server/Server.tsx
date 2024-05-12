import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  InviteLinkResponse,
  InviteLinkRequest,
} from './_types/type';
import ChannelGroup from './_components/ChannelGroup';
import ChannelItem from './_components/ChannelItem';
import CalendarContainer from './_components/CalendarContainer';
import { useMutationPost, useQueryGet } from 'src/apis/service/service';
import { useOpenModal } from 'src/hooks/useOpenModal';
import CreateServerModal from 'src/components/modal/contents/CreateServerModal';
import ServerMenu from './_components/ServerMenu';
import { useGetUserInfo } from 'src/hooks/useGetUserInfo';
import useUserStore from 'src/store/userStore';
import MyProfile from '../../components/MyProfile';
import useSocket from 'src/hooks/useSocket';
import { MessageItem } from './channel/chatChannel/_types/type';
import { LOCAL_STORAGE_ALRAM_KEY, SOCKET_EMIT, SOCKET_ON } from 'src/constants/common';

export const ServerIdContext = React.createContext<number>(0);
export const UserIdContext = React.createContext<number>(0);

export default function Server() {
  const [isExist, setIsExist] = useState(false);
  const [serverId, setServerId] = useState<number>(NaN);
  const [channelId, setChannelId] = useState<number>(NaN);
  const [serverList, setServerList] = useState<ServerData[]>([]);
  const [channelGroupList, setChannelGroupList] = useState<ChannelGroupData[]>([]);
  const [channelItemList, setChannelItemList] = useState<ChannelData[]>([]);
  const [serverName, setServerName] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const userId = userInfo.id;
  const socketRef = useSocket();

  useGetUserInfo();

  const {
    refetch: serverRefetch,
    data: serverData,
    isLoading,
  } = useQueryGet<ServerResponse[]>('getAllServers', `/chat/v1/server/all?userId=${userId}`, {
    staleTime: 5000,
    refetchInterval: 5000,
    enabled: !!userId,
  });

  const { refetch: channelRefetch, data: channelData } = useQueryGet<ChannelResponse[]>(
    'getAllChannels',
    `/chat/v1/server/${serverId}/channel/all`,
    {
      staleTime: 5000,
      refetchInterval: 5000,
      enabled: !!userId,
    },
  );

  const { data: allChannelByUser } = useQueryGet<ChannelResponse[]>(
    'getAllChannelManyServer',
    `/chat/v1/common/allChannel?userId=${userId}`,
    {
      staleTime: 5000,
      refetchInterval: 5000,
      enabled: !!userId,
    },
  );

  const mutation = useMutationPost<InviteLinkResponse, InviteLinkRequest>(`/chat/v1/server/inviteLink`);

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
    return serverList.map((server) => (
      <ServerItem
        key={server.id}
        data={server}
        channelDataList={allChannelByUser?.filter((channel) => channel?.serverId === server.id)}
      />
    ));
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
    navigate(`/server/${serverId}`);
    channelRefetch();

    setServerName(serverData?.find((server) => server?.id === serverId)?.name || '');
  }, [serverId]);

  useEffect(() => {
    if (serverData) {
      const sData: IServer[] = serverData.filter((item): item is IServer => item !== null);
      setIsExist(sData && sData.length > 0 ? true : false);
      setServerList(sData);

      if (Number.isNaN(serverId)) {
        setServerId(sData.length > 0 ? sData[0].id : 0);
        setServerName(sData.length > 0 ? sData[0].name : '');
      } else setServerName(serverData.find((server) => server?.id === serverId)?.name || '');
    }
  }, [serverData]);

  useEffect(() => {
    setChannelId(Number(location.pathname.split('/')[4]));
  }, [location.pathname]);

  useEffect(() => {
    if (channelData) {
      const cData: IChannel[] = channelData.filter((item): item is IChannel => item !== null);
      const groupList = cData.filter((item) => item.groupId === null);
      const channelList = cData.filter((item) => item.groupId !== null);
      setChannelGroupList(groupList);
      setChannelItemList(channelList);
    }
  }, [channelData]);

  useEffect(() => {
    // TODO : 유저가 참여해 있는 모든 체널에 대해 join을 해야함
    if (socketRef.current) {
      allChannelByUser?.forEach((channel) => {
        socketRef.current?.emit(SOCKET_EMIT.JOIN, `${channel?.id}`);
      });

      socketRef.current.on(SOCKET_ON.RECEIVE_MESSAGE, (newMessage: MessageItem) => {
        if (String(channelId) !== newMessage.channelId) {
          // storage에 하나의 string이 아닌 객체를 JSON.stringfy로 저장할 수도 있음
          localStorage.setItem(`${LOCAL_STORAGE_ALRAM_KEY}:${newMessage.channelId}`, `${newMessage.messageId}`);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(SOCKET_ON.RECEIVE_MESSAGE);
      }
    };
  }, [allChannelByUser, channelId]);

  useEffect(() => {
    const secretKey = sessionStorage.getItem('invite');
    if (secretKey) {
      mutation.mutate(
        { inviteeId: userId, secretKey: secretKey },
        {
          onSuccess: (data) => {
            setServerId(Number(data?.redirectUrl.split('/')[1]) || 0);
            sessionStorage.removeItem('invite');
          },
          onError: () => {
            console.log('[error] invite');
          },
        },
      );
    }
  }, []);

  return (
    <Area>
      <ServerIdContext.Provider value={serverId}>
        <UserIdContext.Provider value={userId}>
          <Container>
            <LeftContainer>
              <FirstContainer onClick={onClickServer}>
                <ServerBox>
                  <ListBody>{createServerItemList(serverList)}</ListBody>
                </ServerBox>
                <ServerFuncButton onClick={openModal}>+</ServerFuncButton>
                <CreateServerModal isOpen={isOpen} closeModal={closeModalHandler} />
              </FirstContainer>
              <SecondContainer>
                {isExist ? (
                  <SecondBox>
                    <ServerMenu serverName={serverName} />
                    <CalendarContainer />
                    {createChannelGroupList(channelGroupList)}
                  </SecondBox>
                ) : (
                  <div></div>
                )}
                <MyProfile />
              </SecondContainer>
            </LeftContainer>
            {!isExist && !isLoading && userId ? (
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

  z-index: 10;
`;

const FirstContainer = styled.div`
  height: 100%;

  background: transparent;
  padding: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
`;

const ServerBox = styled.div`
  width: 100%;
  height: 92%;

  overflow-x: hidden;
  overflow-y: scroll;

  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ListBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
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
  transition: 0.2s;

  z-index: 10;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
  }
`;

const SecondContainer = styled.div`
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

const SecondBox = styled.div`
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
