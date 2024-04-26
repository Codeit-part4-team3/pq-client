export interface ServerItem {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ChannelItem {
  id: number;
  subjectId: number;
  name: string;
  isVoice: boolean;
}

export interface ChannelSubjectItem {
  id: number;
  name: string;
}
