import { PinAngleFill } from "@styled-icons/bootstrap";
import { Delete } from "@styled-icons/material-rounded/Delete";
import { Edit } from "@styled-icons/evaicons-solid";
import {
  IconContainer,
  IconCorner,
  PostContainer,
  PostContainerBot,
} from "../../styles/components/Post/Post";

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

const renderIconContainer = (info) => (
  <IconContainer color={info.color}>
    <button
      className="iconButton"
      onClick={() => {
        info.delete(info.id);
      }}
    >
      {" "}
      <Delete />{" "}
    </button>
    <button
      className="iconButton"
      onClick={() => {
        info.edit(info.index);
      }}
    >
      {" "}
      <Edit />{" "}
    </button>
  </IconContainer>
);

const renderIconCorner = (info) =>
  info.pinned && (
    <IconCorner>
      <PinAngleFill />
    </IconCorner>
  );

export function Post({ info }) {
  return (
    <PostContainer color={info.color}>
      {renderIconCorner(info)}
      <h2>{info.title}</h2>
      <p>{info.content}</p>
      <img alt={info.title} src={info.img} />
      {renderIconContainer(info)}
      <PostContainerBot>
        <span>{`Orden: ${info.order}`}</span>
        <span>{`${info.createdAt.substring(0, 10)}`}</span>
      </PostContainerBot>
    </PostContainer>
  );
}
