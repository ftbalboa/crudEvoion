import styled from "styled-components";

export const PostContainer = styled.div.attrs((props) => ({
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
  overflow: hidden;
  margin: 10px 0 10px 0;
  padding: 10px;
  position: relative;
  h2 {
    color: ${(props) => props.color};
    padding: 0 120px 0 120px;
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

  img {
    border-radius: 100%;
    height: 100px;
    width: 100px;
    border: 1px solid ${(props) => props.color};
    margin-bottom: 10px;
  }
  i {
    width: 40px;
    height: 40px;
    color: ${(props) => props.color};
  }
  .iconButton {
    border: 2px solid ${(props) => props.color};
    border-radius: 50px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.theme.colors.textSecondary};
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin: 5px;
    &:hover {
      color: ${(props) => props.theme.colors.textSecondary};
      background-color: ${(props) => props.color};
    }
  }
`;

export const PostContainerBot = styled.div.attrs((props) => ({
  color: props.color || props.theme.colors.primary,
}))`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
`;

export const IconContainer = styled.div.attrs((props) => ({
  color: props.color || props.theme.colors.primary,
}))`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export const IconCorner = styled.i.attrs((props) => ({
  color: props.color || props.theme.colors.primary,
}))`
  position: absolute;
  top: 5px;
  right: 5px;
`;
