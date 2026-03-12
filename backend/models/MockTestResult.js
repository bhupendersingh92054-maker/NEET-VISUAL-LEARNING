import mongoose from "mongoose";

const mockTestResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  maxScore: Number,
  correct: Number,
  wrong: Number,
  skipped: Number,
  accuracy: Number,
  timeTaken: Number, // seconds
  totalQuestions: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("MockTestResult", mockTestResultSchema);