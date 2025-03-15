import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    username: { type: String, unique: true, required: true },
    score: { type: Number, default: 0 },
})


const User= mongoose.model("User", userSchema);

export default User;