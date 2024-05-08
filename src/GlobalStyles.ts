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
    --gray_D9D9D9: #D9D9D9;
    --gray_EEEEEE: #EEEEEE;
    --gray_FAFAFA: #FAFAFA;
    --white_FFFFFF: #FFFFFF;

    // blue
    --blue_5534DA: #5534DA;
    // 이름에 %를 사용할 수 없음, 수정해야할듯
    /* --blue_10%: #EDF5FD; */

    --primary_basic_color: #013050; // 가장 진한 색
    --primary_light_color: #03395d; // 중간 색
    --primary_text_color: #021A2D; // 텍스트 색 PQ색과 동일

    --background_basic_gray: #404040;
    --background_light_gray: #707070;
    --background_dark_gray: #202020;

    --text_gray: #d9d9d9;
    --landing_background_color: #ecf3fc; // 랜딩페이지 배경색( 하늘색 ) // hover시 fafafa
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
  background-size: cover;
  background-position: center;

  transition: 0.2s;

  &:hover {
    cursor: pointer;
    scale: 1.1;
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

export const scaleBounceAnim = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const opacityBounceAnim = keyframes`
  0% { opacity: 1; }
  10% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1; }
`;

export const appearAnim = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;
