import React, { useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
    // custom hook to get the userID
    const userID = useGetUserId();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        Title: "",
        Club: "",
        Date: "01 Jan 2000",
        Time: "",
        Venue: "",
        Description: "",
        imgUrl: "",
        Eligibility: "",
        userOwner: `${userID}`
    });

    // to handle the input for every field of the form
    const handleChange = (Event) => {
        const {name, value} = Event.target;
        setEvent({...event, [name]: value});
    }

    // send a post request on creating event via axios
    const onSubmit = async (Event) =>{
        Event.preventDefault();
        try{
            await axios.post("http://localhost:3131/user", event);
            alert("Event added");
            navigate("/admin");
        }catch (error){
            console.log(error);
        }
    }
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
        <div className='flex flex-col justify-center items-center h-full w-[50%] m-10 border-black border-[1px]'>
            <p className='text-4xl px-10 py-5 font-semibold border-b-[1px]'>Create an Event for you Club</p>
            <form onSubmit={onSubmit} className='flex flex-col justify-center text-2xl h-full w-full p-10'>
            <div className='flex flex-col w-full my-4'>
            Title:
            <input name='Title' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Title'/>
            </div>
            <div className='flex flex-col w-full my-4'>
            Club:
            <input name='Club' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Club'/>
            </div>
            <div className='flex flex-col w-full my-4'>
            Date:
            <input name='Date' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Date'/>
            </div>
            <div className='flex flex-col w-full my-4'>
            Time:
            <input name='Time' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Time'/>
            </div>
            <div className='flex flex-col w-full my-4'>
            Venue:
            <input name='Venue' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Venue'/>
            </div>
            <div className='flex flex-col w-full my-4'>
            Description:
            <textarea name='Description' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' placeholder='Description'></textarea>
            </div>
            <div className='flex flex-col w-full my-4'>
            Image URL:
            <input name='imgUrl' onChange={handleChange} className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Image URL'/>
            </div>
            <div className='flex flex-col w-full my-4'>
            Eligibility Criteria:
            <input name='Eligibility' onChange={handleChange}  className='border-[1px] border-black w-full rounded-md' type="text" placeholder='Eligibility'/>
            </div>
            <div className='flex flex-col w-full justify-center items-center my-4'>
            <input className='border-[1px] w-[30%] border-black rounded-md' type="submit" value="Create Event"/>
            </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEvent