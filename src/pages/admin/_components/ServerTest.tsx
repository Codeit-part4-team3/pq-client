import { useEffect, useState } from 'react';
import { useMutationPost, useMutationPatch, useMutationDelete, useQueryGet } from 'src/apis/service/chatService';
import { ServerResponse, ServerRequest } from 'src/pages/server/_types/type';

import { Area, ChatContainer, LogContainer } from './AdminChatServer';

export default function ServerTest() {
  const [logs, setLogs] = useState<string>('');
  const [createServerName, setCreateServerName] = useState<string>('');
  const [createImageUrl, setCreateImageUrl] = useState<string>('');
  const [currentServerId, setCurrentServerId] = useState<string>('');
  const [updateServerId, setUpdateServerId] = useState<string>('');
  const [updateServerName, setUpdateServerName] = useState<string>('');
  const [updateImageUrl, setUpdateImageUrl] = useState<string>('');
  const [deleteServerId, setDeleteServerId] = useState<string>('');

  const { data } = useQueryGet<ServerResponse>('getAllServers', '/chat/v1/server/all');
  const createMutation = useMutationPost<ServerResponse, ServerRequest>('/chat/v1/server');
  const updateMutation = useMutationPatch<ServerResponse, ServerRequest>(`/chat/v1/server/${updateServerId}`);
  const deleteMutation = useMutationDelete(`/chat/v1/server/${deleteServerId}`);

  const updateLogs = (newLog: string) => {
    setLogs((prevLogs) => prevLogs + '\n' + newLog);
  };

  useEffect(() => {
    if (createMutation.data) updateLogs(JSON.stringify(createMutation.data));
  }, [createMutation.data]);

  useEffect(() => {
    if (updateMutation.data) updateLogs(JSON.stringify(updateMutation.data));
  }, [updateMutation.data]);

  useEffect(() => {
    if (deleteMutation.data) updateLogs(JSON.stringify(deleteMutation.data));
  }, [deleteMutation.data]);

  return (
    <Area>
      <ChatContainer>
        <strong>서버AI</strong>
        <input value={currentServerId} onChange={(e) => setCurrentServerId(e.target.value)}></input>
        <div>
          <label>Get 전체서버</label>
          <button onClick={() => updateLogs(JSON.stringify(data))}>Get</button>
        </div>
        <div>
          <label>Create 서버</label>
          <input placeholder='name' value={createServerName} onChange={(e) => setCreateServerName(e.target.value)} />
          <input placeholder='imageUrl' value={createImageUrl} onChange={(e) => setCreateImageUrl(e.target.value)} />
          <button onClick={() => createMutation.mutate({ name: createServerName, imageUrl: createImageUrl })}>
            Post
          </button>
        </div>
        <div>
          <label>Update 서버</label>
          <input placeholder='id' value={updateServerId} onChange={(e) => setUpdateServerId(e.target.value)} />
          <input placeholder='name' value={updateServerName} onChange={(e) => setUpdateServerName(e.target.value)} />
          <input placeholder='imageUrl' value={updateImageUrl} onChange={(e) => setUpdateImageUrl(e.target.value)} />
          <button onClick={() => updateMutation.mutate({ name: updateServerName, imageUrl: updateImageUrl })}>
            Patch
          </button>
        </div>
        <div>
          <label>Delete 서버</label>
          <input placeholder='id' value={deleteServerId} onChange={(e) => setDeleteServerId(e.target.value)} />
          <button onClick={() => deleteMutation.mutate()}>Delete</button>
        </div>
      </ChatContainer>
      <LogContainer>
        <textarea value={logs} readOnly />
        <button
          onClick={() => {
            setLogs('');
          }}
        >
          Clear
        </button>
      </LogContainer>
    </Area>
  );
}
