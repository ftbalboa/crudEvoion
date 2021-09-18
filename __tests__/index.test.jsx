import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav";
import MyApp from "../pages/_app";
import { createContext, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Post } from "../components/Post";

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
    &:focus {
      outline: none !important;
      box-shadow: 0 0 10px plum;
    }
  }
  
  `;

describe("Nav", () => {
  it("renders Nav and Nav render title", () => {
    const nav = render(
      <div>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Nav />
        </ThemeProvider>
      </div>
    );

    const testTitle = "CRUD";
    expect(nav.container).toHaveTextContent(testTitle);
  });
});

describe("Post", () => {
    it("renders Post, and Post renders Title, Content and Order passed by info", () => {
    const testTitle = "dummyTitle";
    const testContent = "dummyContent";
    const testOrder = 10;
      const info = {
          id:5,
          title: testTitle,
          content: testContent,
          order: testOrder,
          pinned:false,
          color:"blue",
          updatedAt: "12/10/2021 data",
          createdAt: "12/10/2021 data",
      }
      const post = render(
        <div>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Post info={info}/>
          </ThemeProvider>
        </div>
      );

      expect(post.container).toHaveTextContent(testTitle);
      expect(post.container).toHaveTextContent(testContent);
      expect(post.container).toHaveTextContent(testOrder);
    });
  });