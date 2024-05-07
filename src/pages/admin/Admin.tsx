import AdminChatServer from './_components/AdminChatServer';
import AdminJoinServerModal from './_components/AdminJoinServerModal';
import AdminServerModal from './_components/AdminServerModal';
import AdminSocketServer from './_components/AdminSocketServer';
import styled from 'styled-components';
import PaymentTest from './_components/PaymentTest';

export default function Admin() {
  return (
    <Area>
      {/* <AdminServerModal />
      <AdminJoinServerModal />
      <AdminSocketServer />
      <AdminChatServer /> */}
      <PaymentTest />
      {/* <VoiceChannel /> */}
    </Area>
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
