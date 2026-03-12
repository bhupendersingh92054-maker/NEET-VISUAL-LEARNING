import express from "express";
import { solveDoubt } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/solve-doubt", authMiddleware, solveDoubt);

export default router;