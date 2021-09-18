import styled from "styled-components";

export const FeedContainer = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  width: 100%;
  display: flex;
  flex-direction: column;
  aling-items: center;
  padding: 10px 5% 20px 5%;
  h2 {
    display: flex;
    aling-items: center;
    justify-content: center;
    color: inherit;
    margin: 0 0 10px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input {
    margin: 5px;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 50px;
    height: 1.5rem;
    padding: 0 1rem 0 1rem;
  }
  button {
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 50px;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.textSecondary};
    cursor: pointer;
    width: 80px;
    height: 1.5rem;
    margin: 5px;
    &:hover {
      color: ${(props) => props.theme.colors.textSecondary};
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
  span {
    font-size: 0.8rem;
  }
  hr {
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export const FeedContainerTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;