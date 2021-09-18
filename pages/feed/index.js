import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { EditPost } from "../../components/EditPost";
import { Post } from "../../components/Post";
import { userContext } from "../_app";
import styled from "styled-components";

const Container = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  width: 100%;
  display: flex;
  flex-direction: column;
  aling-items: center;
  padding: 10px 5% 20px 5%;
  h2 {
    display: flex;
    aling-items: center;
    justify-content: center;
    color: inherit;
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
    font-size: 0.8rem;
  }
  hr {
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const ContainerTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function Feed() {
  const { user, setUser } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [newPost, setNewPost] = useState(-2);
  const router = useRouter();

  const sortPosts = (forSort) => {
    forSort.sort((x, y) => parseFloat(x.order) - parseFloat(y.order));
    forSort.sort((x, y) => {
      return x.pinned === y.pinned ? 0 : x.pinned ? -1 : 1;
    });
    return forSort;
  };

  useEffect(() => {
    if (!user) router.push("/", undefined, { shallow: true });
    else {
      if (refresh) {
        setRefresh(false);
        fetch("/api/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((res) =>
            res.json().then((resJson) => {
              setPosts(sortPosts([...resJson]));
              setNewPost(-2);
            })
          )
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [user, refresh]);

  const deletePost = (id) => {
    fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => setRefresh(true))
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <Container>
      <ContainerTop>
        <span>{`Bienvenido ${user.firstName} ${user.lastName}`}</span>

        <button
          style={{ visibility: newPost === -1 ? "hidden" : "visible" }}
          onClick={() => setNewPost(-1)}
        >
          Nuevo Post
        </button>

        <button onClick={() => setUser(false)}>Logout</button>
      </ContainerTop>
      <hr />
      <h2>{posts.length > 0 ? "Feed" : "No hay posts"}</h2>
      {newPost === -1 && <EditPost info={{ refresh: setRefresh }} />}
      {posts.map((p, i) =>
        i === newPost ? (
          <EditPost
            info={{
              ...p,
              refresh: setRefresh,
              delete: deletePost,
              index: i,
              edit: setNewPost,
            }}
            key={i}
          />
        ) : (
          <Post
            info={{
              ...p,
              refresh: setRefresh,
              delete: deletePost,
              index: i,
              edit: setNewPost,
            }}
            key={i}
          />
        )
      )}
    </Container>
  );
}
