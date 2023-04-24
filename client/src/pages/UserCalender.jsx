import React, { useState } from 'react'
import axios from 'axios';
function UserCalender() {
  const [content, setContent] = useState("");
  const onCalendarClick = async (event) => {
    event.preventDefault();
    try{
        const response = await axios.get('http://localhost:3131/user/calender/');
        console.log(response.data)
        setContent(response);
    }catch(err){
        console.log(err);
    }
  }
  return (
    <div className='bg-stone-900 h-full'>
        <p className='text-5xl text-blue-500 flex justify-center items-center'>Calender</p>
        <div className='flex flex-col justify-center items-center m-5'>
            <div className='flex flex-col justify-center items-center'>
                <button onClick={onCalendarClick} className='text-2xl p-2 rounded-md border-[1px] border-blue-500 hover:bg-transparent hover:border-blue-500 hover:text-blue-500 bg-blue-500 text-white flex justify-center items-center'>Add Event</button>
                <p className='text-white text-lg'>{content}</p>
            </div>
        </div>
    </div>
  )
}

export default UserCalender