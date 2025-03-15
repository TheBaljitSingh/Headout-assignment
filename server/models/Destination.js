import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Correct answer
  clue: { type: String, required: true }, // A hint for the destination
  options: { type: [String], required: true }, // Multiple-choice options
  funFact: { type: String }, // A fun fact about the destination
});


const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
