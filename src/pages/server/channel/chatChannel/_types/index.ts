export interface Message {
  userId: string;
  message: string;
  createdAt: number;
  updatedAt: number;
  status: string;
}

export interface MessageItem {
  channelId: string;
  messageId: string;
  message: Message;
}
