import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});
process.env.USN;
process.env.PSWD;


const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);

mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@cems.fkwgxbe.mongodb.net/cems?retryWrites=true&w=majority`
);

app.listen(3131, () => console.log("Server started"));
