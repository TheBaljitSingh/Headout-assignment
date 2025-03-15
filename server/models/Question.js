import mongoose from "mongoose";

const questionSchema =  mongoose.Schema({
    question: String,
    clue: [String],
    options: [String],
    correctAnswer: {type: String, select: false},
    cityName: {type: String, select: false},
    funFact: String,

})

const Question = mongoose.model("Question", questionSchema);


export default Question;