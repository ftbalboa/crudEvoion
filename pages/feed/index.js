import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { EditPost } from "../../components/EditPost";
import { userContext } from "../_app";

export default function Feed (){
    const {user, setUser} = useContext(userContext);
    const router = useRouter();
    useEffect(() => {
        !user && router.push('/', undefined, { shallow: true });
    }, [user])
    return (
        <div>
        <span>{`Bienvenido ${user.firstName} ${user.lastName}`}</span>
        <button onClick={()=> setUser(false)}>Logout</button>
        <EditPost info={{}}/>
        </div>
    )
}