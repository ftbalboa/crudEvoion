import { createContext, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Footer from "../components/Footer";
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
  margin-top:0;
  font-family:Verdana;
  padding-bottom: 2.5rem;
  position:relative;
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
          <Footer />
        </userContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
