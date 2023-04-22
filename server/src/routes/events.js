import { EventModel } from "../models/events.js";
import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const response = await EventModel.find({});
        res.json(response);
    }catch (err){
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const event = new EventModel(req.body);
    try{
        const response = await event.save();
        res.json(response);
    }catch (err){
        res.json(err);
    }
});

router.put("/", async (req, res) => {
    try{
        const event = await EventModel.findById(req.body.eventID);
        const user = await UserModel.findById(req.body.userID);
        user.savedEvents.push(event);
        await user.save();
        res.json({savedEvents: user.savedEvents});
    }catch (err){
        res.json(err);
    }
});

router.get("/savedEvents/ids/:userID", async (req, res) =>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedEvents: user?.savedEvents});
    }catch (err){
        res.json(err);
    }
});

router.get("/savedEvents/:userID", async (req, res) =>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedEvents = await EventModel.find({
            _id: {$in: user.savedEvents},
        });
        res.json({savedEvents});
    }catch (err){
        res.json(err);
    }
});

export {router as eventRouter};