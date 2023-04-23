import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Cookies, useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useGetUserId } from '../hooks/useGetUserID';


// Page to show the events saved by the user
function SavedEvents() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [savedEvents, setSavedEvents] = useState([]);

    
    const navigate = useNavigate();
    const userID = useGetUserId();
    const createEvent = () =>{
      navigate("/admin/createEvent");
    }

    const handleClick = () =>{
        cookies.access_token ? (navigate("/admin/calender")): alert("Unauthorized");
    }
    const logout = () =>{
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }


    // send a get request to get all array of events saved by the user
    useEffect(() => {
        const fetchSavedEvents = async () => {
            try{
                const response = await axios.get(`http://localhost:3131/user/savedEvents/${userID}`);
                setSavedEvents(response.data.savedEvents);
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        };

        fetchSavedEvents();
    }, []);
    const onBtnClick = (idx) => {
        $(`#desc${idx}`).removeClass("hidden");
        $(`#eventCard${idx}`).removeClass("flex flex-col");    
        $(`#eventCard${idx}`).addClass("hidden");
    };
    const onBackClick = (idx) => {
        $(`#desc${idx}`).addClass("hidden");
        $(`#eventCard${idx}`).removeClass("hidden");
        $(`#eventCard${idx}`).addClass("flex flex-col");    
    };
    

    const goToAllEvents = () =>{
        navigate('/admin');
    }
  return (
    <div className='bg-stone-900 w-full'>
    <div className='flex flex-row h-[10%] justify-evenly items-center'>
        <p className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-red-500 to-purple-700 text-5xl flex justify-center p-5">
            Clubs and Events Management System
        </p>
        <div className='flex justify-center items-center text-white text-xl gap-4'>
            <button onClick={createEvent} className='rounded-md bg-blue-500 hover:bg-transparent border-[1px] border-blue-500 hover:text-blue-500 p-2'>Create Event</button>
            <button onClick={handleClick} className='rounded-md bg-blue-500 hover:bg-transparent border-[1px] border-blue-500 hover:text-blue-500 p-2'>Calender</button>
            <button onClick={logout} className='rounded-md bg-blue-500 hover:bg-transparent border-[1px] border-blue-500 hover:text-blue-500 p-2'>Logout</button>
        </div>
    </div>
    <div className='flex flex-row h-[90%]'>
        <div className='w-full h-full flex flex-col items-center text-white'>
            <div className='flex flex-row w-full justify-evenly items-center m-5'>
                <div className='flex basis-1/2 justify-end items-center'>
                    <p className='text-5xl text-blue-500'>SAVED EVENTS</p>
                </div>
                <div className='flex basis-1/2 justify-end items-center mx-20'>
                    <button onClick={goToAllEvents} className='text-white p-2 w-32 md:h-7 lg:h-10 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150'>Back</button>
                </div>
            </div>
            {savedEvents.length===0 ? <div className='h-full flex justify-center items-center text-5xl'>Saved events will appear here!</div> :
            <div className='text-blue-500 md:px-0 lg:px-10 lg:py-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-14'>
                {savedEvents.map((event , idx) => 
                    (<div key={event._id} className="border-[1px] h-[42vmax] w-[22vmax] rounded-md hover:scale-[1.05] transition-all delay-150 border-white shadow-md shadow-gray-600">
                        <div id={`eventCard${idx}`} className='flex flex-col h-full w-full'>
                        <div className='flex flex-col basis-1/2'>
                            <img src={event.imgUrl} alt={event.imgUrl} className="h-full w-full object-center object-fill"/>
                            <div className='flex flex-col p-5'>
                            <p className='text-2xl font-semibold text-blue-500'>{event.Title}</p>
                            <p className='flex italic font-medium text-gray-300 text-opacity-80 text-xl gap-x-1'><p className='text-white not-italic font-extralight'>By:</p>{event.Club}</p>
                            </div>
                        </div>
                        <div className='flex flex-col px-5 basis-1/2 text-white'>
                            <div className='flex flex-row  items-center gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Date: </p><p className='text-lg'>{(new Date(event.Date)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                            </div>
                            <div className='flex flex-row  items-center gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Time: </p><p className='text-lg'>{event.Time}</p>
                            </div>
                            <div className='flex flex-row items-center  gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Venue: </p><p className='text-lg whitespace-nowrap text-ellipsis'>{event.Venue}</p>
                            </div>
                            <div className='flex flex-row items-center  gap-x-1'>
                            <p className='text-blue-500 font-extralight text-lg'>Eligibility: </p><p className='text-lg whitespace-nowrap text-ellipsis'>{event.Eligibility}</p>
                            </div>
                            <div className='flex justify-center items-center m-5 gap-5'>
                            <button onClick={() => onBtnClick(idx)} className='text-white p-2 w-[50%] md:h-7 lg:h-10 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150'>Details</button>  
                            </div>
                        </div>
                        </div>
                        <div id={`desc${idx}`} className='h-full w-full hidden'>
                            <div className='flex justify-between items-center p-5'>
                            <button onClick={() => onBackClick(idx)} className='text-white text-center items-start text-3xl font-extralight w-[20%] rounded-lg border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150'>&lt;</button>
                            <div className='flex justify-center w-[80%] '>
                                <p className='text-blue-500 font-semibold text-lg'>Details</p>
                            </div>
                            </div>
                            <p className='text-lg text-blue-500 text-justify font-extralight p-5'>{event.Description}</p>
                        </div>
                    </div>)
                )}
            </div>
            }
        </div> {/*display all events*/}
        {/* <div className='w-[35%] h-full flex flex-col items-center text-white'> */}
        {/* <iframe className='h-[70%] w-full' src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&title=Upcoming%20Events&src=Y19jMGViNjZjNTI3MjMwMDg3MmVjM2IyZmFmZDg5MDIxODRmYTJhMTlkMTk4NmQ3NTdiMGM2NjU3YWViOGEzZTRlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23C0CA33"></iframe> */}
        {/* </div> calender for saved events */}
    </div>
    </div>
  )
}

export default SavedEvents