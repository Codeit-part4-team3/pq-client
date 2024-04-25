export interface ServerItem {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ChannelItem {
  id: number;
  parentId: number;
  name: string;
  isVoice: boolean;
}

export interface ChannelParentItem {
  id: number;
  name: string;
}
