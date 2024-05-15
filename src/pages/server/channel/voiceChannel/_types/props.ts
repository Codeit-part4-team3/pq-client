import { User } from '../../chatChannel/_types/type';
import { IMeetingNote } from './type';

export interface VoiceChannelProps {
  channeId: string;
}

export interface MeetingNoteProps {
  roomName: string;
  userId: number;
  serverUserData: User[] | undefined;
  meetingNoteId: string | null;
  recognizedTexts: { userId: number; text: string }[];
  setRecognizedTexts: React.Dispatch<React.SetStateAction<{ userId: number; text: string }[]>>;
}

export interface UseMeetingNoteProps {
  roomName: string;
  userId: number;
  meetingNoteId: string | null;
  recognizedTexts: { userId: number; text: string }[];
}
export interface MyMediaControlPanelProps {
  onMuteLocalStreamButtonClick: () => void;
  isMutedLocalStream: boolean;
  onOffLocalCameraButtonClick: () => void;
  showLocalVideo: boolean;
  onHandleMuteAllRemoteStreamsButtonClick: () => void;
  isMutedAllRemoteStreams: boolean;
  showMeetingNote: boolean;
  onMeetingNoteModalOpen: () => void;
  onMeetingNoteEndClick: () => void;
  onMeetingNoteListOpen: () => void;
  isOpenMeetingNoteList: boolean;
}

export interface LocalMediaProps {
  userId: number;
  userNickname: string;
  stream: MediaStream | null;
  isMutedLocalStream: boolean;
  showLocalVideo: boolean;
}

export interface RemoteMediaProps {
  userId: number;
  stream: MediaStream | null;
  userNickname: string;
  isMutedAllRemoteStreams: boolean;
  showVideo: boolean;
  serverUserData: User[] | undefined;
}

export interface MeetingNoteListModalProps {
  isOpenMeetingNoteList: boolean;
  onClose: () => void;
  getMeetingNoteList: () => void;
  meetingNoteList: IMeetingNote[];
  serverUserData: User[] | undefined;
}

export interface MeetingNoteModalProps {
  startMeetingNote: (meetingNoteName: string) => void;
  meetingNoteModalOpen: boolean;
  onModalClose: () => void;
}
