const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    let user = await AuthUser.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new AuthUser({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
