import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Cookies, useCookies} from 'react-cookie';
import { redirect, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useGetUserId } from '../hooks/useGetUserID';
import CEMS_logo from '../assets/CEMS_Logo.png';


function UserDashboard() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [events, setEvents] = useState([]);
    const [savedEvents, setSavedEvents] = useState([]);
    const navigate = useNavigate();
    const userID = useGetUserId();

    // to allow only signed in users to view the calender
    // const handleClick = () =>{
    //     // cookies.access_token ? (navigate("/user/calender")): alert("Unauthorized");

    // }
    // const [url, setUrl] = useState("");
    // const onCalendarClick = async (event) => {
    //     event.preventDefault();
    //     try{
    //         const response = await axios.get('http://localhost:3131/user/calender/');
    //         console.log(response.data);
    //         setUrl(response.data.url);
    //         window.location.href = url;
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    $('#calendar').click(function() {
        $.ajax({
          url: 'http://localhost:3131/user/get_url',
          type: 'GET',
          success: function(data) {
            window.location.href = data.url;
          },
          error: function() {
            alert('Failed to retrieve URL');
          }
        });
      });
      

    //clear the cookies after logout
    const logout = () =>{
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }

    useEffect(() => {
        // fetch all the events
        const fetchEvent = async () => {
            try{
                const response = await axios.get("http://localhost:3131/user/");
                setEvents(response.data);
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        };
        // fetch the events that are saved by the user
        const fetchSavedEvents = async () => {
            try{
                const response = await axios.get(`http://localhost:3131/user/savedEvents/ids/${userID}`);
                setSavedEvents(response.data.savedEvents);
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        };

        

        fetchEvent();
        fetchSavedEvents();
    }, []);

    // for displaying the description of event on clicking the details button
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
    

    // to add the event to saved events on clicking 'save'
    const onSaveClick = async (EventID, idx) => {
        try{
            const response = await axios.put("http://localhost:3131/user/", {eventID: EventID, userID: userID});
            setSavedEvents(response.data.savedEvents);
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const isEventSaved = (id) => savedEvents.includes(id);

    // nav to saved events
    const goToSavedEvents = () =>{
        navigate('/user/savedEvents');
    }


    // const [filteredEvents, setFilteredEvents] = useState(events);
    // const [filteredClub, setFilteredClub] = useState("any");
    // const [filteredTime, setFilteredTime] = useState("any");
    // const [filteredElig, setFilteredElig] = useState("all");
    // const [filteredDate, setFilteredDate] = useState("");

    // const onFilterClubChange = (event) => {
    //     setFilteredClub(event.target.value);
    // }
    // const onFilterTimeChange = (event) => {
    //     setFilteredTime(event.target.value);
    // }
    // const onFilterEligChange = (event) => {
    //     setFilteredElig(event.target.value);
    // }
    // const onFilterDateChange = (event) => {
    //     setFilteredDate((new Date(event.target.value).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })));
    // }
    // const newFilteredEvents = events.filter((event) =>{
    //     if(event.Club === filteredClub.toLocaleUpperCase && (event.Eligibility) === (filteredElig)){
    //         // setFilteredEvents(newFilteredEvents)
    //         // console.log("Filtered Events: ", filteredEvents);
    //         return event.Club === filteredClub && (event.Eligibility) === (filteredElig)
    //     }else{
    //         return event;
    //     }
    // })


    // const [displayEvents, setDisplayEvents] = useState(events);

    // const onFilter = (event) => {
    //     setFilterClicked(true);
    //     event.preventDefault();
    //     setFilteredEvents(newFilteredEvents);
    //     console.log(filteredEvents);
    //     setDisplayEvents(filteredEvents);
    // }
    const reset = () => {
        setSelectedClub('');
        setSelectedDate('');
        setSelectedEligibility('');
        setSelectedTime('');
        setfinalEvents([]);
    }
    const onFilterBtnClick = () => {
        if($('#filter').hasClass('hidden')){
            $('#filter').removeClass('hidden');
            $('#filter').addClass('flex flex-col ');
        }else{
            $('#filter').addClass('hidden');
        }
    }


    // 
    const [selectedClub, setSelectedClub] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEligibility, setSelectedEligibility] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [finalEvents, setfinalEvents] = useState([]);
  const handleFilter = () => {
    const filteredEvents = events.filter(
      event =>
        event.Club === selectedClub &&
        (new Date(event.Date)).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) === selectedDate &&
        event.Eligibility === selectedEligibility &&
        event.Time === selectedTime
    );
    setfinalEvents(filteredEvents); // do something with the filtered events
  };

  let temp_events = finalEvents.length > 0 ? finalEvents : events;
  return (
    <div className="bg-stone-900 w-full">
      <div className="flex flex-col sm:flex-row justify-evenly h-full">
        {/*     <img src={CEMS_logo} alt='Logo' className='h-[60px] w-[60px] my-5 flex justify-center items-center' /> */}
        <p className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-red-500 to-purple-700 text-5xl flex justify-center p-5">
          Clubs and Events Management System
        </p>
        <div className="flex justify-center items-center text-white text-xl gap-4">
          <button
            id="calendar"
            className="rounded-md bg-blue-500 hover:bg-transparent border-[1px] border-blue-500 hover:text-blue-500 p-2"
          >
            Calender
          </button>
          <button
            onClick={logout}
            className="rounded-md bg-blue-500 hover:bg-transparent border-[1px] border-blue-500 hover:text-blue-500 p-2"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div className="w-full h-full flex flex-col items-center text-white">
          <div className="flex flex-row w-full justify-evenly items-center m-1 lg:m-5">
            <div className="flex basis-1/2 justify-end items-center">
              <p className="text-5xl text-blue-500">EVENTS</p>
            </div>
            <div className="flex basis-1/2 justify-end items-center mx-20 gap-x-5">
              <button onClick={onFilterBtnClick} className="text-white p-2 w-32 md:h-7 lg:h-10 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150">
                Filter
              </button>
              <button
                onClick={goToSavedEvents}
                className="text-white p-2 w-32 md:h-7 lg:h-10 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150"
              >
                Saved Events
              </button>
            </div>
          </div>
          <div id='filter' className="hidden justify-center items-center p-5 text-xl text-blue-500">
            <p className='text-2xl font-semibold'>Filter Events</p>
            <div className='grid grid-cols-4 gap-x-5'>
            <label>
              <p className='text-2xl font-extralight'>Club</p>
              <select
                className='bg-transparent border-[1px] border-white rounded-md p-2 h-12'
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
              >
                <option value="">-- Select Club --</option>
                <option value="ISTE">ISTE</option>
                <option value="IRIS">IRIS</option>
                <option value="ACM">ACM</option>
                <option value="IEEE">IEEE</option>
                <option value="WEC">WEC</option>
                <option value="IE">IE</option>
                <option value="IET">IET</option>
              </select>
            </label>
            
            <label>
              <p className='text-2xl font-extralight'>Date</p>
              <input
                className='bg-transparent border-[1px] border-white rounded-md p-2 h-12'
                placeholder='DD-MM-YYYY'
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
            
            <label>
              <p className='text-2xl font-extralight'>Eligibility</p>
              <select
                className='bg-transparent border-[1px] border-white rounded-md p-2 h-12'
                value={selectedEligibility}
                onChange={(e) => setSelectedEligibility(e.target.value)}
              >
                <option value="">-- Select Eligibility --</option>
                <option value="Open for all">Open for all</option>
                <option value="Open for 1st years">Open for 1st years</option>
                <option value="Open for 2nd years">Open for 2nd years</option>
                <option value="Open for 3rd years">Open for 3rd years</option>
                <option value="Open for 4th years">Open for 4th years</option>
                <option value="Internal Event">Internal Event</option>

              </select>
            </label>
            
            <label>
              <p className='text-2xl font-extralight'>Starting Time</p>
              <input
                className='bg-transparent border-[1px] border-white rounded-md p-2 h-12'
                placeholder='For ex: 6:00PM'
                type="text"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </label>
            </div>
            <div className='flex w-full justify-center items-center '>
                <button className='bg-blue-500 text-white p-2 rounded-md m-2 hover:bg-transparent hover:border-blue-500 border-[1px] border-blue-500 hover:text-blue-500' onClick={handleFilter}>Filter</button>
                <button className='bg-blue-500 text-white p-2 rounded-md m-2 hover:bg-transparent hover:border-blue-500 border-[1px] border-blue-500 hover:text-blue-500' onClick={reset}>Reset</button>
            </div>
          </div>
          <div className="text-blue-500 mx-[30px] my-[30px] sm:mx-[50px] sm:my-[50px] md:mx-[30px] lg:mx-[7px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-10 md:gap-x-9 lg:gap-x-8 gap-y-14">
            {temp_events.map((event, idx) => (
                  <div
                    key={event._id}
                    className="border-[1px] p-1 h-full w-full rounded-md hover:scale-[1.05] transition-all delay-150 border-white shadow-md shadow-gray-600"
                  >
                    <div
                      id={`eventCard${idx}`}
                      className="flex flex-col h-full w-full"
                    >
                      <div className="flex flex-col basis-1/2">
                        <img
                          src={event.imgUrl}
                          alt={event.imgUrl}
                          className="h-full w-full object-center object-fill"
                        />
                        <div className="flex flex-col p-3">
                          <p className="text-2xl font-semibold text-blue-500">
                            {event.Title}
                          </p>
                          <p className="flex italic font-medium text-gray-300 text-opacity-80 text-xl gap-x-1">
                            <p className="text-white not-italic font-extralight">
                              By:
                            </p>
                            {event.Club}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col px-3 basis-1/2 text-white">
                        <div className="flex flex-row  items-center gap-x-1">
                          <p className="text-blue-500 font-extralight sm:text-xs md:text-sm lg:text-lg">
                            Date:{" "}
                          </p>
                          <p className="sm:text-xs md:text-sm lg:text-lg">
                            {new Date(event.Date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex flex-row  items-center gap-x-1">
                          <p className="text-blue-500 font-extralight sm:text-xs md:text-sm lg:text-lg">
                            Time:{" "}
                          </p>
                          <p className="sm:text-xs md:text-sm lg:text-lg">
                            {event.Time}
                          </p>
                        </div>
                        <div className="flex flex-row items-center  gap-x-1">
                          <p className="text-blue-500 font-extralight sm:text-xs md:text-sm lg:text-lg">
                            Venue:{" "}
                          </p>
                          <p className="sm:text-xs md:text-sm lg:text-lg whitespace-nowrap text-ellipsis">
                            {event.Venue}
                          </p>
                        </div>
                        <div className="flex flex-row items-center  gap-x-1">
                          <p className="text-blue-500 font-extralight sm:text-xs md:text-sm lg:text-lg">
                            Eligibility:{" "}
                          </p>
                          <p className="sm:text-xs md:text-sm lg:text-lg whitespace-nowrap text-ellipsis">
                            {event.Eligibility}
                          </p>
                        </div>
                        <div className="flex justify-between w-full items-center m-2 md:my-2 lg:my-4">
                          <button
                            onClick={() => onBtnClick(idx)}
                            className="text-white flex basis-1/2 justify-center items-center m-2 p-2 md:h-10 lg:h-10 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150"
                          >
                            Details
                          </button>
                          <button
                            id={`saveBtn${idx}`}
                            disabled={isEventSaved(event._id)}
                            onClick={() => onSaveClick(event._id, idx)}
                            className="text-white flex basis-1/2 justify-center items-center m-2 p-2 md:h-10 lg:h-10 rounded-lg font-semibold border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150"
                          >
                            {isEventSaved(event._id) ? "Saved" : "Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id={`desc${idx}`} className="h-full w-full hidden">
                      <div className="flex justify-between items-center p-5">
                        <button
                          onClick={() => onBackClick(idx)}
                          className="text-white text-center items-start text-3xl font-extralight w-[20%] rounded-lg border-[1px] border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500 transition-all delay-150"
                        >
                          &lt;
                        </button>
                        <div className="flex justify-center w-[80%] ">
                          <p className="text-blue-500 font-semibold text-lg">
                            Details
                          </p>
                        </div>
                      </div>
                      <p className="text-lg text-blue-500 text-justify font-extralight p-5">
                        {event.Description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        {/*display all events*/}
        {/* <div className='w-[35%] h-full flex flex-col items-center text-white'> */}
        {/* <iframe className='h-[70%] w-full' src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&title=Upcoming%20Events&src=Y19jMGViNjZjNTI3MjMwMDg3MmVjM2IyZmFmZDg5MDIxODRmYTJhMTlkMTk4NmQ3NTdiMGM2NjU3YWViOGEzZTRlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23C0CA33"></iframe> */}
        {/* </div> calender for saved events */}
      </div>
    </div>
  );
}

export default UserDashboard