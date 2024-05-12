import { ChannelData } from '../../_types/type';
import { MessageItem, User } from '../chatChannel/_types/type';

export interface ChatChannelIntroProps {
  channelData: ChannelData | undefined;
}

export interface ChatDayDividerProps {
  ChatDayDividerDay: string;
}

export interface ChatInputBoxProps {
  messageInputRef: React.RefObject<HTMLInputElement>;
  handleSendMessageKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  messageMaxLength: number;
  isClickedUtilityButton: boolean;
  handleUiilityButtonClick: () => void;
}

export interface MessageLoadingSpinnerProps {
  infiniteScrollTriggerRef: React.RefObject<HTMLDivElement>;
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
