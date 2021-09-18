import styled from "styled-components";

export const LoginContainer = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    color: ${(props) => props.theme.colors.primary};
    margin: 0 0 20px 0;
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
    min-height: 1.5rem;
    color: red;
    font-size: 0.8rem;
  }
`;