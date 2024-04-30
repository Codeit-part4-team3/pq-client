import styled from 'styled-components';
import { useMutationDelete, useMutationPatch, useMutationPost, useQueryGet } from 'src/apis/service/service';
import { useEffect, useState } from 'react';
import { ServerResponse, ServerRequest } from '../../server/_types/type';
import { URL } from 'src/constants/apiUrl';

// TODO : request api
export default function AdminChatServer() {
  const [logs, setLogs] = useState<string>('');
  const [createName, setCreateName] = useState<string>('');
  const [createImageUrl, setCreateImageUrl] = useState<string>('');
  const [updateId, setUpdateId] = useState<string>('');
  const [updateName, setUpdateName] = useState<string>('');
  const [updateImageUrl, setUpdateImageUrl] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string>('');

  const { data, error, isLoading } = useQueryGet<ServerResponse>('getAllServers', `${URL.SERVER}/all`);
  console.log(data, error, isLoading);

  const createMutation = useMutationPost<ServerResponse, ServerRequest>(`${URL.SERVER}`);
  const updateMutation = useMutationPatch<ServerResponse, ServerRequest>(`${URL.SERVER}/${updateId}`);
  const deleteMutation = useMutationDelete(`${URL.SERVER}/${deleteId}`);

  const updateLogs = (newLog: string) => {
    setLogs((prevLogs) => prevLogs + '\n' + newLog);
  };

  useEffect(() => {
    if (createMutation.data) updateLogs(String(createMutation.data));
  }, [createMutation.data]);

  useEffect(() => {
    if (updateMutation.data) updateLogs(String(updateMutation.data));
  }, [updateMutation.data]);

  useEffect(() => {
    if (deleteMutation.data) updateLogs(String(deleteMutation.data));
  }, [deleteMutation.data]);

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
          <input placeholder='id' value={updateId} onChange={(e) => setUpdateId(e.target.value)} />
          <input placeholder='name' value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <input placeholder='imageUrl' value={updateImageUrl} onChange={(e) => setUpdateImageUrl(e.target.value)} />
          <button onClick={() => createMutation.mutate({ name: createName, imageUrl: createImageUrl })}>전송</button>
        </div>
        <div>
          <label>Delete Server</label>
          <input placeholder='id' value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
          <button onClick={() => deleteMutation.mutate()}>전송</button>
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
