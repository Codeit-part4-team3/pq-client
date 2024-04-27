import styled from 'styled-components';
import { useMutationCreateServer, useMutationUpdateServer, useQueryAllServers } from 'src/apis/service/chatService';
import { useEffect, useState } from 'react';

// TODO : request api
export default function AdminChatServer() {
  const [logs, setLogs] = useState<string>('');
  const [createName, setCreateName] = useState<string>('');
  const [createImageUrl, setCreateImageUrl] = useState<string>('');
  const [updateName, setUpdateName] = useState<string>('');
  const [updateImageUrl, setUpdateImageUrl] = useState<string>('');
  const result = useQueryAllServers();
  const createMutation = useMutationCreateServer();
  const updateMutation = useMutationUpdateServer();

  const updateLogs = (newLog: string) => {
    setLogs((prevLogs) => prevLogs + '\n' + newLog);
  };

  useEffect(() => {
    // updateLogs(result.data);
  }, [result.data]);

  useEffect(() => {
    updateLogs(createMutation.data);
  }, [createMutation.data]);

  useEffect(() => {
    updateLogs(updateMutation.data);
  }, [updateMutation.data]);

  return (
    <Area>
      <ChatContainer>
        <strong>서버API</strong>
        <div>
          <label>Get All Server</label>
        </div>
        <div>
          <label>Create Server</label>
          <input placeholder='name' value={createName} onChange={(e) => setCreateName(e.target.value)} />
          <input placeholder='imageUrl' value={createImageUrl} onChange={(e) => setCreateImageUrl(e.target.value)} />
          <button onClick={() => createMutation.mutate({ name: createName, imageUrl: createImageUrl })}>전송</button>
        </div>
        <div>
          <label>Update Server</label>
          <input placeholder='name' value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <input placeholder='imageUrl' value={updateImageUrl} onChange={(e) => setUpdateImageUrl(e.target.value)} />
          <button onClick={() => updateMutation.mutate({ name: updateName, imageUrl: updateImageUrl })}>전송</button>
        </div>
      </ChatContainer>
      <LogContainer>
        <textarea value={logs} readOnly />
      </LogContainer>
    </Area>
  );
}

const Area = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const LogContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  color: #ffffff;
  background-color: #000000;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  > * {
    width: 100%;
    height: 100%;
  }
`;
