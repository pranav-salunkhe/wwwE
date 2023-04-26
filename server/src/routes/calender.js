import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({});


import {google} from 'googleapis';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);


const router = express.Router();
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,
);

const calender = google.calendar({
    version: 'v3',
    auth: process.env.API_KEY,
})

google.options({
    auth: oauth2Client,
})


const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events',];

const url = oauth2Client.generateAuthUrl({
    access_type:'offline',
    scope: SCOPES
});

router.get("/get_url", async (req, res) =>{
    
  
    console.log(req.query);
    
    res.json({url: url, msg: "Success"});
    // res.redirect(url);
});

router.get("/get_url/calender", async(req, res) => {
    console.log(req.query);

    const code = req.query.code;
    const Token = await oauth2Client.getToken(code); 
    console.log(Token);
    oauth2Client.setCredentials({
        access_token: Token.tokens.access_token,
        refresh_token: Token.tokens.refresh_token,
        scope: Token.tokens.scope,
        expiry_date: Token.tokens.expiry_date,
    });
    res.redirect("http://localhost:5173/user/calender")   
})



router.post("/schedule_events", async (req, res) => {
    const timezone = 'Asia/Kolkata';
    console.log(req.body);
    function convertToRFC3339(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getUTCFullYear();
        const month = pad(dateTime.getUTCMonth() + 1);
        const day = pad(dateTime.getUTCDate());
        const hour = pad(dateTime.getUTCHours());
        const minute = pad(dateTime.getUTCMinutes());
        const seconds = pad(dateTime.getUTCSeconds());
        const milliseconds = pad(dateTime.getUTCMilliseconds(), 3);
        return `${year}-${month}-${day}T${hour}:${minute}:${seconds}.${milliseconds}Z`;
      }
      
      function pad(value, length = 2) {
        return String(value).padStart(length, '0');
      }
      
    await calender.events.insert({  
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: {
            summary: req.body.Summary,
            description: req.body.Description,
            start: {
                dateTime: convertToRFC3339(req.body.StartDate),
                // dateTime: dayjs(new Date(req.body.StartDate)).add(req.body.StartTime, 'hour'),
                timeZone: 'Asia/Kolkata',
            },
            end: {
                dateTime: convertToRFC3339(req.body.EndDate),
                // dateTime: dayjs(new Date(req.body.EndDate)).add(req.body.EndTime, 'hour'),
                timeZone: 'Asia/Kolkata',
            }
        },
    }); 
    res.send({
        msg: 'event added',
    });
});

// router.get('/calender', (req, res) => {
//     res.send('its working');
// })

export {router as calenderRouter};
