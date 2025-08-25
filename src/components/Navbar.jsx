import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import {useAuth} from '../AuthContext'

const Nav = () => {
    
    const { loggedIn,setLoggedIn, setUser } = useAuth();
    useEffect(() => {
    const checkLogin = async () => {
      try {const res = await axios.get("http://localhost:5000/users/me", {withCredentials: true,});
        if (res.data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        setLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {await axios.post("http://localhost:5000/users/logout",{},{ withCredentials: true });
      setLoggedIn(false);
    }catch (err) {
      console.error("Logout failed", err);
    }
  };
    
    return (
        <div className="flex text-purple-500 items-center bg-white top-0 sticky z-50 justify-around p-5 ">
        <div className="text-3xl font-bold">
            Lead Management
        </div>
        <div className="flex justify-end lg:space-x-[100px] space-x-[25px] font-bold text-xl">
            {loggedIn ?(
            <>
            <Link to="/leads" className="hover:underline hover:[text-underline-offset:12px] hover:decoration-purple-600">Leads</Link>
            <Link to="/create" className="hover:underline hover:[text-underline-offset:12px] hover:decoration-purple-600">Create Lead</Link>
            <button onClick={handleLogout} className="hover:underline hover:[text-underline-offset:12px] hover:decoration-purple-600">Logout</button>
            </>
            ):(
            <>
            <Link to="/" className="hover:underline hover:[text-underline-offset:12px] hover:decoration-purple-600">Login</Link>
            <Link to="/register" className="hover:underline hover:[text-underline-offset:12px] hover:decoration-purple-600">Register</Link>
            </>
            )
            }
        </div>
        </div>
    )
}


export default Nav;