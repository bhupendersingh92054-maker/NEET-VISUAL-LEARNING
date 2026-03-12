import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(req.user);

    res.json({
      user: user.name,
      stats: {
        questions: 0,
        tests: 0,
        accuracy: 0,
        streak: 0
      }
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});

export default router;