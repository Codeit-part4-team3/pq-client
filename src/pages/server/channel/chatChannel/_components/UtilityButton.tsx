import styled from 'styled-components';
import addSvg from '../../../../../../public/images/add_FILL0_wght200_GRAD0_opsz24 3.svg';
import UtilityMenu from './UtilityMenu';

interface UtilityButtonProps {
  isClickedUtilityButton: boolean;
  handleUiilityButtonClick: () => void;
}

export default function UtilityButton({ isClickedUtilityButton, handleUiilityButtonClick }: UtilityButtonProps) {
  return (
    <Wrapper $isClickedUtilityButton={isClickedUtilityButton} onClick={handleUiilityButtonClick}>
      <img src={addSvg} alt='add 이미지' width={24} height={24} />
      {isClickedUtilityButton ? <UtilityMenu /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $isClickedUtilityButton: boolean }>`
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isClickedUtilityButton }) => ($isClickedUtilityButton ? '#d8e2ff' : 'transparent')};

  position: absolute;
  top: 12px;
  right: 12px;
  bottom: 12px;

  cursor: pointer;

  &:hover {
    background-color: #d8e2ff;
  }
`;
