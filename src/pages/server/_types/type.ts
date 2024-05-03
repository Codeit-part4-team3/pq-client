export interface IServer {
  id: number;
  name: string;
  imageUrl: string;
}

export type ServerRequest = Omit<IServer, 'id'>;
export type ServerResponse = IServer | null;

export type ServerData = IServer;

export interface IChannel {
  id: number;
  name: string;
  groupId?: number;
  isVoice: boolean;
  isPrivate: boolean;
}

export type ChannelRequest = Omit<IChannel, 'id'>;
export type ChannelResponse = IChannel | null;

export type ChannelGroupRequest = Pick<IChannel, 'id' | 'name'>;
export type ChannelGroupResponse = IChannel | null;

export type ChannelData = IChannel;
export type ChannelGroupData = Pick<IChannel, 'id' | 'name'>;

/**
 * Invite
 */
interface IInviteLink {
  inviteLink: string;
}

export type InviteLinkResponse = IInviteLink | null;

interface IInviteMember {
  inviterId: number;
  inviteeEmail: string;
}

export type InviteMemberRequest = IInviteMember;
export type InviteMemberResponse = IInviteMember | null;
