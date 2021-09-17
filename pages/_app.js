import { createContext, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Nav from "../components/Nav";

const theme = {
  colors: {
    primary: "plum",
    textSecondary: "#fafafa",
  },
};

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

export const userContext = createContext({
  user: false,
  setUser: (u) => {}
});

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(false);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <userContext.Provider value={{user, setUser}}>
          <Nav />
          <Component {...pageProps} />
        </userContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
