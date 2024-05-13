export interface MessageItem {
  channelId: string;
  createdAt: number;
  messageId: string;
  message: string;
  userId: number;
  updatedAt: number;
  status: string;
  notReadCount: number;
}

export interface ReadMessageItem {
  prevMessageId: string;
  messageId: string;
  channelId: string;
  userId: number;
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

export interface handleMessageTextEditingKeyDown {
  e: React.KeyboardEvent<HTMLInputElement>;
  messageId: string;
  createdAt: number;
}
