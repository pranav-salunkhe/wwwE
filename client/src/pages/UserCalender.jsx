import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useGetUserId } from '../hooks/useGetUserID';
import dayjs from 'dayjs';
// import dotenv from 'dotenv';
// dotenv.config({});

function UserCalender() {
  const [savedEvents, setSavedEvents] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedEvents = async () => {
        try{
            const response = await axios.get(`http://localhost:3131/user/savedEvents/${userID}`);
            setSavedEvents(response.data.savedEvents);
        }catch(err){
            console.log(err);
        }
    };

    fetchSavedEvents();
}, []);
console.log(savedEvents);
  const [eventDetails, setEventDetails] = useState({
    Summary: "",
    Description:"",
    StartDate: "",
    EndDate: "",
  });
  const allEvents = [];
    const handleChange = (event) => {
      const { name, value } = event.target;
      console.log(name, ": ", value);
      setEventDetails({...eventDetails, [name]: value});
      allEvents.push(eventDetails);
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
  const [clubEvents, setClubEvents] = useState({
    Summary: "",
    Description:"",
    StartDate: "",
    EndDate: "",
  });
  const addClubEventToCalender = async (event, idx) => {
    clubEvents.Summary = `${event.Title}`;
    clubEvents.Description = event.Description;
    clubEvents.StartDate = `${new Date(event.Date)}`;
    clubEvents.EndDate = `${dayjs(new Date(event.Date)).add(1, 'hour')}`;
    setClubEvents(clubEvents);
    console.log(clubEvents);
    try{
      const response = await axios.post("http://localhost:3131/user/schedule_events", clubEvents);
      alert(response.data.msg);
    }catch (err){
      console.log(err);
    }
  }
  return (
    <div className='bg-gradient-to-b from-white via-violet-100 to-white h-full flex flex-col'>
        <div className='flex justify-center p-5 items-center'>
         <p className='text-5xl text-blue-500 flex justify-center items-center'>Calendar</p>
        </div>
        <div className='flex flex-col justify-center items-center m-5'>
            <div className='flex flex-col w-full h-full justify-center items-center gap-14'>
              <div className='flex flex-row h-full w-full justify-evenly items-center'>
                <form onSubmit={onCalendarClick} className='flex flex-col h-full gap-y-2'>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-blue-500 text-lg'>Summary:</p>
                    <input name='Summary' onChange={handleChange} type='text' placeholder='Event Summary' className='bg-transparent placeholder:text-blue-500 placeholder:text-opacity-30 border-[1px] border-blue-500 border-opacity-30 rounded-md p-2'/>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-blue-500 text-lg'>Description:</p>
                    <input name='Description' onChange={handleChange} type='text' placeholder='Event Description' className='bg-transparent placeholder:text-blue-500 placeholder:text-opacity-30 border-[1px] border-blue-500 border-opacity-30 rounded-md p-2'/>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-blue-500 text-lg'>Start Date-Time:</p>
                    <input name='StartDate' onChange={handleChange} type='datetime-local' placeholder='Event Starts On' className='bg-transparent placeholder:text-blue-500 placeholder:text-opacity-30 border-[1px] border-blue-500 border-opacity-30 rounded-md p-2'/>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-blue-500 text-lg'>End Date-Time:</p>
                    <input name="EndDate" onChange={handleChange} type='datetime-local' placeholder='Event Ends On' className='bg-transparent placeholder:text-blue-500 placeholder:text-opacity-30 border-[1px] border-blue-500 border-opacity-30 rounded-md p-2'/>
                  </div>
                  <input type='submit' className='text-2xl p-2 rounded-md border-[1px] border-blue-500 hover:bg-transparent hover:border-blue-500 hover:text-blue-500 bg-blue-500 text-white flex justify-center items-center' value="Add Event"/>
                </form>
                <div className='flex flex-col overflow-auto h-full border-[1px] border-black'>
                  <div className='flex justify-center m-2'><p>Add Club Event to Calendar</p></div>
                  {savedEvents.map((event, idx) => (
                    <div key={event._id} className='m-2 flex flex-col justify-center items-center'>
                      <button key={idx} onClick={() => addClubEventToCalender(event, idx)} className='p-2 bg-blue-500 rounded-md'><p className='flex items-center text-center align-middle'> + {event.Title}</p></button>
                    </div>
                  ))}
                </div>
                </div>
                <div className='flex h-full w-full justify-center'>
                <Fullcalendar
                
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,bootstrap5Plugin,googleCalendarPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={
                  {
                    start: "today prev,next",
                    center: "",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                  }
                }
                bootstrapFontAwesome={true}
                height='auto'
                themeSystem='bootstrap5'
                googleCalendarApiKey={import.meta.env.VITE_API_KEY}
                events={{
                  googleCalendarId: `${import.meta.env.VITE_CAL_ID}`
                }}
                />
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCalender