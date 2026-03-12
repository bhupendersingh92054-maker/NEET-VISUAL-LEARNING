import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const solveDoubt = async (req, res) => {
  const { question, subject, language } = req.body;

  if (!question?.trim()) {
    return res.status(400).json({ error: "Question is required" });
  }

  const prompt = `You are an expert NEET tutor.
${subject ? `Subject: ${subject}` : ""}
${language === "hi" ? "Answer in Hindi or Hinglish." : "Answer in English."}
Give a clear step-by-step explanation with examples if needed.
Use markdown formatting.

Question: ${question}`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
    );

    const answer = response.data.candidates[0].content.parts[0].text;
    res.json({ answer });
  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: "Gemini API failed", details: err.response?.data });
  }
};
