import { useEffect } from 'react';
import { USER_URL } from 'src/constants/apiUrl';
import { useMutationPut } from 'src/apis/service/service';
import { ReponseUserState, RequestUserState } from 'src/types/userType';
import useUserStore from 'src/store/userStore';

export const useStateTimer = () => {
  const { mutate } = useMutationPut<ReponseUserState, RequestUserState>(`${USER_URL.USER}/me/state/update`, {
    onSuccess: async (data: ReponseUserState) => {
      if (data.name !== '오프라인') {
        setUserInfo({ ...userInfo, state: data.name });
      }
    },
  });
  const idleTime = 300000;

  const { userInfo, setUserInfo } = useUserStore();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = async () => {
      clearTimeout(timeoutId); // 기존 타이머를 지우고

      timeoutId = setTimeout(() => {
        try {
          mutate({ state: '자리비움' });
        } catch (error) {
          console.error('Failed to update user state:', error);
        }
      }, idleTime);
    };
    const handleWindowClose = async () => {
      try {
        mutate({ state: '오프라인' });
      } catch (error) {
        console.error('Failed to update user state:', error);
      }
    };

    // 이벤트 리스너 등록: 마우스와 키보드 활동 감지
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // 첫 설정에서도 타이머를 시작
    handleActivity();

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(timeoutId);
    };
  }, []);
};
