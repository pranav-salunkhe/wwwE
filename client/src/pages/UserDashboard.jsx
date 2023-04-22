import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Cookies, useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';



function UserDashboard() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

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
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchEvent();
    }, []);
  return (
    <div className='bg-stone-900 h-full'>
    <div className='flex flex-row justify-evenly'>
        <p className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-red-500 to-purple-700 text-5xl flex justify-center p-5">
            Clubs and Events Management System
        </p>
        <div className='flex justify-center items-center text-white text-xl gap-4'>
            <button onClick={handleClick} className='rounded-md bg-gray-400 p-2'>Calender</button>
            <button onClick={logout} className='rounded-md bg-gray-400 p-2'>Logout</button>
        </div>
    </div>
    <div className='flex flex-row h-full'>
        <div className='w-full h-full flex flex-col items-center text-white'>
            <p className=''>EVENTS</p>
            <div className='text-blue-500 p-10 grid grid-cols-4 gap-7'>
                {events.map((event) => 
                    (<div key={event._id} className="border-[1px] rounded-md hover:scale-[1.05] transition-all delay-150 border-white shadow-md shadow-gray-600">
                        <div className='flex flex-col'>
                            <img src={event.imgUrl} alt={event.imgUrl} className="h-72 w-full object-center object-fill"/>
                            <div className='flex flex-col p-5'>
                            <p className='text-2xl font-semibold text-blue-500'>{event.Title}</p>
                            <p className='flex italic font-medium text-gray-300 text-opacity-80 text-xl gap-x-1'><p className='text-white not-italic font-extralight'>By:</p>{event.Club}</p>
                            </div>
                        </div>
                        <div className='flex flex-col px-5 text-white'>
                            <div className='flex flex-row  items-center gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Time: </p><p className='text-lg'>{event.Time}</p>
                            </div>
                            <div className='flex flex-row items-center  gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Venue: </p><p className='text-lg'>{event.Venue}</p>
                            </div>
                            <div className='flex flex-row items-center  gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Description: </p><p className='text-lg'>{event.Description}</p>
                            </div>
                            <div className='flex flex-row items-center  gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Eligibility: </p><p className='text-lg'>{event.Eligibility}</p>
                            </div>
                            <div className='flex justify-center items-center m-5'>
                            <button className='text-white p-2 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150'>Add to Calender</button>
                            </div>
                        </div>
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

export default UserDashboard