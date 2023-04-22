import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Cookies, useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';



function AdminDashboard() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const createEvent = () =>{
      navigate("/admin/createEvent");
    }

    const handleClick = () =>{
        cookies.access_token ? (navigate("/user/calender")): alert("Unauthorized");
    }
    const logout = () =>{
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try{
                const response = await axios.get("http://localhost:3131/user/");
                setEvents(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchEvent();
    }, []);
  return (
    <div className='bg-stone-900 h-screen'>
    <div className='flex flex-row justify-evenly'>
        <p className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-red-500 to-purple-700 text-5xl flex justify-center p-5">
            Clubs and Events Management System
        </p>
        <div className='flex justify-center items-center text-white text-xl gap-4'>
            <button onClick={createEvent} className='rounded-md bg-gray-400 p-2'>Create Event</button>
            <button onClick={handleClick} className='rounded-md bg-gray-400 p-2'>Calender</button>
            <button onClick={logout} className='rounded-md bg-gray-400 p-2'>Logout</button>
        </div>
    </div>
    <div className='flex flex-row h-full'>
        <div className='w-full h-full flex flex-col items-center text-white'>
            <p className=''>EVENTS</p>
            <div className='text-blue-500 grid grid-cols-4 gap-5'>
                {events.map((event) => 
                    (<div key={event._id} className="flex flex-col border-[1px] border-blue-500">
                        <p>{event.Title}</p>
                        <p>{event.Club}</p>
                        <p>{event.Time}</p>
                        <p>{event.Venue}</p>
                        <p>{event.Description}</p>
                        <p>{event.imgUrl}</p>
                        <p>{event.Eligibility}</p>
                    </div>)
                )}
            </div>
        </div> {/*display all events*/}
        {/* <div className='w-[35%] h-full flex flex-col items-center text-white'> */}
        {/* <iframe className='h-[70%] w-full' src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&title=Upcoming%20Events&src=Y19jMGViNjZjNTI3MjMwMDg3MmVjM2IyZmFmZDg5MDIxODRmYTJhMTlkMTk4NmQ3NTdiMGM2NjU3YWViOGEzZTRlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23C0CA33"></iframe> */}
        {/* </div> calender for saved events */}
    </div>
    </div>
  )
}

export default AdminDashboard