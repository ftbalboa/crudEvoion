import { useContext } from "react";

export default function Feed (){
    const {user, setUser} = useContext(userContext);
    return (
        <h1>Hi from Feed</h1>
    )
}