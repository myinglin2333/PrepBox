import express from "express";
import {
  getAllExperiences,
  createExperience,
  addReply,
  deleteExperience,
  updateExperience,
  toggleLike,
} from "../controllers/ExperienceController.js";

const router = express.Router();

router.get("/", getAllExperiences);
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);
router.post("/:id/replies", addReply);
router.post("/:id/like", toggleLike);

export default router;
