import Question from "../models/Question.js";
import User from "../models/User.js";
import Test from "../models/Test.js";

export const getQuestions = async (req, res) => {
  try {
    const { subject, chapter } = req.query;
    const questions = await Question.find({ subject, chapter }).limit(10);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const submitTest = async (req, res) => {
  try {
    const { subject, answers } = req.body;
    // answers = [{ questionId: "xxx", selectedOption: 1 }]

    const questionIds = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let correct = 0, wrong = 0, skipped = 0;

    questions.forEach(q => {
      const userAnswer = answers.find(a => a.questionId === q._id.toString());
      if (!userAnswer || userAnswer.selectedOption === undefined) {
        skipped++;
      } else if (userAnswer.selectedOption === q.correct) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = questions.length;
    const score = (correct * 4) - (wrong * 1);
    const accuracy = Math.round((correct / (correct + wrong || 1)) * 100);

    // Test save karo
    await Test.create({
      user: req.user,
      subject,
      score,
      total,
      accuracy,
    });

    // User stats update karo
    const user = await User.findById(req.user);
    user.questionsSolved += total;

    // Streak update
    const today = new Date().toDateString();
    const lastActive = new Date(user.lastActive).toDateString();
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      user.streak = new Date(user.lastActive).toDateString() === yesterday.toDateString()
        ? user.streak + 1 : 1;
      user.lastActive = new Date();
    }

    await user.save();

    res.json({ score, correct, wrong, skipped, total, accuracy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};