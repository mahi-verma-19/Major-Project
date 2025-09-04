import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  timeLimit: Number,
  startTime: { type: Date, required: true },
  testCases: [
    { input: String, expectedOutput: String }
  ]
}, { timestamps: true });

export default mongoose.model("Challenge", challengeSchema);
