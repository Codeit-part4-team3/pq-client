import AdminChatServer from './_components/AdminChatServer';
import AdminJoinServerModal from './_components/AdminJoinServerModal';
import AdminServerModal from './_components/AdminServerModal';
import AdminChatSocketServer from './_components/AdminChatSocketServer';
import styled from 'styled-components';
import AdminVoiceSocketServer from './_components/AdminVoiceSocketServer';

export default function Admin() {
  return (
    <>
      <Area>
        <AdminServerModal />
        <AdminJoinServerModal />
        <AdminChatSocketServer />
        <AdminChatServer />
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
