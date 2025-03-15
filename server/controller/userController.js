import express from 'express';
import User from "../models/User.js" // imported from db
import jwt from "jsonwebtoken"

export const registerUser = async (req, res)=>{
    const { username } = req.body;

    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "


    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

  try {
    let decode = jwt.verify(token, process.env.SECRET_KEY);
    
   let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already taken" });
    }

    user = new User({username, score: decode.score});
    await user.save();


   
    res.status(200).json({message: "User Registered successfully!", token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
}

export const getLeaderboard  = async(req, res)=>{
    try {
        const leaderboard = await User.find().sort({ score: -1 }).limit(10);
        res.json(leaderboard);
        
    } catch (error) {
        res.status(500).json({ error: "Error fetching leaderboard" });

    }
}

