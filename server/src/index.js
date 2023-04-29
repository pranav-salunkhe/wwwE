import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import dotenv from 'dotenv';
import { calenderRouter } from './routes/calender.js';
import { eventRouter } from './routes/events.js';

dotenv.config({path:'./.env'});
process.env.USN;
process.env.PSWD;


const app = express();
app.options("*", cors());

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use("/auth", userRouter);
app.use("/user", calenderRouter, eventRouter);

mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@cems.fkwgxbe.mongodb.net/cems?retryWrites=true&w=majority`
);

app.listen(3131, () => console.log("Server started"));
