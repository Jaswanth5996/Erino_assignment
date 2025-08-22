import { useState } from "react";

const Login = () =>{
    const [show,setShow] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-gray-100 justify-center space-y-5 items-center font-serif">
            <form action="" className="flex flex-col bg-white space-y-5 border-gray-500 px-[80px] shadow-2xl py-[50px] rounded-xl">
                <div className="text-3xl font-bold mb-[30px] text-center">Register </div>
                <input type="text" placeholder="enter mail/username" className="bg-gray-100 p-4 border border-gray-300 rounded"/>
                <input type={show?"text":"password"} placeholder="enter password" className="bg-gray-100 p-4 border border-gray-300 rounded"/>
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