import { handleMessageTextEditingKeyDown, MessageItem, User } from './type';

export interface ChatChannelProps {
  channeId: string;
}

export interface ChatMessagesProps {
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

export interface ChatMessageTextEditingBoxProps {
  messageItem: MessageItem;
  editingMessage: string;
  onEditingMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateKeyDown: (message: { messageId: string; createdAt: number }) => void;
  onUpdateCancelClick: (message: { messageId: string }) => void;
  onKeyDown: ({ e, messageId, createdAt }: handleMessageTextEditingKeyDown) => void;
}

export interface useChatMessagesProps {
  onUpdateMessageKeyDown: ({ messageId, createdAt }: { messageId: string; createdAt: number }) => void;
  onUpdateMessageCancelClick: ({ messageId }: { messageId: string }) => void;
  setEditingMessage: React.Dispatch<React.SetStateAction<string>>;
}
