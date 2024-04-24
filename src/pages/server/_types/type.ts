export interface ServerItem {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ChannelItem {
  id: number;
  name: string;
  isVoice: boolean;
}

export interface ChannelList {
  id: number;
  name: string;
  ChannelItems: ChannelItem[];
}
