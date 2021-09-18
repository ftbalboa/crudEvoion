import { createContext, useState } from "react";
import {  ThemeProvider } from "styled-components";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Header/Nav";
import { GlobalStyle, theme } from "../styles";

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
