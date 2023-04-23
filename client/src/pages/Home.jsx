import React, { useState } from 'react'
import { Link } from 'react-router-dom';


// landing page i.e. screen which is displayed to unregistered/logged out users
function Home() {

  return (
    <div className='bg-stone-900 flex flex-col justify-center items-center h-screen'>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-700 text-5xl flex justify-center p-10">
        Clubs and Events Management System
      </p>
      <div className="flex justify-center items-center h-100 w-1/2 m-10 text-white">
              <div className='flex flex-row justify-center items-center gap-6'>
                <Link to='/auth/register' className='border-2 rounded-lg border-white w-full px-5 py-2 hover:bg-gray-400 hover:text-black hover:border-gray-400 transition-all delay-150'>Register</Link>
                <Link to='/auth/login' className='border-2 rounded-lg border-white w-full px-5 py-2 hover:bg-gray-400 hover:text-black hover:border-gray-400 transition-all delay-150'>Login</Link>
              </div>
        </div>
    </div>
  );
}

export default Home;