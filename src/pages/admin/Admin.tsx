import AdminChatServer from './_components/AdminChatServer';
import AdminServerModal from './_components/AdminServerModal';
import AdminSocketServer from './_components/AdminSocketServer';
import styled from 'styled-components';

export default function Admin() {
  return (
    <Area>
      <AdminSocketServer />
      <AdminChatServer />
      <AdminServerModal />
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
