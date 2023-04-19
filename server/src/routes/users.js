import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/users.js';

const router = express.Router()

router.post("/register", async (req, res) => {
    const {username} = req.body;
    const user = await UserModel.findOne({username}); 
    res.json(user);
});



export {router as UserRouter};