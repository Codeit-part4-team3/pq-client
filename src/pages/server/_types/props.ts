import { ChannelData, ChannelGroupData, ChannelResponse, ServerData } from './type';

export interface ServerItemProps {
  data: ServerData;
  channelDataList: ChannelData[] | ChannelResponse[] | undefined; // fixme: type
}

export interface ChannelItemProps {
  data: ChannelData;
}

export interface ChannelGroupProps {
  data: ChannelGroupData;
  children: React.ReactNode;
}
