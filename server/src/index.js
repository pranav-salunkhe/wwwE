import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserRouter } from './routes/users.js';

const app = express();

mongoose.connect(
    "mongodb+srv://pvsalunkhe2003:pranavCEMSiris@cems.fkwgxbe.mongodb.net/cems?retryWrites=true&w=majority"
  );
app.use(express.json());
app.use(cors());
app.use("/auth", UserRouter);



app.listen(3131, () => console.log("Server started"));