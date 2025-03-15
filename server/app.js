import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { configDotenv } from "dotenv";
import { generateQuestion } from './utils/generateQuestions.js';
import seedDatabase from "./script/seedDatabase.js"

configDotenv();

const app = express();




const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  methods: 'GET,POST',
  credentials: true,
};




app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// import faq from "./routes/faqRoute.js"
import gameRoutes from  "./routes/gameRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/v1/game", gameRoutes);
app.use("/api/v1/user", userRoutes);


app.get("/Admin/generateQuestion", async (req, res)=>{
  console.log("admin route for Generate Questions");


 try {
   const generatedQuestion = await seedDatabase();
 
   res.status(200).json({data: generateQuestion});
 } catch (error) {
  res.status(500).json({ error: "Failed to generate questions" });

  
 }


})



app.get("/", function (req, res) {
  res.send("Services are up and running");
});


export default app;
