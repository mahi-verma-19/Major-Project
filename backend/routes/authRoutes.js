import express from "express";

const router = express.Router();

// Example routes (dummy for now)
router.post("/register", (req, res) => {
  res.send("Register endpoint working...");
});

router.post("/login", (req, res) => {
  res.send("Login endpoint working...");
});

export default router;   // <-- this is required for "import authRoutes from ..."
