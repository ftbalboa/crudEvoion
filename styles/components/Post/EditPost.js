import styled from "styled-components";

export const EditContainer = styled.div.attrs((props) => ({
    color: props.color || props.theme.colors.primary,
  }))`
  background-color: transparent;
  color: ${(props) => props.color};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.color};
  border-radius: 20px;
  padding: 10px;
  h2 {
    color: ${(props) => props.color};
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .inputEdit {
    margin-bottom: 10px;
    border: 2px solid ${(props) => props.color};
    border-radius: 50px;
    height: 1.5rem;
    padding: 0 1rem 0 1rem;
    width:100%;
    text-align:center;
  }
  .buttonEdit {
    border: 2px solid ${(props) => props.color};
    border-radius: 50px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.theme.colors.textSecondary};
    cursor: pointer;
    width: 80px;
    height: 1.5rem;
    margin: 5px;
    &:hover {
      color: ${(props) => props.theme.colors.textSecondary};
      background-color: ${(props) => props.color};
    }
  }
  textarea{
    height: 100px;
    border-radius: 10px;
    border: 2px solid ${(props) => props.color};
    padding: .5rem;
    margin-bottom:15px;
  }
  label{
    margin-bottom:5px;
  }
`;

export const ContainerRow = styled.div.attrs((props) => ({
  color: props.color || props.theme.colors.primary,
}))`
  padding: 0 10px 0 10px;
`;