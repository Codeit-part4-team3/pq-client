import { ChannelList, ServerItem } from '../_types/type';

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

export const channelMock: ChannelList[] = [
  {
    id: 1,
    name: '일반',
    ChannelItems: [
      {
        id: 1,
        name: '일반1',
        isVoice: false,
      },
      {
        id: 2,
        name: '일반2',
        isVoice: false,
      },
      {
        id: 3,
        name: '일반3',
        isVoice: false,
      },
    ],
  },
  {
    id: 2,
    name: '스터디',
    ChannelItems: [
      {
        id: 4,
        name: '스터디1',
        isVoice: false,
      },
      {
        id: 5,
        name: '스터디2',
        isVoice: false,
      },
      {
        id: 6,
        name: '스터디3',
        isVoice: false,
      },
    ],
  },
  {
    id: 3,
    name: '음성',
    ChannelItems: [
      {
        id: 7,
        name: '음성1',
        isVoice: true,
      },
      {
        id: 8,
        name: '음성2',
        isVoice: true,
      },
      {
        id: 9,
        name: '음성3',
        isVoice: true,
      },
    ],
  },
];
