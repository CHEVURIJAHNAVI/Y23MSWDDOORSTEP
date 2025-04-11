require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Feedback Schema & Model
const feedbackSchema = new mongoose.Schema({
  customername: { type: String, required: true },
  emailed: { type: String, required: true },
  feedback: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST Route to Store Feedback & Send Email
app.post("/api/sendmail", async (req, res) => {
  const { customername, emailed, feedback } = req.body;

  // Validate Request
  if (!customername || !emailed || !feedback) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Store Feedback in Database
    const newFeedback = new Feedback({ customername, emailed, feedback });
    await newFeedback.save();
    console.log("Feedback stored in database");

    // Ensure SMTP credentials are available
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP credentials are missing in environment variables.");
    }

    // Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // App password
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: emailed,
      subject: "Feedback Submission Acknowledgment",
      text: `Dear ${customername},\n\nThank you for your feedback!\n\nWe appreciate your time and effort in sharing your thoughts with us.\n\nBest Regards,\nYour Team`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json({ message: "Feedback submitted and email sent!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: " Error submitting feedback, please try again." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
