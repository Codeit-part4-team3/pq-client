export interface Event {
  id: number;
  title: string;
  start: Date;
}

export type EventReqeust = Omit<Event, 'id'> & { serverId: number };
