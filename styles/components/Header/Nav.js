import styled from "styled-components";

export const NavContainer = styled.nav`
background-color: ${(props) => props.theme.colors.primary};
height: 50px;
color: ${(props) => props.theme.colors.textSecondary};
width: 95%;
margin-left:2.5%;
display: flex;
justify-content: center;
align-items: center;
`;