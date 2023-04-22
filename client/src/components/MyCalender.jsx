import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect, useState } from 'react';

function MyCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from Google Calendar API
    const fetchEvents = async () => {
      // Use your own Google API credentials and calendar ID
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/your-calendar-id/events',
        {
          headers: {
            Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      const calendarEvents = data.items.map((event) => ({
        id: event.id,
        title: event.summary,
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
      }));
      setEvents(calendarEvents);
    };

    fetchEvents();
  }, []);

  return (
    <div className="">
      <Calendar
        
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
export default MyCalendar;