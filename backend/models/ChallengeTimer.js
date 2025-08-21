import mongoose from "mongoose";

const challengeTimerSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  startTime: Date,
  endTime: Date,
  active: Boolean
});

export default mongoose.model("ChallengeTimer", challengeTimerSchema);
