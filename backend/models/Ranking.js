import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalScore: Number,
  rank: Number,
}, { timestamps: true });

export default mongoose.model("Ranking", rankingSchema);
