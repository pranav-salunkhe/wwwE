import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const onSubmit = async (event) =>{
        event.preventDefault();
            try{
              await axios.post("http://localhost:3131/auth/register", {
                  username,
                  password,
              });
              alert("Registration Successful");
              navigate("/");
          }catch(err){
              console.error(err);
              alert("User already exits");
          }
        
    };
  return (
    <div className='bg-stone-900 flex flex-col justify-center items-center h-screen'>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-700 text-5xl flex justify-center p-10">
        Clubs and Events Management System
      </p>
      <div className="flex justify-center items-center h-100 w-1/2 m-10 text-white">
        <div className="flex flex-col justify-center items-center w-full gap-y-4">
          {/* form box */}
          {/* <div className="flex flex-row justify-center items-center  text-4xl w-full">
            <div className='flex justify-center items-center border-[1px] rounded-l-md hover:bg-gray-400 gap-4 w-36 h-full p-2'>
                <input id='login' type="radio" name="access" className="bg-gray-800 h-6 w-6 peer/login" checked/>
                <label for="login" type="button" className='h-full w-full flex bg-transparent'>Login</label>
            </div>  
            <div className='flex justify-center items-center border-[1px] rounded-r-md border-l-[0px] hover:bg-gray-400 gap-4 w-40 h-full p-2'>
                <input id='register' type="radio" name="access" className="h-6 w-6 peer/register"/>
                <label for="register" type="button" className='h-full w-full flex bg-transparent'>Register</label>
            </div>
          </div> */}
          <div className="flex flex-col justify-center items-center px-10 py-8 h-full w-full border-[1px] rounded-md border-collapse border-white">
            <form onSubmit={onSubmit} className=" h-full flex flex-col justify-center items-center gap-10 w-full">
              <input value={username} onChange={(event) => setUsername(event.target.value)} className='h-10 w-[70%] rounded-md placeholder:text-center placeholder:text-xl placeholder:text-white placeholder:text-opacity-30 text-white text-center bg-transparent border-[1px]' type="text" placeholder="username" />
              <div className='flex flex-col justify-center w-full items-center'>
                <input value={password} onChange={(event) => setPassword(event.target.value)} className='h-10 w-[70%] rounded-md placeholder:text-center placeholder:text-xl placeholder:text-white placeholder:text-opacity-30 text-white text-center bg-transparent border-[1px]' type="password" placeholder="Password" />
              </div>
              <div className='hidden'><p>MSG:</p></div>
              <div className='flex flex-row justify-center items-center gap-6'>
                <input className='border-2 rounded-lg border-white w-full px-5 py-2 hover:bg-gray-400 hover:text-black hover:border-gray-400 transition-all delay-150' type="submit" value="Register"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;