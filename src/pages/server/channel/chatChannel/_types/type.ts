export interface MessageItem {
  channelId: string;
  createdAt: number;
  messageId: string;
  message: string;
  userId: number;
  updatedAt: number;
  status: string;
}

export interface lastKey {
  channelId: string;
  createdAt: number;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
}
