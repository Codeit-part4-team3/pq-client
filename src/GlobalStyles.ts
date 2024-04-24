import { createGlobalStyle, keyframes } from 'styled-components';

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
  }
`;

export const scaleAnim = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;
