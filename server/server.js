import {connectDatabase} from "./db/conn.js";


import server from "./app.js";
connectDatabase();


import { generateQuestion } from "./utils/generateQuestions.js";

generateQuestion();

server.listen(process.env.PORT, (err)=>{
    if(err){
        console.log("error hai=> " + err)
    }

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

process.on('unhandledRejection', (err)=>{
    console.log(`Err: ${err.message}`);
    console.log(`Shutting down the serverdue to Unhandled Promise Rejection`);
    
    server.close(()=>{
        process.exit(1);
    })
})



