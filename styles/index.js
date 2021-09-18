//Tema y Estilos globales
import { createGlobalStyle} from "styled-components";

export const theme = {
  colors: {
    primary: "plum",
    textSecondary: "#fafafa",
  },
};

export const GlobalStyle = createGlobalStyle`
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
  
  h1 {
  letter-spacing: 1rem;
  padding-left: 1rem;
}

  * {
    box-sizing: border-box;
    &:focus {
      outline: none !important;
      box-shadow: 0 0 10px plum;
    }
  }
  
  `;
