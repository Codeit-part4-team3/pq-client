export interface IServer {
  id: number;
  name: string;
  imageUrl?: string;
}

export type ServerRequest = Omit<IServer, 'id'> & { imageFile: File | null };
export type ServerResponse = IServer | null;

export type ServerData = IServer;

export interface IChannel {
  id: number;
  name?: string;
  groupId?: number;
  serverId?: number;
  isVoice?: boolean;
  isPrivate?: boolean;
}

export type ChannelRequest = Omit<IChannel, 'id' | 'serverId'>;
export type ChannelResponse = IChannel | null;

export type ChannelGroupRequest = Pick<IChannel, 'id' | 'name'>;
export type ChannelGroupResponse = IChannel | null;

export type ChannelData = IChannel;
export type ChannelGroupData = Pick<IChannel, 'id' | 'name'>;

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  imageUrl?: string;
  state: string;
}

export type UserResponse = Pick<IUser, 'id' | 'nickname' | 'email'> | null;

/**
 * Invite
 */
interface IInviteLink {
  inviteeId: number;
  secretKey: string;

  redirectUrl: string;
}

export type InviteLinkRequest = Omit<IInviteLink, 'redirectUrl'>;
export type InviteLinkResponse = Pick<IInviteLink, 'redirectUrl'> | null;

interface IGetInviteLink {
  inviteLink: string;
}

export type GetInviteLinkResponse = IGetInviteLink | null;

interface IInviteMember {
  inviterId: number;
  inviteeEmail: string;
}

export type InviteMemberRequest = IInviteMember;
export type InviteMemberResponse = IInviteMember | null;

interface IInvite {
  inviteId: number;
  isAccept: boolean;
}

export type InvitedServerRequest = IInvite;

interface IInvitedServer {
  inviteId: number;
  serverName: string;
  inviterName: string;
}

export type InvitedServerResponse = IInvitedServer | null;
