import express from "express";
import { getMockTest, submitMockTest } from "../controllers/mockTestController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/questions", authMiddleware, getMockTest);
router.post("/submit", authMiddleware, submitMockTest);

export default router;