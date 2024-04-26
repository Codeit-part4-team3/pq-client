import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    
    width: 100%;
    min-height: 100vh;

    background-color: #fff0f0;
  }

  #root {
    width: 100%;
    min-height: 100vh;
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
