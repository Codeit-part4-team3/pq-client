export interface IMeetingNote {
    id: string;
    channelId: string;
    createdAt: number;
    name: string;
    content: {
        userId: number;
        text: string;
    }[];
}