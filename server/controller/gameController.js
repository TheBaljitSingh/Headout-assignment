import express from 'express';
import Destination from "../models/Destination.js" // imported from db
import User from '../models/User.js';

export const getRandomQuestion = async (req, res)=>{
  try {
    const count = await Destination.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomDestination = await Destination.findOne().skip(randomIndex);

    if(!randomDestination){
      return res.status(404).json({ error: "No destination found" });

    }

    const { name, ...destinationWithoutName } = randomDestination.toObject();


    res.json({
      destination: destinationWithoutName,
      options: randomDestination.options,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching destination" });
  }
}



export const validateAnswer = async(req,res)=>{

  try {
    const { destinationId, selectedOption } = req.body; // Get user answer from frontend

    const destination = await Destination.findById(destinationId); // Get correct answer

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    console.log(destinationId,selectedOption)

    const isCorrect = destination.name.toLowerCase() === selectedOption.toLowerCase(); // Compare answer

    if(isCorrect){
      res.status(200).json({isCorrect});
    }else{

      res.status(400).json({ isCorrect });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying answer" });
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

