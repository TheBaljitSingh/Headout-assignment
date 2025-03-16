import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
import axios from 'axios';



// const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

console.log("chatgpt key:> "+process.env.OPENAI_API_KEY);

export async function generateQuestion() {
  try {
    const prompt = `Generate a list of 100 random travel-related quiz questions. In clue don't mention Destination name. Each question should include:
1. The correct destination name.
2. A short Question related to destination
3. A short clue about the destination.
4. Four multiple-choice options (one of which is correct).
5. A fun fact about the destination.

Format the response as JSON only:
[
  {
    "name": "Destination Name",
    "question" : "A short Question related to destination for the quiz" 
    "clue": "A short clue about the place.",
    "options": ["Option1", "Option2", "Option3", "Option4"],
    "funFact": "An interesting fact about the destination."
  },
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    try {
      let responseText = response.text(); // Get the response text

    
      // Remove markdown code block if present
      if (responseText.startsWith("```json")) {
        responseText = responseText.substring(7, responseText.length - 3); // Remove ```json and ```
      }

      if (responseText.endsWith("```")) {
        responseText = responseText.substring(0, responseText.length - 3); // Remove ```
      }
    
      const parsedResponse = JSON.parse(responseText);
      return parsedResponse;
    
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Received response:", response.text()); // Log the raw response for debugging.
      return null;
    }

  } catch (error) {
    console.error("Error generating question:", error);
    return null;
  }
}