import express from 'express';
import { getLeaderboard, getUserDetails, registerUser, saveScore } from '../controller/userController.js';

// import controller

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/leaderboard").get(getLeaderboard);
router.route("/save-score").post(saveScore);
router.route('/getUserDetails').get(getUserDetails);

// one route is there to save the user is interested in which city
// after that i have to generate the feed of questions() and track their score ?one dooubt? how to store their score without logged in i have to store it in the local storage or only allow the logged in user(not feasable)?



export default router;