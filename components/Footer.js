import styled from "styled-components";

const Container = styled.div`
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
  h1 {
    letter-spacing: 1rem;
    padding-left: 1rem;
  }
`;

export default function Footer() {
  return (
    <Container>
      <h1> * * * * * * </h1>
    </Container>
  );
}
