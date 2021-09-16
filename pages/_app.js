import { createGlobalStyle, ThemeProvider } from "styled-components";
import Nav from "../components/Nav";

const GlobalStyle = createGlobalStyle`
html{
  background: #F5F4F0;
  display:block;
  height: 100%;
  max-width: 640px;
  margin:0 auto;
  padding: 0;
}

body{
  background-color:#fafafa;
  min-height:100vh;
  padding: 1rem;
  margin-top:0;
  font-family:Verdana;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`;

const theme = {
  colors: {
    primary: "plum",
    textSecondary:"#fafafa",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
      <Nav />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
