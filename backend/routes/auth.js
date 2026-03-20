import express from "express";
import passport from "passport";
import { register } from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login（using passport）
router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    res.json({
      message: "Login successful",
      userId: req.user._id,
      username: req.user.username,
    });
  }
);

// Logout
router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

export default router;
