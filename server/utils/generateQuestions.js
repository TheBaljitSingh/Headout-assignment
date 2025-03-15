import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";


dotenv.config();
import axios from 'axios';



// const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

console.log("chatgpt key:> "+process.env.OPENAI_API_KEY);

export async function generateQuestion(destination) {
  try {
    const prompt = `Generate cryptic clues question about a famous destination without naming it. Clues should hint at its geography, history, culture, or landmarks for ${destination}.
    
    Format your response exactly like this:
    Question: [Write the destination question here]
    Clue: [Write a cryptic clue here]
    Choices:
    A) [First option]
    B) [Second option]
    C) [Third option]
    D) [Fourth option]
    Answer: [Correct answer letter and text]
    cityName: [Write a City Name here]
    Funfact: [Write a fun fact here]
    
    Make sure to follow this exact format with these exact headings.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response; // Return structured question
  } catch (error) {
    console.error("Error generating question:", error);
    return null;
  }
}