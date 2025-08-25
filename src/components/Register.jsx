import { useState } from "react";
import image from '../images/bg3.jpeg'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () =>{
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    const [show,setShow] = useState(false)

    const handleSubmit =async (e) => {
        e.preventDefault()

        if(password!==confirm) {
            alert("Passwords do not match!")
            return 
        }
        try{
            const response  = await axios.post('https://erino-assignment-yuf9.onrender.com/users/register',{email,password},{ headers:{"Content-Type": "application/json"},withCredentials:true})
            console.log("user created",response.data)
            window.location.reload();
            alert("Registration Successful!")
        }catch(err){
            alert("Something went wrong, Try again",err)
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 bg-cover bg-center justify-center space-y-5 items-center " style={{ backgroundImage: `url(${image})` }}>
            <form action="" onSubmit={handleSubmit} className="flex flex-col bg-white space-y-5 border-gray-500 lg:w-[500px] px-[80px] shadow-2xl py-[50px] rounded-xl">
                <div className="text-3xl font-bold mb-[30px] text-purple-600 text-center">Create an Account </div>
                <input type="email" placeholder="enter email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-100 p-3 border border-gray-300 rounded"/>
                <input type={show?"text":"password"} minLength={8} required onChange={(e)=>setPassword(e.target.value)} value ={password} placeholder="enter password" className="bg-gray-100 p-3 border border-gray-300 rounded"/>
                <input type={show?"text":"password"} minLength={8} required onChange={(e)=>setConfirm(e.target.value)} value={confirm} placeholder="confirm password" className="bg-gray-100 p-3 border border-gray-300 rounded"/>
                <div className="flex text-sm items-center space-x-2">
                <input type="checkbox" name="show" onClick={()=>setShow(!show)} id="" />
                <section>show password</section>
                </div>
                <button type="submit" className="rounded text-white p-2 mt-2 bg-purple-600">register</button>
            </form>
        </div>
    )
}

export default Register;