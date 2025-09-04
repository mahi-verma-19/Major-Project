// backend/routes/authRoutes.js
import express from "express";
import User from "../models/User.js"; // Mongoose model
import bcrypt from "bcryptjs"; // Optional: for hashed passwords

const router = express.Router();

/**
 * POST /api/register
 * Registers a new user (admin or student)
 */
router.post("/register", async (req, res) => {
  const { seatNumber, fullName, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User with this email already exists" });

    const newUser = new User({ seatNumber, fullName, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * POST /api/login
 * Login user by email and role
 */
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(401).json({ message: "Invalid email or role" });

    // Plain text password check (replace with bcrypt.compare for hashed passwords)
    if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });

    // Login success
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/profile/:email
 * Get user/admin profile by email
 */
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/profile/:email
 * Update user/admin profile and password
 */
router.put("/profile/:email", async (req, res) => {
  const { fullName, seatNumber, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update name & seat number
    if (fullName) user.fullName = fullName;
    if (seatNumber) user.seatNumber = seatNumber;

    // Handle password update
    if (oldPassword || newPassword || confirmPassword) {
      if (user.password !== oldPassword)
        return res.status(400).json({ message: "Old password is incorrect" });
      if (newPassword !== confirmPassword)
        return res
          .status(400)
          .json({ message: "New password and confirm password do not match" });

      user.password = newPassword;
    }

    await user.save();

    // Exclude password from response
    const { password, ...userData } = user.toObject();
    res.json({ message: "Profile updated successfully", user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
