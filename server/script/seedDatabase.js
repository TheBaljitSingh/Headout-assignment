import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDatabase } from "../db/conn.js";
import Question from "../models/Question.js";
import { generateQuestion } from "../utils/generateQuestions.js";

dotenv.config();

async function seedDatabase() {
  try {
    await connectDatabase();
    
    const destinations =  ["Tokyo,", "Dubai,", "New York,", "London,", "Paris,", "Singapore,", "Hong Kong,", "Bangkok,",  "Chennai,", "Hyderabad,", "Pune,", "Kolkata,", "Ahmedabad,", "Jaipur,", "Lucknow,"]; // this will be taken from user on these input based database will be seeded


    const data = await Promise.all(destinations.map(generateQuestion));
    
    const questions = data.map((response) => {
      if (!response) return null;
      console.log("Raw response from API:", response);
      
      // Updated regex patterns to be more flexible
      const questionMatch = response.match(/\s*Question:\s*(.*?)(?=\s*Clue:)/s);
      const clueMatch = response.match(/\s*Clue:\s*(.*?)(?=\s*Choices:)/s);
      const choicesMatch = response.match(/\s*Choices:\s*\n([\s\S]*?)(?=\s*Answer:)/s);
      const answerMatch = response.match(/\s*Answer:\s*(.*?)(?=\s*cityName:)/s);
      const cityNameMatch = response.match(/\s*cityName:\s*(.*?)(?=\s*Funfact:)/s)
      const funFactMatch = response.match(/\s*Funfact:\s*(.*?)$/s);
      
      
      

      
      // console.log("Question Match:", questionMatch);
      // console.log("Clue Match:", clueMatch);
      // console.log("Choices Match:", choicesMatch);
      // console.log("Answer Match:", answerMatch);
      // console.log("Fun Fact Match:", funFactMatch);
      
      const choices = [];
      if (choicesMatch && choicesMatch[1]) {
        const choicesText = choicesMatch[1];
        const optionLines = choicesText.split('\n');
        optionLines.forEach(line => {
          const match = line.trim().match(/^([A-D])\)(.*)/);
          if (match) {
            choices.push(match[2].trim());
          }
        });
      }
      // console.log("Extracted choices:", choices);
      
      if (questionMatch && clueMatch && choices.length === 4 && answerMatch && funFactMatch) {
        return {
          question: questionMatch[1].trim(),
          clue: clueMatch[1].trim(),
          options: choices,
          correctAnswer: answerMatch[1].trim(),
          cityName: cityNameMatch[1].trim(),
          funFact: funFactMatch[1].trim()
        };
      }

      return null;
    });
    
    // Remove null values in case GPT fails for any destination
    const filteredQuestions = questions.filter(q => q !== null);
    
    if (filteredQuestions.length > 0) {
      await Question.insertMany(filteredQuestions);
      console.log("Database seeded successfully!");
    } else {
      console.log("No valid questions were generated.");
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
}

export default seedDatabase;