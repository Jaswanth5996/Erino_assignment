import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import image from '../images/bg3.jpeg'

const Login = () =>{
    const navigate=useNavigate()
    const { loggedIn,setLoggedIn, setUser } = useAuth();
    const [show,setShow] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(() => {
    if (loggedIn) {
      navigate('/leads')
    }
  }, [loggedIn]);

    const handleSubmit =async (e) => {
            e.preventDefault()
            try{
                const response  = await axios.post('https://erino-assignment-yuf9.onrender.com/users/login',{email,password},{ headers:{"Content-Type": "application/json"},withCredentials:true})
                console.log("login successful",response.data)
                setLoggedIn(true);
                setUser(response.data.user); 
                alert("Login Successful!")
                navigate('/leads')
            }catch(err){
                alert("Something went wrong, Try again")
            }
    }

    return (
        <div className="flex flex-col h-screen  bg-gray-100 bg-cover bg-center justify-center space-y-5 items-center "  style={{ backgroundImage: `url(${image})` }}>
            <form action=""  onSubmit={handleSubmit} className="flex flex-col bg-white space-y-5 border-gray-500 lg:w-[500px] px-[80px] shadow-2xl py-[50px] rounded-xl">
                <div className="text-3xl font-bold mb-[30px] text-purple-600 text-center">Login </div>
                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter email" className="bg-gray-100 p-3 border border-gray-300 rounded"/>
                <input type={show?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="enter password" className="bg-gray-100 p-3 border border-gray-300 rounded"/>
                <div className="flex text-sm items-center space-x-2">
                <input type="checkbox" name="show" onClick={()=>setShow(!show)} id="" />
                <section>show password</section>
                </div>
                <button type="submit" className="rounded text-white p-2 mt-2 bg-purple-500">submit</button>
            </form>
        </div>
    )
}

export default Login;