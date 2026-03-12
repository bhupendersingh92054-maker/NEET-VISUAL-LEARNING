import mockQuestions from "../data/mockQuestions.js";
import MockTestResult from "../models/MockTestResult.js";
import User from "../models/User.js";

// Random shuffle helper
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const getMockTest = async (req, res) => {
  try {
    const physics = shuffle(mockQuestions.physics).slice(0, 50);
    const chemistry = shuffle(mockQuestions.chemistry).slice(0, 50);
    const biology = shuffle(mockQuestions.biology).slice(0, 80);

    res.json({
      sections: {
        physics: physics.map(({ explanation, ...q }) => q),
        chemistry: chemistry.map(({ explanation, ...q }) => q),
        biology: biology.map(({ explanation, ...q }) => q),
      },
      totalQuestions: physics.length + chemistry.length + biology.length,
      duration: 180,
      marking: { correct: 4, wrong: -1 }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load mock test" });
  }
};

export const submitMockTest = async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;

    const allQuestions = [
      ...mockQuestions.physics,
      ...mockQuestions.chemistry,
      ...mockQuestions.biology
    ];

    let correct = 0, wrong = 0, skipped = 0;
    const reviewData = [];

    allQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      if (userAnswer === undefined || userAnswer === null) {
        skipped++;
        reviewData.push({ id: q.id, status: "skipped", correct: q.correct });
      } else if (userAnswer === q.correct) {
        correct++;
        reviewData.push({ id: q.id, status: "correct", selected: userAnswer, correct: q.correct });
      } else {
        wrong++;
        reviewData.push({ id: q.id, status: "wrong", selected: userAnswer, correct: q.correct });
      }
    });

    const score = (correct * 4) - (wrong * 1);
    const maxScore = allQuestions.length * 4;
    const accuracy = Math.round((correct / (correct + wrong || 1)) * 100);
    const percentile = Math.round((score / maxScore) * 100);

    // MongoDB mein save karo
    await MockTestResult.create({
      user: req.user,
      score, maxScore, correct, wrong, skipped,
      accuracy, timeTaken,
      totalQuestions: allQuestions.length,
    });

    // User stats update karo
    const user = await User.findById(req.user);
    user.questionsSolved += allQuestions.length;

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

    res.json({ score, maxScore, correct, wrong, skipped, accuracy, percentile, reviewData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit test" });
  }
};