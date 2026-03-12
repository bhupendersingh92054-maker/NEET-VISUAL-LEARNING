import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import questionsRoute from "./routes/questions.js";
import dashboardRoute from "./routes/dashboard.js";
import aiRoutes from "./routes/aiRoutes.js";
import mockTestRoutes from "./routes/mockTestRoutes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ai",aiRoutes);
app.use("/questions", questionsRoute);
app.use("/api/dashboard",dashboardRoute);
app.use("/api/mocktest", mockTestRoutes);


app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to NEET Vision Dashboard",
    user: req.user
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");

});

