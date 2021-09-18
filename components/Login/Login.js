import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../pages/_app";
import { LoginContainer } from "../../styles/components/Login/Login";

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
    // realiza peticiones o muestra los errores
    e.preventDefault();
    if (validateEmail(input.email)) {
      setErrors({ ...errors, email: null });
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ ...input }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((resJson) => {
            if (resJson.firstName) {
              setUser(resJson);
            } else {
              setErrors({
                ...errors,
                email: null,
                credenciales: "Credenciales incorrectas",
              });
            }
          })
        )
        .catch((e) => {
          console.log(e);
          setErrors({
            ...errors,
            email: null,
            credenciales: "Credenciales incorrectas",
          });
        });
    } else {
      setErrors({
        ...errors,
        credenciales: null,
        email: "Formato email incorrecto",
      });
    }
  };

  return (
    <LoginContainer>
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
        <span>{errors.credenciales && errors.credenciales}</span>
        <button onClick={submit}> SUBMIT </button>
      </form>
    </LoginContainer>
  );
}
