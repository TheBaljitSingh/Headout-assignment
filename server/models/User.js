import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    username: { type: String, unique: true, required: true },
    score: { type: Number, default: 0 }, // for right answer +2, and for negative answer -1
    attempts: { type: Number, required: true },
})


const User= mongoose.model("User", userSchema);

export default User;