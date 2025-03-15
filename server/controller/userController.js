import express from 'express';
import User from "../models/User.js" // imported from db
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  const { username, score, attempts } = req.body;

  // Check if all fields are provided
  if (!username || score === undefined || attempts === undefined) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      // Check if user already exists
      const alreadyUser = await User.findOne({ username });

      if (alreadyUser) {
          return res.status(400).json({ error: "Username already taken" });
      }

      // Register new user
      const user = new User({ username, score, attempts });
      await user.save();

      res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error registering user" });
  }
};


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


export const getUserDetails = async (req, res) => {
  try {
      const { username } = req.query; // Extract username from URL params

      if (!username) {
          return res.status(400).json({ error: "Username is required" });
      }

      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching user details" });
  }
};

