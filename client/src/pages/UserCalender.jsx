import React, { useState } from 'react'
import axios from 'axios';

function UserCalender() {
  const [eventDetails, setEventDetails] = useState({
    Summary: "",
    Description:"",
    StartDate: "",
    EndDate: "",
  });

    const handleChange = (event) => {
      const { name, value } = event.target;
      console.log(name, ": ", value);
      setEventDetails({...eventDetails, [name]: value});
    };
  

  const onCalendarClick = async (event) => {
    event.preventDefault();
    try{
        const response = await axios.post("http://localhost:3131/user/schedule_events", eventDetails);
        alert(response.data.msg);
    }catch(err){
        console.log(err);
    }
  }
  return (
    <div className='bg-stone-900 h-full'>
        <p className='text-5xl text-blue-500 flex justify-center items-center'>Calender</p>
        <div className='flex flex-col justify-center items-center m-5'>
            <div className='flex flex-col justify-center items-center'>
                <form onSubmit={onCalendarClick} className='flex flex-col gap-y-2'>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-white text-lg'>Summary:</p>
                    <input name='Summary' onChange={handleChange} type='text' placeholder='Event Summary' className='bg-transparent placeholder:text-white placeholder:text-opacity-30 border-[1px] border-white border-opacity-30 rounded-md p-2'/>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-white text-lg'>Description:</p>
                    <input name='Description' onChange={handleChange} type='text' placeholder='Event Description' className='bg-transparent placeholder:text-white placeholder:text-opacity-30 border-[1px] border-white border-opacity-30 rounded-md p-2'/>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-white text-lg'>Start Date-Time:</p>
                    <input name='StartDate' onChange={handleChange} type='datetime-local' placeholder='Event Starts On' className='bg-transparent placeholder:text-white placeholder:text-opacity-30 border-[1px] border-white border-opacity-30 rounded-md p-2'/>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-white text-lg'>End Date-Time:</p>
                    <input name="EndDate" onChange={handleChange} type='datetime-local' placeholder='Event Ends On' className='bg-transparent placeholder:text-white placeholder:text-opacity-30 border-[1px] border-white border-opacity-30 rounded-md p-2'/>
                  </div>
                  <input type='submit' className='text-2xl p-2 rounded-md border-[1px] border-blue-500 hover:bg-transparent hover:border-blue-500 hover:text-blue-500 bg-blue-500 text-white flex justify-center items-center' value="Add Event"/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UserCalender