import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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

export default GlobalStyles;
