import mongoose from "mongoose";

const malpracticeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  detectedAt: { type: Date, default: Date.now },
  flags: [String]
});

export default mongoose.model("MalpracticeLog", malpracticeSchema);
