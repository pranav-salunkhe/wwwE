import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({});

import {google} from 'googleapis';

const router = express.Router();
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL,

);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];


router.get("/calender", async (req, res) =>{
    
    const url = oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope: SCOPES
    });
    
    res.json({url: url, msg: "Success"});
});

// router.get('/calender', (req, res) => {
//     res.send('its working');
// })

export {router as calenderRouter};
