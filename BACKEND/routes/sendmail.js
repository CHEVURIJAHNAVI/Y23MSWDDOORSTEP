const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Feedback = require("../models/feedback");
require("dotenv").config();

// POST Route for Sending Feedback and Email
router.post("/sendmail", async (req, res) => {
  const { customername, emailed, feedback } = req.body;

  try {
    // Save Feedback in Database
    const newFeedback = new Feedback({ customername, emailed, feedback });
    await newFeedback.save();

    // Nodemailer Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    // Email Options
    let mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: emailed,
      subject: "Feedback Received",
      text: `Hello ${customername},\n\nThank you for your feedback!\n\nYour message: ${feedback}\n\nBest Regards,\nYour Company`,
    };

    // Send Email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }
      res.status(200).json({ message: "Feedback submitted and email sent", info });
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
