import { useLocation } from 'react-router-dom';
import CreateCategoryModal from 'src/components/modal/contents/CreateCategoryModal';
import InviteLinkModal from 'src/components/modal/contents/InviteLinkModal';
import { useOpenModal } from 'src/hooks/useOpenModal';
import styled from 'styled-components';

interface Prorps {
  isDropDown: boolean;
  toggleDropDown: () => void;
}

export default function ServerDropDown({ isDropDown, toggleDropDown }: Prorps) {
  const { isOpen: isCategory, openModal: openCategory, closeModal: closeCategory } = useOpenModal();
  const { isOpen: isInvite, openModal: openInvite, closeModal: closeInvite } = useOpenModal();
  const location = useLocation();

  const serverId = location.pathname.split('/')[2];

  // const serverId = useContext(ServerIdContext);
  // const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}`);

  const closeCtegoryModal = async () => {
    await closeCategory();
    toggleDropDown();
  };

  const closeInviteModal = async () => {
    await closeInvite();
    toggleDropDown();
  };

  return (
    <Area>
      <ButtonContainer isDown={isDropDown}>
        <Button type='button' onClick={openInvite}>
          초대코드 생성
        </Button>
        <Button type='button' onClick={openCategory}>
          카테고리 생성
        </Button>
        {/* <Button type='button' onClick={() => deleteMutation.mutate()}>
        서버 삭제
      </Button> */}
      </ButtonContainer>
      <CreateCategoryModal closeModal={closeCtegoryModal} isOpen={isCategory} />
      <InviteLinkModal closeModal={closeInviteModal} isOpen={isInvite} serverId={Number(serverId)} />
    </Area>
  );
}

type ButtonContainerProps = {
  isDown: boolean;
};

const Area = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  top: 48px;
`;

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;

  padding: 10px;
  flex-direction: column;
  border-radius: 25%;
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
  background: #fff;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  text-align: left;

  &:hover {
    background: #d9d9d9;
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`;
