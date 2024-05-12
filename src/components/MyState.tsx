import { useMutationPut } from 'src/apis/service/service';
import { USER_URL } from 'src/constants/apiUrl';
import useUserStore from 'src/store/userStore';
import { RequestUserState, ReponseUserState } from 'src/types/userType';
import styled from 'styled-components';

export default function MyState() {
  const { userInfo, setUserInfo } = useUserStore();
  const updateMutation = useMutationPut<ReponseUserState, RequestUserState>(`${USER_URL.USER}/me/state/update`, {
    onSuccess: (res: ReponseUserState) => {
      setUserInfo({ ...userInfo, state: res.name });
    },
  });
  const handleClick = (state: string) => {
    updateMutation.mutate({ state });
  };
  return (
    <Area>
      <Button type='button' onClick={() => handleClick('온라인')}>
        <Status $state='온라인' />
        온라인
      </Button>
      <Button type='button' onClick={() => handleClick('자리비움')}>
        <Status $state='자리비움' />
        자리비움
      </Button>
      <Button type='button' onClick={() => handleClick('오프라인')}>
        <Status $state='오프라인' />
        오프라인
      </Button>
    </Area>
  );
}

const Area = styled.div`
  width: 55%;
  left: 35%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  transform-origin: 15% 100%;
  transition: 0.2s all ease-in-out;
  background: var(--landing_background_color);
  position: absolute;
  top: -101%;
  z-index: 10;
`;

const Button = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;

  width: 100%;
  height: 32px;

  padding: 6px 10px 6px 10px;
  color: #000;
  font-weight: 500;
  font-size: 14px;
  background: var(--landing_background_color);
  border: none;
  border-bottom: 1px solid var(--text_gray);
  text-align: left;

  &:hover {
    background: #fafafa;
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Status = styled.div<{ $state: string }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) =>
    props.$state === '온라인' ? 'green' : props.$state === '자리비움' ? 'orange' : 'gray'};
  border-radius: 50%;
`;
