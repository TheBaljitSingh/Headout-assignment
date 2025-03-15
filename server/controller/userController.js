import express from 'express';
import User from "../models/User.js" // imported from db
import jwt from "jsonwebtoken"

export const registerUser = async (req, res)=>{
    const { username } = req.body;


    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

  try {
    
    if (user) {
      return res.status(400).json({ error: "Username already taken" });
    }

    user = new User({username});
    await user.save();


   
    res.status(200).json({message: "User Registered successfully!", token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
}

export const getLeaderboard  = async(req, res)=>{
    try {
        const leaderboard = await User.find()
        .sort({ score: -1, attempts: 1 })
        .limit(10);
        
      res.json(leaderboard);
        
    } catch (error) {
        res.status(500).json({ error: "Error fetching leaderboard" });

    }
}

export const saveScore = async(req, res)=>{
  try {
    const { username, score, attempts } = req.body;
    const newScore = new User({ username, score, attempts });
    await newScore.save();
    res.json({ message: "Score saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

