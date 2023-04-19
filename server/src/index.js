import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserRouter } from './routes/users.js';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});
process.env.USN;
process.env.PSWD;


const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", UserRouter);

mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@cems.fkwgxbe.mongodb.net/test`,
);

app.listen(3131, () => console.log("Server started"));
