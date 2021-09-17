import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { userContext } from "../_app";

export default function Feed (){
    const {user, setUser} = useContext(userContext);
    const router = useRouter();
    useEffect(() => {
        !user && router.push('/', undefined, { shallow: true });
    }, [user])
    return (
        <div>
        <h1>Hi from Feed</h1>
        <button onClick={()=> setUser(false)}>Logout</button>
        </div>
    )
}