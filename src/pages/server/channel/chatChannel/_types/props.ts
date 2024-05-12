import { MessageItem, User } from './type';

export interface ChatChannelProps {
  channeId: string;
}

export interface ChatMessagesProps {
  serverUserData: User[] | undefined;
  messages: MessageItem[];
  onUpdateMessageClick: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
  onDeleteMessageClick: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
  onUpdateMessageKeyDown: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
  onUpdateMessageCancelClick: ({ messageId }: { messageId: string }) => void;
  editingMessage: string;
  setEditingMessage: React.Dispatch<React.SetStateAction<string>>;
  onEditingMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentEditingMessageId: string | null;
}

export interface FormatMessageDataProps {
  serverUserData: User[] | undefined;
  messages: MessageItem[];
  messageItem: MessageItem;
  index: number;
  isDifferentUserRef: React.MutableRefObject<boolean>;
}

export interface ContextMenuProps {
  positionX: number;
  positionY: number;
  messageId: string;
  createdAt: number;
  onDeleteMessageClick: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
  onUpdateMessageClick: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
}
