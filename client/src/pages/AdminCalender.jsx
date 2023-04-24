import axios from 'axios';
import React from 'react';

function Calendar (){
    return(
        <div className='text-white'>
            HI
        </div>
    )
}


function AdminCalender() {
  
  const handleClick = async (event) => {
    
  }

  return (
    <div className='bg-stone-900 h-full'>
        <p className='text-5xl text-blue-500 flex justify-center items-center'>Calender</p>
        <div className='flex flex-col justify-center items-center m-5'>
            <div className='flex flex-col justify-center items-center'>
                <button onClick={handleClick} className='text-2xl p-2 rounded-md border-[1px] border-blue-500 hover:bg-transparent hover:border-blue-500 hover:text-blue-500 bg-blue-500 text-white flex justify-center items-center'>Add Event</button>
                <Calendar />
            </div>
        </div>
    </div>
    )
}

export default AdminCalender