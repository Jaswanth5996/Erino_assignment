import { Link } from "react-router-dom";
import { useState } from "react";


const Nav = () => {
    
    const [loggedIn,setLoggedIn] = useState(false)
    
    return (
        <div className="flex text-purple-500 items-center bg-white top-0 sticky z-50 justify-around p-5 ">
        <div className="text-3xl font-bold">
            Lead Management
        </div>
        <div className="flex justify-end lg:space-x-[100px] space-x-[25px] font-bold text-xl">
            {loggedIn ?(
            <>
            <Link to="/">Profile</Link>
            <Link to="/">Logout</Link>
            </>
            ):(
            <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
            </>
            )
            }
        </div>
        </div>
    )
}


export default Nav;