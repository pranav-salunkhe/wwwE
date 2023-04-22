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

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/user", calenderRouter, eventRouter);

mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@cems.fkwgxbe.mongodb.net/cems?retryWrites=true&w=majority`
);

app.listen(3131, () => console.log("Server started"));
