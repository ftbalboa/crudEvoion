import styled from "styled-components";

const Container = styled.nav`
background-color: ${(props) => props.theme.colors.primary};
height: 50px;
color: ${(props) => props.theme.colors.textSecondary};
width: 100%;
display: flex;
justify-content: center;
align-items: center;
h1 {
  letter-spacing: 1rem;
  padding-left: 1rem;
}
`;

export default function Nav() {

  return (
    <Container>
      <h1> CRUD </h1>
    </Container>
  );
}
