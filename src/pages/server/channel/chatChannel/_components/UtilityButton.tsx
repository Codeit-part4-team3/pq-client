import styled from 'styled-components';
import addSvg from '../../../../../../public/images/add_FILL0_wght200_GRAD0_opsz24 3.svg';
import UtilityMenu from './UtilityMenu';
import { useState } from 'react';

export default function UtilityButton() {
  // 유틸리티 버튼
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Wrapper $isClicked={isClicked} onClick={handleButtonClick}>
      <img src={addSvg} alt='add 이미지' width={24} height={24} />
      {isClicked ? <UtilityMenu /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $isClicked: boolean }>`
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isClicked }) => ($isClicked ? '#d8e2ff' : 'transparent')};

  position: absolute;
  top: 12px;
  right: 12px;
  bottom: 12px;

  cursor: pointer;

  &:hover {
    background-color: #d8e2ff;
  }
`;
