import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

router.get("/:subject", async (req, res) => {

  const subject = req.params.subject;

  try {

    const questions = await Question.find({ subject });

    res.json(questions);

  } catch (err) {

    res.status(500).json({ error: "Server error" });

  }

});

export default router;