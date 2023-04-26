import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({});


import {google} from 'googleapis';
import dayjs from 'dayjs';




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



router.get("/schedule_events", async (req, res) => {
    await calender.events.insert({  
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: {
            summary: 'This is another test event',
            description: 'Important test event',
            start: {
                dateTime: dayjs(new Date()).add(1, 'day').toISOString(),
                timeZone: 'Asia/Kolkata',
            },
            end: {
                dateTime: dayjs(new Date()).add(1, 'day').add(1, 'hour').toISOString(),
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
