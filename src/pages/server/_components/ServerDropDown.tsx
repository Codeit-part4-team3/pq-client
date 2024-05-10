import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreateCategoryModal from 'src/components/modal/contents/CreateCategoryModal';
import InviteLinkModal from 'src/components/modal/contents/InviteLinkModal';
import InviteMemberModal from 'src/components/modal/contents/InviteMemberModal';
import { ServerDropdownType } from 'src/constants/enum';
import styled from 'styled-components';

interface Prorps {
  isDropDown: boolean;
  toggleDropDown: () => void;
}

const DropdownList = [
  { name: '카테고리 생성', type: ServerDropdownType.CREATE_CATEORY },
  { name: '초대코드 생성', type: ServerDropdownType.INVITE_LINK },
  { name: '멤버 초대하기', type: ServerDropdownType.INVITE_MEMBER },
];

export default function ServerDropDown({ isDropDown, toggleDropDown }: Prorps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [dropdownType, setDropdownType] = useState<ServerDropdownType>(ServerDropdownType.CREATE_CATEORY);
  const location = useLocation();

  const serverId = location.pathname.split('/')[2];

  // const serverId = useContext(ServerIdContext);
  // const deleteMutation = useMutationDelete(`/chat/v1/server/${serverId}`);

  const handleCloseModal = () => {
    setIsShow(false);
    toggleDropDown();
  };

  const handleClick = (type: ServerDropdownType) => {
    setDropdownType(type);
    setIsShow(true);
  };

  return (
    <Area>
      <ButtonContainer $isDown={isDropDown}>
        {DropdownList.map((item) => {
          return (
            <Button key={item.type} type='button' onClick={() => handleClick(item.type)}>
              {item.name}
            </Button>
          );
        })}

        {/* <Button type='button' onClick={() => deleteMutation.mutate()}>
        서버 삭제
      </Button> */}
      </ButtonContainer>
      {
        {
          [ServerDropdownType.CREATE_CATEORY]: <CreateCategoryModal closeModal={handleCloseModal} isOpen={isShow} />,
          [ServerDropdownType.INVITE_LINK]: (
            <InviteLinkModal closeModal={handleCloseModal} isOpen={isShow} serverId={Number(serverId)} />
          ),
          [ServerDropdownType.INVITE_MEMBER]: <InviteMemberModal closeModal={handleCloseModal} isOpen={isShow} />,
        }[dropdownType]
      }
    </Area>
  );
}

type ButtonContainerProps = {
  $isDown: boolean;
};

const Area = styled.section`
  width: 100%;
  height: 0;
  padding: 10px;
  background: transparent;

  position: absolute;
  top: 80%;
`;

const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  transform-origin: 95% 0%;
  transition: 0.2s all ease-in-out;
  transform: ${(props) => (props.$isDown ? 'scale(1.0)' : 'scale(0)')};
`;

const Button = styled.button`
  width: 100%;
  padding: 6px 10px 6px 10px;
  color: #000;
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
