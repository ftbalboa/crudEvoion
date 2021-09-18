import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "../pages/_app";
/* Los posts tienen:
    - Titulo
    - Contenido
    - Fecha  
    - Imagen
    - Importante [Check box]
    - Color [selector]
    - Numero de orden
*/

const Container = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 20px;
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

export function EditPost({ info }) {
  const { user, setUser } = useContext(userContext);
  const [input, setInput] = useState({
    title: "",
    content: "",
    img: "",
    color: "blue",
    pinned: false,
    order: 0,
  });
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    let newInput = { ...input };
    switch(event.target.name){
        case "pinned":
            newInput[event.target.name] = !(input[event.target.name]);
            break;
        default:
            newInput[event.target.name] = event.target.value;
            break;
    }
    setInput({ ...newInput });
  };
  useEffect(() => {
    console.log(input);
  }, [input]);
  const onSubmit = (e) => {
    e.preventDefault();
    if(!info.id){
        fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ ...input, email: user.email }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) =>
            res.json().then((resJson) => {
              console.log(resJson);
            })
          ).catch((e)=>{console.log(e)});
    }
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <label>Titulo</label>
        <input
          type="text"
          name="title"
          onChange={handleInput}
          value={input.title}
        />
        <label>Contenido</label>
        <textarea
          type="text"
          name="content"
          onChange={handleInput}
          value={input.content}
        />
        <label>Imagen Url</label>
        <input
          type="url"
          name="img"
          onChange={handleInput}
          value={input.img}
        />
        <label>Color</label>
        <select name="color" onChange={handleInput} value={input.color}>
          <option value="blue">Blue</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <label>Importante</label>
        <input
          type="checkbox"
          name="pinned"
          onChange={handleInput}
          checked = {input.pinned}
        />
        <label>N de orden</label>
        <input
          type="number"
          name="order"
          onChange={handleInput}
          value={input.order}
        />
        <button type="submit">SAVE</button>
        <button>CANCEL</button>
      </form>
    </Container>
  );
}
