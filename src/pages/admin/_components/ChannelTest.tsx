import { useEffect, useState } from 'react';
import { useMutationPost, useMutationPatch, useMutationDelete, useQueryGet } from 'src/apis/service/service';
import { ChannelResponse, ChannelRequest } from 'src/pages/server/_types/type';
import { Area, ChatContainer, LogContainer } from './AdminChatServer';

export default function ChannelTest() {
  const [logs, setLogs] = useState<string>('');
  const [currentChannelId, setCurrentChannelId] = useState<string>('');
  const [createChannelName, setCreateChannelName] = useState<string>('');
  const [createChannelServerId, setCreateChannelServerId] = useState<string>('');
  const [createChannelGroupId, setCreateChannelGroupId] = useState<string>('');
  const [createChannelVoice, setCreateChannelVoice] = useState<boolean>(false);
  const [createChannelPrivate, setCreateChannelPrivate] = useState<boolean>(false);
  const [updateChannelId, setUpdateChannelId] = useState<string>('');
  const [updateChannelName, setUpdateChannelName] = useState<string>('');
  const [deleteChannelId, setDeleteChannelId] = useState<string>('');

  const { data } = useQueryGet<ChannelResponse>('getAllChannels', '/chat/v1/channel/all');
  const createMutation = useMutationPost<ChannelResponse, ChannelRequest>('/chat/v1/channel');
  const updateMutation = useMutationPatch<ChannelResponse, ChannelRequest>(`/chat/v1/channel/${updateChannelId}`);
  const deleteMutation = useMutationDelete(`/chat/v1/channel/${deleteChannelId}`);

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
        <strong>체널API</strong>
        <input value={currentChannelId} onChange={(e) => setCurrentChannelId(e.target.value)}></input>
        <div>
          <label>Get 전체체널</label>
          <button onClick={() => updateLogs(JSON.stringify(data))}>Get</button>
        </div>
        <div>
          <label>Create 체널</label>
          <input placeholder='name' value={createChannelName} onChange={(e) => setCreateChannelName(e.target.value)} />
          <input
            placeholder='serverId'
            value={createChannelServerId}
            onChange={(e) => setCreateChannelServerId(e.target.value)}
          />
          <input
            placeholder='groupId'
            value={createChannelGroupId}
            onChange={(e) => setCreateChannelGroupId(e.target.value)}
          />
          <label>voice</label>
          <input
            placeholder='voice'
            type='checkbox'
            checked={createChannelVoice}
            onChange={(e) => setCreateChannelVoice(e.target.checked)}
          />
          <label>private</label>
          <input
            placeholder='private'
            type='checkbox'
            checked={createChannelPrivate}
            onChange={(e) => setCreateChannelPrivate(e.target.checked)}
          />
          <button
            onClick={() =>
              createMutation.mutate({
                name: createChannelName,
                serverId: Number(createChannelServerId),
                isVoice: createChannelVoice,
                isPrivate: createChannelPrivate,
              })
            }
          >
            Post
          </button>
        </div>
        <div>
          <label>Update 체널</label>
          <input placeholder='id' value={updateChannelId} onChange={(e) => setUpdateChannelId(e.target.value)} />
          <input placeholder='name' value={updateChannelName} onChange={(e) => setUpdateChannelName(e.target.value)} />
          <button
            onClick={() =>
              updateMutation.mutate({
                name: updateChannelName,
                serverId: Number(createChannelServerId),
                groupId: Number(createChannelGroupId),
                isVoice: createChannelVoice,
                isPrivate: createChannelPrivate,
              })
            }
          >
            patch
          </button>
        </div>
        <div>
          <label>Delete 체널</label>
          <input placeholder='id' value={deleteChannelId} onChange={(e) => setDeleteChannelId(e.target.value)} />
          <button onClick={() => deleteMutation.mutate()}>delete</button>
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
