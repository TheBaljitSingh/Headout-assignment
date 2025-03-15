import express from 'express';
import Question from "../models/Question.js" // imported from db
import User from '../models/User.js';
import jwt from "jsonwebtoken"

export const getRandomQuestion = async (req, res)=>{
        try {

          const {interests} = req.body;

          console.log(interests);

          // const filteredQuestions = await Question.find({ cityName: { $in: interests } }).limit(5);
          const filteredQuestions = await Question.aggregate([
            { $match: { cityName: { $in: interests } } },
            { $sample: { size: 5 } }
          ]);
          

            if(filteredQuestions.length===0){
              return res.status(404).json({ message: "No questions found for these interests." });
            }

            const token = jwt.sign({interests, questionCount: 0, score:0}, process.env.SECRET_KEY, {expiresIn: "1hr"});
            res.json({token, questions: filteredQuestions});

            // this should also return  option to choose
          } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Error fetching question" });
          }
}





export const validateAnswer = async(req,res)=>{
    const { answer, questionId } = req.body;

    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "


  try {



    const question = await Question.findById(questionId).select("+correctAnswer");

    if (!question) return res.status(404).json({ error: "Question not found" });

   
    let decode;
    let newScore = 0;
    try {
      decode = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Invalid or expired token or Game is ended" });
      
    }

    const correctAnswer = question.correctAnswer.substring(3).toLowerCase().trim();
    const userAnswer = answer.toLowerCase().trim();

    const isCorrect = correctAnswer === userAnswer;



    if(isCorrect){
      newScore+=10;
    }else{
      newScore = decode.score??0;
    }

    let newQuestionCount  = decode.questionCount +1;

    const newToken = jwt.sign({ interests: decode.interests, questionCount: newQuestionCount, score: newScore }, process.env.SECRET_KEY, { expiresIn: "1h" });
  

    const isLastQuestion = newQuestionCount === 5;

    if (isLastQuestion) {
      // Save the user's score
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: "Username required to save score" });
      }

      let user = await User.findOne({ username });
      if (!user) {
        user = new User({ username, score: newScore });
      } else {
        user.score = newScore; // Update score if user exists
      }

      await user.save();
      console.log("Saved in database");
    }


    res.json({
      correct: isCorrect, // directly sending the anser  is true or false
      score: newScore,
      token:newToken,
      funFact: question.funFact
    })



    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error validating answer" });
  }
}

export const getQuestionsByInterest = async (req, res)=>{
  try {
    const {destinations } = req.body;
  
    if(!destinations || destinations.length===0){
      return res.status(400).json({ message: "Destinations required!" });
    }
  
    const questions = await Question.find({destinations:{$in:destinations}}).limit(5);
  
    res.status(200).json({questions});
  } catch (error) {

    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }


}

