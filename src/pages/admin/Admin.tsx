import AdminChatServer from './_components/AdminChatServer';
import AdminJoinServerModal from './_components/AdminJoinServerModal';
import AdminServerModal from './_components/AdminServerModal';
import AdminChatSocketServer from './_components/AdminChatSocketServer';
import styled from 'styled-components';
import AdminVoiceSocketServer from './_components/AdminVoiceSocketServer';
import PaymentTest from './_components/PaymentTest';
import { useQueryGet } from 'src/apis/service/service';
import { UserInfo } from 'src/types/userType';
import { USER_URL } from 'src/constants/apiUrl';
import { useEffect } from 'react';
import useUserStore from 'src/store/userStore';

export default function Admin() {
  const { setUserInfo } = useUserStore();
  const { data: userData, isLoading } = useQueryGet<UserInfo | null>('getUserData', `${USER_URL.USER}/me`);

  // 유저 정보 업데이트
  useEffect(() => {
    if (isLoading) return;

    if (userData) {
      setUserInfo(userData);
    }
  }, [userData, setUserInfo]);

  return (
    <>
      <Area>
        <AdminServerModal />
        <AdminJoinServerModal />
        <AdminChatSocketServer />
        <AdminChatServer />
        <PaymentTest />
      </Area>
      <VoiceChannelArea>
        <AdminVoiceSocketServer />
      </VoiceChannelArea>
    </>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 20px;

  > * {
    width: 100%;
  }
`;

const VoiceChannelArea = styled.section``;
