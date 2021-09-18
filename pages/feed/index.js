import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { EditPost } from "../../components/EditPost";
import { Post } from "../../components/Post";
import { userContext } from "../_app";

export default function Feed() {
  const { user, setUser } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [newPost, setNewPost] = useState(-2);
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/", undefined, { shallow: true });
    else {
      if (refresh) {
        setRefresh(false);
        fetch("/api/posts" , {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`
          },
        })
          .then((res) =>
            res.json().then((resJson) => {
              setPosts(resJson);
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
        'Authorization': `Bearer ${user.token}`
      },
    })
      .then((res) => setRefresh(true))
      .catch((e) => {
        console.log(e);
      });
  };

  const editPost = (i) => {
    setNewPost(i);
  };

  return (
    <div>
      <span>{`Bienvenido ${user.firstName} ${user.lastName}`}</span>
      <button onClick={() => setUser(false)}>Logout</button>
      {newPost !== -1 && (
        <button onClick={() => setNewPost(-1)}>Nuevo Post</button>
      )}
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
    </div>
  );
}
