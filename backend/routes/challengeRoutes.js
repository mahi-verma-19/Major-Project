import express from "express";
import Challenge from "../models/Challenge.js";

const router = express.Router();

// POST /api/challenges
router.post("/", async (req, res) => {
  const { title, description, difficulty, timeLimit,startTime, testCases } = req.body;

  try {
   const newChallenge = new Challenge({ title, description, difficulty, timeLimit, startTime, testCases });

    await newChallenge.save();
    res.status(201).json({ message: "Challenge created", challenge: newChallenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /api/challenges - fetch all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 }); // newest first
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✨ UPDATE CHALLENGE (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns updated challenge
    );
    if (!updatedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.status(200).json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: "Failed to update challenge", error });
  }
});
// ✨ DELETE CHALLENGE (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChallenge = await Challenge.findByIdAndDelete(id);
    if (!deletedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.status(200).json({ message: "Challenge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete challenge", error });
  }
});

export default router;
