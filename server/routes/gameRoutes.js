import express from "express";
import { getRandomQuestion, validateAnswer, getQuestionsByInterest } from "../controller/gameController.js";


// import controller

const router = express.Router();

router.route("/random").get(getRandomQuestion);
router.route("/answer").post(validateAnswer);
router.route("/fetch-questions").post(getQuestionsByInterest);


export default router;