const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  customername: { type: String, required: true },
  emailed: { type: String, required: true },
  feedback: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
