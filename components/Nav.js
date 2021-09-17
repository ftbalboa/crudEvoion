import styled from "styled-components";

export default function Nav() {
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
  return (
    <Container>
      <h1> CRUD </h1>
    </Container>
  );
}
