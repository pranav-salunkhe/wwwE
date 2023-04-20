import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/users.js';

const router = express.Router()


router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(user){
        res.json({message: "User exists!"});
    }else{
        res.json({message: "User does not exist!"});
    }
});



export {router as userRouter};