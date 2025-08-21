import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
