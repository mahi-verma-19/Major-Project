import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  code: String,
  language: String,
  timeTaken: Number,
  efficiencyScore: Number,
  correctnessScore: Number,
  submissionTime: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
