import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { EditPost } from "../../components/Post/EditPost";
import { Post } from "../../components/Post/Post";
import { FeedContainer, FeedContainerTop } from "../../styles/pages/feed/feed";
import { userContext } from "../_app";

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

  //Renders

  const renderContainerTop = () => (
    <FeedContainerTop>
      <span>{`Bienvenido ${user.firstName} ${user.lastName}`}</span>

      <button
        style={{ visibility: newPost === -1 ? "hidden" : "visible" }}
        onClick={() => setNewPost(-1)}
      >
        Nuevo Post
      </button>

      <button onClick={() => setUser(false)}>Logout</button>
    </FeedContainerTop>
  );

  const renderMapPosts = () =>
    posts.map((p, i) =>
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
    );

  return (
    <FeedContainer>
      {renderContainerTop()}
      <hr />
      <h2>{posts.length > 0 ? "Feed" : "No hay posts"}</h2>
      {newPost === -1 && <EditPost info={{ refresh: setRefresh }} />}
      {renderMapPosts()}
    </FeedContainer>
  );
}
