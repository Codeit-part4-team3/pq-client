import { useParams } from 'react-router-dom';
import { useQueryGet } from 'src/apis/service/service';
import { ChannelData } from 'src/pages/server/_types/type';
import useUserStore from 'src/store/userStore';

export default function useChatChannelIntro() {
  // 유저, 서버, 채널 데이터
  const { userInfo } = useUserStore();
  const { id: userId } = userInfo;
  const { serverId, channelId } = useParams();

  // 채널 데이터
  const { data: channelData } = useQueryGet<ChannelData>(
    'getCurrentChannel',
    `/chat/v1/server/${serverId}/channel/${channelId}`,
    {
      staleTime: 5000,
      refetchInterval: 5000,
      enabled: !!userId,
    },
  );
  return { channelData };
}
