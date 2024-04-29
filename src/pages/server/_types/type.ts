interface IServer {
  id: number;
  name: string;
  imageUrl: string;
}

export type ServerRequest = Omit<IServer, 'id'>;
export type ServerResponse = IServer | null;

export type ServerData = IServer;

interface IChannel {
  id: number;
  name: string;
  serverId: number;
  groupId: number;
  isVoice: boolean;
}

export type ChannelRequest = Omit<IChannel, 'id'>;
export type ChannelResponse = IChannel | null;

export type ChannelGroupRequest = Pick<IChannel, 'id' | 'name'>;
export type ChannelGroupResponse = IChannel | null;

export type ChannelData = IChannel;
export type ChannelGroupData = Pick<IChannel, 'id' | 'name'>;
