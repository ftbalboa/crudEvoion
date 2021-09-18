import { PinyinInput } from "@styled-icons/remix-editor";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "../pages/_app";

const Container = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    color: ${(props) => props.theme.colors.primary};
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
    min-height: 1.5rem;
    color: red;
    font-size: 0.8rem;
  }
`;

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useContext(userContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    password: null,
    email: null,
    credenciales: null,
  });

  useEffect(() => {
    user && router.push("/feed", undefined, { shallow: true });
  }, [user]);

  const handleInput = (event) => {
    let newInput = { ...input };
    newInput[event.target.name] = event.target.value;
    setInput({ ...newInput });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const submit = (e) => {
    e.preventDefault();
    if (validateEmail(input.email)) {
      setErrors({...errors, email:null})
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ ...input }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((resJson) => {
            if(resJson.firstName){
            setUser(resJson);}
            else{setErrors({ ...errors,email:null, credenciales: "Credenciales incorrectas" });}
          })
        )
        .catch((e) => {
          console.log(e);
          setErrors({ ...errors, email:null,credenciales: "Credenciales incorrectas" });
        });
    } else {
      setErrors({ ...errors, credenciales:null, email: "Formato email incorrecto" });
    }
  };

  return (
    <Container>
            <span>{errors.credenciales && errors.credenciales}</span>
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
        <span>{errors.email && errors.email}</span>
        <label>Password</label>
        <input
          type="password"
          maxLength="10"
          name="password"
          onChange={handleInput}
          value={input.password}
        />
        <button onClick={submit}> SUBMIT </button>
      </form>
    </Container>
  );
}
