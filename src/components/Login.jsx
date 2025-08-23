import { useState } from "react";
import image from '../images/bg3.png'

const Login = () =>{
    const [show,setShow] = useState(false)

    return (
        <div className="flex flex-col h-screen  bg-gray-100 bg-cover bg-center justify-center space-y-5 items-center "  style={{ backgroundImage: `url(${image})` }}>
            <form action="" className="flex flex-col bg-white space-y-5 border-gray-500 lg:w-[500px] px-[80px] shadow-2xl py-[50px] rounded-xl">
                <div className="text-3xl font-bold mb-[30px] text-purple-600 text-center">Login </div>
                <input type="email" placeholder="enter email" className="bg-gray-100 p-3 border border-gray-300 rounded"/>
                <input type={show?"text":"password"} placeholder="enter password" className="bg-gray-100 p-3 border border-gray-300 rounded"/>
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