import { MyDropdownType } from 'src/constants/enum';
import styled from 'styled-components';

interface Prorps {
  isDropDown: boolean;
  selectItem: (item: MyDropdownType) => void;
}

const DropdownList = [
  { name: '초대받은 서버목록', type: MyDropdownType.INVITED_SERVER_LIST },
  { name: '로그아웃', type: MyDropdownType.LOGOUT },
];

export default function MyDropDown({ isDropDown, selectItem }: Prorps) {
  const handleClick = (type: MyDropdownType) => {
    selectItem(type);
  };

  return (
    <Area>
      <ButtonContainer isDown={isDropDown} childCount={DropdownList.length}>
        {DropdownList.map((item) => {
          return (
            <Button key={item.type} type='button' onClick={() => handleClick(item.type)}>
              {item.name}
            </Button>
          );
        })}
      </ButtonContainer>
    </Area>
  );
}

type ButtonContainerProps = {
  isDown: boolean;
  childCount: number;
};

const Area = styled.section`
  width: 100%;
  height: 100%;

  background: transparent;

  position: absolute;
  top: -100%;
`;

const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  transform-origin: 15% 100%;
  transition: 0.2s all ease-in-out;
  transform: ${(props) => (props.isDown ? 'scale(1.0)' : 'scale(0)')};

  position: absolute;
  top: ${(props) => `calc(90% + ${props.childCount * -32}px)`};
`;

const Button = styled.button`
  width: 100%;
  height: 32px;

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
