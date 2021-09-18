import styled from "styled-components";

export const FooterContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  height: 50px;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  width: 95%;
  margin-left: 2.5%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;