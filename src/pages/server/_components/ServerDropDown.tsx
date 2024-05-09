import { useLocation } from 'react-router-dom';
import CreateCategoryModal from 'src/components/modal/contents/CreateCategoryModal';
import InvitedServerList from 'src/components/modal/contents/InvitedServerList';
import InviteLinkModal from 'src/components/modal/contents/InviteLinkModal';
import InviteMemberModal from 'src/components/modal/contents/InviteMemberModal';
import { useOpenModal } from 'src/hooks/useOpenModal';
import styled from 'styled-components';

interface Prorps {
  isDropDown: boolean;
  toggleDropDown: () => void;
}

export default function ServerDropDown({ isDropDown, toggleDropDown }: Prorps) {
  const { isOpen: isCategory, openModal: openCategory, closeModal: closeCategory } = useOpenModal();
  const { isOpen: isInviteLink, openModal: openInviteLink, closeModal: closeInviteLink } = useOpenModal();
  const { isOpen: isInviteMember, openModal: openInviteMember, closeModal: closeInviteMember } = useOpenModal();
  const {
    isOpen: isInvitedServerList,
    openModal: openInvitedServerList,
    closeModal: closeInvitedServerList,
  } = useOpenModal();
  const location = useLocation();

  const serverId = location.pathname.split('/')[2];

  // const serverId = useContext(ServerIdContext);
  // const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}`);

  const closeCtegoryModal = async () => {
    await closeCategory();
    toggleDropDown();
  };

  const closeInviteLinkModal = async () => {
    await closeInviteLink();
    toggleDropDown();
  };

  const closeInviteMemberModal = async () => {
    await closeInviteMember();
    toggleDropDown();
  };

  return (
    <Area>
      <ButtonContainer isDown={isDropDown}>
        <Button type='button' onClick={openCategory}>
          카테고리 생성
        </Button>
        <Button type='button' onClick={openInviteLink}>
          초대코드 생성
        </Button>
        <Button type='button' onClick={openInviteMember}>
          멤버 초대하기
        </Button>
        <Button type='button' onClick={openInvitedServerList}>
          초대받은 서버목록
        </Button>
        {/* <Button type='button' onClick={() => deleteMutation.mutate()}>
        서버 삭제
      </Button> */}
      </ButtonContainer>
      <CreateCategoryModal closeModal={closeCtegoryModal} isOpen={isCategory} />
      <InviteLinkModal closeModal={closeInviteLinkModal} isOpen={isInviteLink} serverId={Number(serverId)} />
      <InviteMemberModal closeModal={closeInviteMemberModal} isOpen={isInviteMember} />
      <InvitedServerList closeModal={closeInvitedServerList} isOpen={isInvitedServerList} />
    </Area>
  );
}

type ButtonContainerProps = {
  isDown: boolean;
};

const Area = styled.section`
  width: 100%;
  height: 100%;

  padding: 10px;
  background: transparent;

  position: absolute;
  top: 48px;
`;

const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  transform-origin: 50% 0%;
  transition: 0.2s all ease-in-out;
  transform: ${(props) => (props.isDown ? 'scale(1.0)' : 'scale(0)')};
`;

const Button = styled.button`
  width: 100%;
  padding: 6px 10px 6px 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 51.2px */
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
