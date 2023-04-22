const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({version: 'v3', auth});

exports.createCalendarAndEvent = (req, res) => {
  // Create a new calendar
  calendar.calendars.insert({
    resource: {
      summary: 'My Calendar',
      timeZone: 'America/Los_Angeles',
    },
  }, (err, calendarRes) => {
    if (err) return res.status(500).send(`Error creating calendar: ${err}`);
    console.log(`Calendar created: ${calendarRes.data.summary}`);

    // Add an event to the calendar
    calendar.events.insert({
      calendarId: calendarRes.data.id,
      resource: {
        summary: 'My Event',
        start: {
          dateTime: '2023-04-21T10:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: '2023-04-21T11:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        location: '123 Main St, San Francisco, CA 94111',
        description: 'This is my event description',
      },
    }, (eventErr, eventRes) => {
      if (eventErr) return res.status(500).send(`Error adding event: ${eventErr}`);
      console.log(`Event added: ${eventRes.data.summary}`);

      return res.status(200).send(`Calendar created: ${calendarRes.data.summary}, Event added: ${eventRes.data.summary}`);
    });
  });
};
