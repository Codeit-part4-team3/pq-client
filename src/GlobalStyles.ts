import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    
    width: 100%;
    min-height: 100vh;

    background-color: #FFF;
  }

  #root {
    width: 100%;
    min-height: 100vh;

    // black - gray - white
    --black_000000: #000000;
    --black_1A1A1A: #1A1A1A;
    --black_333333: #333333;
    --blcak_4D4D4D: #4D4D4D;
    --gray_666666: #666666;
    --gray_999999: #999999;
    --gray_CCCCCC: #CCCCCC;
    --gray_EEEEEE: #EEEEEE;
    --gray_FAFAFA: #FAFAFA;
    --white_FFFFFF: #FFFFFF;

    // blue
    --blue_5534DA: #5534DA;
    // 이름에 %를 사용할 수 없음
    /* --blue_10%: #EDF5FD; */
  }

  * {
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }
`;

//
// Global Styled Containers
//

export const ButtonNormal = styled.button`
  color: #000;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonEmphasis = styled.button`
  color: #fff;
  border-radius: 8px;
  border: none;
  background: #258dff;

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonIcon = styled.button`
  width: 20px;
  height: 20px;

  border: none;
  background-color: transparent;

  transition: 0.2s;

  &:hover {
    cursor: pointer;
    scale: 1.3;
  }
`;

export const InputNormal = styled.input`
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  white-space: nowrap;
`;

//
// Animations
//

export const scaleAnim = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;
