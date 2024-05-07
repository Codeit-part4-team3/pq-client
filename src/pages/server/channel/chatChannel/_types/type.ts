export interface MessageItem {
  channelId: string;
  createdAt: number;
  messageId: string;
  message: string;
  userId: string;
  updatedAt: number;
  status: string;
}

export interface lastKey {
  channelId: string;
  createdAt: number;
}
