import { ServerData, ChannelData, ChannelGroupData } from '../_types/type';

export const serverMock: ServerData[] = [
  {
    id: 1,
    name: '코드잇 3기',
    imageUrl: '',
  },
  {
    id: 2,
    name: 'Full Stack 1기',
    imageUrl: '',
  },
  {
    id: 3,
    name: 'CI/CD is good',
    imageUrl: 'https://picsum.photos/48',
  },
  {
    id: 4,
    name: 'hello aws',
    imageUrl: 'https://picsum.photos/48',
  },
  {
    id: 5,
    name: '꽙꽙이들의 모임',
    imageUrl: '',
  },
];

export const channelGroupMock: ChannelGroupData[] = [
  {
    id: 1,
    name: '일반',
  },
  {
    id: 2,
    name: '스터디',
  },
  {
    id: 3,
    name: '음성',
  },
];

export const channelItemMock: ChannelData[] = [
  {
    id: 1,
    serverId: 1,
    name: '일반1',
    groupId: 1,
    isVoice: false,
  },
  {
    id: 2,
    serverId: 1,
    name: '일반2',
    groupId: 1,
    isVoice: false,
  },
  {
    id: 3,
    serverId: 1,
    name: '일반3',
    groupId: 1,
    isVoice: false,
  },

  {
    id: 4,
    serverId: 2,
    name: '스터디1',
    groupId: 2,
    isVoice: false,
  },
  {
    id: 5,
    serverId: 2,
    name: '스터디2',
    groupId: 2,
    isVoice: false,
  },
  {
    id: 6,
    serverId: 2,
    name: '스터디3',
    groupId: 2,
    isVoice: false,
  },
  {
    id: 7,
    serverId: 3,
    name: '음성1',
    groupId: 3,
    isVoice: true,
  },
  {
    id: 8,
    serverId: 3,
    name: '음성2',
    groupId: 3,
    isVoice: true,
  },
  {
    id: 9,
    serverId: 3,
    name: '음성3',
    groupId: 3,
    isVoice: true,
  },
];
