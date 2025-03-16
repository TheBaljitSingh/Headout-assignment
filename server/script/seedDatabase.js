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


    const filteredData = data.filter(d =>{
      return d.name && d.question && d.clue && d.options && d.funFact;

    })

    console.log(filteredData);

    console.log("printing the data:  ", filteredData)

    if (!filteredData) {
      console.error("no valid data");
      return;
    }

    
   

    if (filteredData.length > 0) {
      await Destination.insertMany(data);

      console.log("Inserted successfully");

    } else {
      console.log("No valid questions to insert.");
    }

    mongoose.disconnect();


    return data;
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
}

export default seedDatabase;