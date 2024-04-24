import { ChannelItem, ChannelParentItem, ServerItem } from '../_types/type';

export const serverMock: ServerItem[] = [
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

export const channelParentMock: ChannelParentItem[] = [
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

export const channelMock: ChannelItem[] = [
  {
    id: 1,
    parentId: 1,
    name: '일반1',
    isVoice: false,
  },
  {
    id: 2,
    parentId: 1,
    name: '일반2',
    isVoice: false,
  },
  {
    id: 3,
    parentId: 1,
    name: '일반3',
    isVoice: false,
  },

  {
    id: 4,
    parentId: 2,
    name: '스터디1',
    isVoice: false,
  },
  {
    id: 5,
    parentId: 2,
    name: '스터디2',
    isVoice: false,
  },
  {
    id: 6,
    parentId: 2,
    name: '스터디3',
    isVoice: false,
  },
  {
    id: 7,
    parentId: 3,
    name: '음성1',
    isVoice: true,
  },
  {
    id: 8,
    parentId: 3,
    name: '음성2',
    isVoice: true,
  },
  {
    id: 9,
    parentId: 3,
    name: '음성3',
    isVoice: true,
  },
];
