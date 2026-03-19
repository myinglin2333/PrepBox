import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/mongo.js";
import authRoutes from "./routes/auth.js";
import questionsRoutes from "./routes/InterviewQuestions.js";
import experienceRoutes from "./routes/ExperiencePosts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/experiences", experienceRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "PrepBox API is running" });
});

// Start server
async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
