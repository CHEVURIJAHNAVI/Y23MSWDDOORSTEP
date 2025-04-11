require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI|| "mongodb://127.0.0.1:27017/authusers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const AuthUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);

// REGISTER User
app.post("/authregister", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Log request data to check if it's received correctly
    console.log("Received registration request:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new AuthUser({
      username,
      email,
      password: hashedPassword,
      role: role || "user", // Default role is "user"
    });

    // Save user to MongoDB
    await newUser.save();
    console.log("User successfully registered:", newUser);

    res.status(201).json({ message: "✅ User registered successfully!" });

  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// LOGIN User
app.post("/authlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
