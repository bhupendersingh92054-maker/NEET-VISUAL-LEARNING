import express from "express";
import { submitTest } from "../controllers/questionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitTest);

export default router;