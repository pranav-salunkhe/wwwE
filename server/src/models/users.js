import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    "username": {type: String, required: true, unique: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "isConvenor": {type: Boolean, required: true, default: false},
    "savedEvents": [{type: mongoose.Schema.Types.ObjectId, ref: "event"}],
})

export const UserModel = mongoose.model("users", UserSchema);