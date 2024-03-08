// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #F5F5DC;
    color: #B22222;
    font-family: Open-Sans, Helvetica, Sans-Serif;
      height: inherit;
      width: inherit;
  }
  html {
      position: absolute;
      height: 100%;
      width: 100%;
  }
  #root {
      width: inherit;
      height: inherit;
  }
  div {
      width: inherit;
      height: inherit;
  }
  svg {
      width: inherit;
      height: inherit;
  }
  g {
      width: inherit;
      height: inherit;
  }
`;

export default GlobalStyle;