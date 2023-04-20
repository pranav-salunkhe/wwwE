import React from 'react'

function Auth() {
  return (
    <div className='bg-stone-900 flex flex-col justify-center items-center h-screen'>
      <p className="text-white text-5xl flex justify-center p-10">
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
          <div className="flex flex-col justify-center items-center px-10 py-8 w-full border-2 rounded-md border-collapse border-white">
            <form className="flex flex-col justify-center items-center gap-10 w-full">
              <input className='h-10 w-[70%] rounded-md placeholder:text-center placeholder:text-xl placeholder:text-white text-black text-center bg-transparent border-[1px]' type="text" placeholder="Username" />
              <input className='h-10 w-[70%] rounded-md placeholder:text-center placeholder:text-xl placeholder:text-white text-black text-center bg-transparent border-[1px]' type="password" placeholder="Password" />
              <div className='flex flex-row justify-center items-center gap-6'>
                <input className='border-2 rounded-lg border-white px-5 py-2 hover:bg-gray-400 hover:text-black hover:border-gray-400 transition-all delay-150' type="submit" value="Login"/>
                <input className='border-2 rounded-lg border-white px-5 py-2 hover:bg-gray-400 hover:text-black hover:border-gray-400 transition-all delay-150' type="submit" value="Register"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;