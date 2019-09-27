import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Be+Vietnam:300,400,500,600,700,900&display=swap');
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Be Vietnam', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.text.default.regular}

  }
  a {
  text-decoration: none;
  color: inherit;
}

button {
  margin: 0;
  padding: 0;
  color: inherit;
}
`;

export default GlobalStyles;
