import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Protect = ({children}) =>{
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const {loggedIn} = useAuth()
    useEffect(() => {
    if (loggedIn === null) setLoading(true);
    else if (!loggedIn) navigate("/");
     else setLoading(false);
},[loggedIn,navigate])
    if (loading) return <div className="flex justify-center items-center text-5xl">Loading...</div>;
    return children
}

export default Protect