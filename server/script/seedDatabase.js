import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDatabase } from "../db/conn.js";
import { generateQuestion } from "../utils/generateQuestions.js";
import Destination from "../models/Destination.js";


dotenv.config();

async function seedDatabase() {
  try {
    await connectDatabase();
    
    const data = await generateQuestion();

    if (!data) {
      console.error("no valid data");
      return;
    }

   
    const filteredData = data.filter((d) => d != null); // Corrected NULL to null

    if (filteredData.length > 0) {
      await Destination.insertMany(filteredData);

    } else {
      console.log("No valid questions to insert.");
    }

    mongoose.disconnect();

    return filteredData;

    return filteredData;
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
}

export default seedDatabase;