import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "../pages/_app";

const Container = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    color: ${(props) => props.theme.colors.primary};
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
`;

export default function Login() {
  const router = useRouter();
  const {user, setUser} = useContext(userContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const mensajes = {
    wrong: "Credenciales incorrectas",
    email: "Debe ingresar un email válido",
  };

  useEffect(() => {
    user && router.push('/feed', undefined, { shallow: true })
  }, [user])

  const handleInput = (event) => {
    let newInput = { ...input };
    newInput[event.target.name] = event.target.value;
    setInput({ ...newInput });
  };

  const submit = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ ...input }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((resJson) => {
        console.log(resJson);
        setUser(resJson);
      })
    ).catch((e)=>{console.log(e)});
  };

  return (
    <Container>
      <h2>Log in</h2>
      <form>
        <label>Email</label>
        <input
          type="email"
          maxLength="30"
          name="email"
          onChange={handleInput}
          value={input.email}
        />
        <label>Password</label>
        <input
          type="password"
          maxLength="10"
          name="password"
          onChange={handleInput}
          value={input.password}
        />
      </form>
      <button onClick={submit}> SUBMIT </button>
    </Container>
  );
}
