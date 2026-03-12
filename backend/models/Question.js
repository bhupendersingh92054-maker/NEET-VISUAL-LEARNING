import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  subject: String,
  question: String,
  options: [String],
  correct: Number,
  explanation: String
});

export default mongoose.model("Question", QuestionSchema);