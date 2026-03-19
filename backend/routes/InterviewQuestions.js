import express from "express";
import {
  getAllQuestions,
  createQuestion,
  addAnswer,
  deleteQuestion,
  updateQuestion,
} from "../controllers/InterviewController.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.post("/:id/answers", addAnswer);

export default router;
