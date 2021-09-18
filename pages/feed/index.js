import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { EditPost } from "../../components/EditPost";
import { Post } from "../../components/Post";
import { userContext } from "../_app";

export default function Feed (){
    const {user, setUser} = useContext(userContext);
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if(!user) router.push('/', undefined, { shallow: true })
        else{
            if(refresh){
                setRefresh(false);
                fetch(`/api/posts?email=${user.email}`).then((res) =>
                    res.json().then((resJson) => {
                      setPosts(resJson);
                    })
                  ).catch((e)=>{console.log(e)});
            }
        }
    }, [user, refresh])
    return (
        <div>
        <span>{`Bienvenido ${user.firstName} ${user.lastName}`}</span>
        <button onClick={()=> setUser(false)}>Logout</button>
        {posts.map((p, i) => <Post info={{...p,refresh:setRefresh}} key={i}/>)}
        </div>
    )
}