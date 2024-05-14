import { User } from "../../chatChannel/_types/type";

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