import { useEffect, useState } from 'react';
import { useMutationPost, useMutationPatch, useMutationDelete, useQueryGet } from 'src/apis/service/service';
import { ChannelResponse, ChannelRequest } from 'src/pages/server/_types/type';
import { Area, ChatContainer, LogContainer } from './AdminChatServer';

export default function ChannelTest() {
  const [logs, setLogs] = useState<string>('');
  const [userId, setUserId] = useState<string>('1');
  const [serverId, setServerId] = useState<string>('1');
  const [createChannelName, setCreateChannelName] = useState<string>('');
  const [createChannelGroupId, setCreateChannelGroupId] = useState<string>('');
  const [createChannelVoice, setCreateChannelVoice] = useState<boolean>(false);
  const [createChannelPrivate, setCreateChannelPrivate] = useState<boolean>(false);
  const [updateChannelId, setUpdateChannelId] = useState<string>('');
  const [updateChannelName, setUpdateChannelName] = useState<string>('');
  const [deleteChannelId, setDeleteChannelId] = useState<string>('');

  const { refetch } = useQueryGet<ChannelResponse>(
    'getAllChannels',
    `/chat/v1/server/${serverId}/channel/all?userId=${userId}`,
  );
  const createMutation = useMutationPost<ChannelResponse, ChannelRequest>(
    `/chat/v1/server/${serverId}/channel?userId=${userId}`,
  );
  const updateMutation = useMutationPatch<ChannelResponse, ChannelRequest>(
    `/chat/v1/server/${serverId}/channel/${updateChannelId}`,
  );
  const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}/channel/${deleteChannelId}`);

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
        <label>
          유저 ID
          <input value={userId} onChange={(e) => setUserId(e.target.value)}></input>
        </label>
        <label>
          서버 ID
          <input value={serverId} onChange={(e) => setServerId(e.target.value)}></input>
        </label>
        <div>
          <label>Get 전체체널</label>
          <button
            onClick={() => {
              refetch().then((result) => updateLogs(JSON.stringify(result.data)));
            }}
          >
            Get
          </button>
        </div>
        <div>
          <label>Create 체널</label>
          <input placeholder='name' value={createChannelName} onChange={(e) => setCreateChannelName(e.target.value)} />
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
