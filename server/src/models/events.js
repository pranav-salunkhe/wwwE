import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    "Title": {type: String, required: true},
    "Club": {type: String, required: true},
    "Date": {type: Date, required: true, unique: true},
    "Time": {type: String, required: true},
    "Venue": {type: String, required: true},
    "Description": {type: String, required: true},
    "imgUrl": {type: String, required: true},
    "Eligibility": {type: String, required: true},
    "userOwner": {type: mongoose.Types.ObjectId, ref:"users", required: true},
})

export const EventModel = mongoose.model("events", EventSchema);