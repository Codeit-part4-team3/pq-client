import { ChannelData, ChannelGroupData, ServerData } from './type';

export interface ServerItemProps {
  data: ServerData;
}

export interface ChannelItemProps {
  data: ChannelData;
}

export interface ChannelGroupProps {
  data: ChannelGroupData;
  children: React.ReactNode;
}
