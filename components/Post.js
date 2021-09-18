import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "../pages/_app";
import { PinAngleFill } from "@styled-icons/bootstrap";
import { Delete } from "@styled-icons/material-rounded/Delete";
import { Edit } from "@styled-icons/evaicons-solid";

/*
    - Titulo *
    - Contenido *
    - Fecha  *
    - Imagen *
    - Importante [Check box]
    - Color [selector] *
    - Numero de orden *

    -Icon EDIT
    -Icon DELETE
*/

const Container = styled.div.attrs((props) => ({
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
  margin: 10px 0 10PX 0;
  h2 {
    color: ${(props) => props.color};
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
  img {
    border-radius: 100%;
    height: 100px;
    width: 100px;
  }
  i{
    width: 40px;
    height: 40px;
  }
`;

export function Post({ info }) {
  return (
    <Container color={info.color}>
      <span>{info.order}</span>
      <h2>{info.title}</h2>
      <p>{info.content}</p>
      <img alt={info.title} src={info.img} />
      <span>{`Ultima edicion: ${info.createdAt.substring(0, 10)}`}</span>
      <button onClick={()=>{info.delete(info.id)}}> <Delete /> </button>
      <button onClick={()=>{info.edit(info.index)}}> <Edit /> </button>
      {info.pinned && (<i><PinAngleFill /></i>)}
    </Container>
  );
}
